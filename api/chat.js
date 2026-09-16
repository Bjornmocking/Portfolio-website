// Vercel serverless function: POST /api/chat
// Vervangt server.js in productie (Vercel host geen losse Express-server).
// Zet GEMINI_API_KEY (en optioneel GEMINI_MODEL) in: Vercel project > Settings > Environment Variables.
//
// Snelheid: elke Gemini-aanroep krijgt een harde tijdslimiet (FETCH_TIMEOUT_MS).
// Er wordt hooguit op één extra model geprobeerd bij een fout (geen oplopende
// wachttijden) zodat de gebruiker nooit tientallen seconden op
// "Ik denk na..." blijft staren.

const FETCH_TIMEOUT_MS = 8000;

const getModelCandidates = () => {
  const preferred = process.env.GEMINI_MODEL || 'gemini-flash-latest';
  // Maximaal 2 modellen proberen: het voorkeursmodel + één snel fallback-model.
  return Array.from(new Set([preferred, 'gemini-2.5-flash-lite']));
};

const extractErrorMessage = async (response) => {
  try {
    const text = await response.text();
    const data = JSON.parse(text);
    return data?.error?.message || text || 'De Gemini API gaf een fout terug.';
  } catch {
    return 'De Gemini API gaf een fout terug.';
  }
};

const fetchWithTimeout = (url, options, timeoutMs) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Alleen POST wordt ondersteund.' });
  }

  const { prompt } = req.body || {};

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({ error: 'Geen geldige prompt ontvangen.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY ontbreekt op de server.' });
  }

  const modelCandidates = getModelCandidates();
  let lastError = 'De Gemini API gaf een fout terug.';

  for (let i = 0; i < modelCandidates.length; i += 1) {
    const model = modelCandidates[i];

    try {
      const response = await fetchWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt.trim() }] }],
          }),
        },
        FETCH_TIMEOUT_MS
      );

      if (response.ok) {
        const data = await response.json();
        const answer =
          data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('') ||
          'Ik kon geen antwoord genereren.';
        return res.status(200).json({ answer });
      }

      lastError = await extractErrorMessage(response);
      // Bij een fout gewoon direct het volgende model proberen (geen wachttijd, geen extra herhaling).
    } catch (error) {
      lastError =
        error?.name === 'AbortError'
          ? 'Het Gemini-model reageerde niet op tijd.'
          : error instanceof Error
          ? error.message
          : 'Er ging iets mis met de backend.';
    }
  }

  return res.status(503).json({
    error: `Kon geen antwoord ophalen bij Gemini. Laatste foutmelding: ${lastError}`,
  });
}
