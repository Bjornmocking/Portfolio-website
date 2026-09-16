import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getModelCandidates = () => {
  const preferred = process.env.GEMINI_MODEL || 'gemini-flash-latest';
  return Array.from(
    new Set([
      preferred,
      'gemini-flash-latest',
      'gemini-2.5-flash',
      'gemini-2.5-flash-lite',
    ])
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

app.use(express.json());

app.post('/api/chat', async (req, res) => {
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
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: prompt.trim() }],
                },
              ],
            }),
          }
        );

        const message = await extractErrorMessage(response);

        if (response.ok) {
          const data = JSON.parse(await response.clone().text());
          const answer =
            data?.candidates?.[0]?.content?.parts
              ?.map((part) => part.text || '')
              .join('') || 'Ik kon geen antwoord genereren.';

          return res.json({ answer });
        }

        lastError = message;

        if (shouldTryNextModel(response.status, message)) {
          if (modelIndex < modelCandidates.length - 1) {
            continue;
          }
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
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
