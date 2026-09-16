// Vercel serverless function: POST /api/chat
// Vervangt server.js in productie (Vercel host geen losse Express-server).
// Zet GEMINI_API_KEY (en optioneel GEMINI_MODEL) in: Vercel project > Settings > Environment Variables.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getModelCandidates = () => {
  const preferred = process.env.GEMINI_MODEL || 'gemini-flash-latest';
  return Array.from(
    new Set([preferred, 'gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.5-flash-lite'])
  );
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

const isTransientGeminiError = (status, message) => {
  const normalized = (message || '').toLowerCase();
  return (
    status === 429 ||
    status === 500 ||
    status === 503 ||
    normalized.includes('high demand') ||
    normalized.includes('temporarily unavailable') ||
    normalized.includes('overloaded') ||
    normalized.includes('too many requests') ||
    normalized.includes('rate limit')
  );
};

const shouldTryNextModel = (status, message) => {
  const normalized = (message || '').toLowerCase();
  return (
    status === 404 ||
    normalized.includes('not found') ||
    normalized.includes('is not supported') ||
    normalized.includes('is no longer available')
  );
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

  for (let modelIndex = 0; modelIndex < modelCandidates.length; modelIndex += 1) {
    const model = modelCandidates[modelIndex];

    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt.trim() }] }],
            }),
          }
        );

        const message = await extractErrorMessage(response.clone());

        if (response.ok) {
          const data = await response.json();
          const answer =
            data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('') ||
            'Ik kon geen antwoord genereren.';
          return res.status(200).json({ answer });
        }

        lastError = message;

        if (shouldTryNextModel(response.status, message) && modelIndex < modelCandidates.length - 1) {
          continue;
        }

        if (isTransientGeminiError(response.status, message)) {
          if (attempt < 2) {
            await delay(1000 * (attempt + 1));
            continue;
          }
          if (modelIndex < modelCandidates.length - 1) {
            continue;
          }
        }

        return res.status(response.status || 500).json({ error: message });
      } catch (error) {
        lastError = error instanceof Error ? error.message : 'Er ging iets mis met de backend.';
        if (attempt < 2) {
          await delay(1000 * (attempt + 1));
          continue;
        }
      }
    }
  }

  return res.status(503).json({
    error:
      lastError.includes('high demand') || lastError.includes('temporarily unavailable')
        ? 'Het gekozen Gemini-model is momenteel druk bezet. Probeer het opnieuw over een paar seconden.'
        : lastError,
  });
}
