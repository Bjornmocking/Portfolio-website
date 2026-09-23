import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;
const FETCH_TIMEOUT_MS = 12000;

const NAVIGATION_TARGETS = [
  'hero',
  'about-me',
  'sprints',
  'learning-outcomes',
  'sprint-card-1',
  'sprint-card-2',
  'sprint-card-3',
  'sprint-card-4',
  'sprint-card-5',
  'sprint-card-6',
  'sprint-card-7',
  'sprint-card-8',
];

const NAVIGATION_TOOL = {
  functionDeclarations: [
    {
      name: 'navigate_to_section',
      description:
        'Scroll de portfolio-pagina naar een specifiek onderdeel wanneer de gebruiker vraagt om iets te laten zien, te openen, ernaartoe te gaan of te bekijken (bijvoorbeeld een sprint, de leeruitkomsten, "over mij", of de homepage).',
      parameters: {
        type: 'OBJECT',
        properties: {
          target: {
            type: 'STRING',
            description: 'Het onderdeel van de portfolio waar de gebruiker naartoe wil.',
            enum: NAVIGATION_TARGETS,
          },
        },
        required: ['target'],
      },
    },
  ],
};

const getModelCandidates = () => {
  const preferred = process.env.GEMINI_MODEL || 'gemini-flash-lite-latest';
  return Array.from(new Set([preferred, 'gemini-3.5-flash-lite']));
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

// Korte, statische samenvatting van het portfolio zodat de chatbot vragen over
// Bjorn en zijn voortgang in de minor kan beantwoorden. Zelfde context als api/chat.js
// (de Vercel-versie), zodat lokaal testen hetzelfde gedrag geeft als productie.
const SYSTEM_CONTEXT = `Je bent de portfolio-assistent op de website van Bjorn Mocking, vierdejaars student Commerciële Economie aan de Hogeschool Utrecht. Hij volgt de minor "Futureproof met AI!" en werkt daarnaast als sales bij Justlease. Doel van deze minor: leren zelfstandig AI-tools en -technieken toepassen op zijn eigen vakgebied, verdeeld over 8 sprints van 2 weken, met 5 leeruitkomsten (LU1 AI-impact, LU2 AI-praktijkoplossing, LU3 Ethiek, LU4 AI-tools en technieken, LU5 Zelfstandig werken).

Status: Sprint 1 (week 1-2) is afgerond, sprint 2 t/m 8 moeten nog beginnen.

Sprint 1 - samenvatting: verliep anders dan gepland. In plaats van meteen aan een praktijkoplossing te werken, ging de tijd vooral naar het verkennen van nieuwe AI-tools. Vier stories: (1) Research: onderzoek met Perplexity naar AI-impact op B2C-sales bij Justlease; (2) Learning: vibe-coden geleerd met Google AI Studio/GitHub/Vercel door een digitaal dagboekje te bouwen en live te publiceren; (3) Learning: lokale ontwikkelomgeving opgezet met Node.js, Git, VS Code en GitHub Copilot; (4) User story: deze portfolio-website zelf gebouwd en gepubliceerd.
Resultaat zelfevaluatie sprint 1: LU4 en LU5 op niveau (Voldoende). LU1 (AI-impact) nog NIET op niveau volgens docent Gert - er was nog geen concreet bewijsstuk, actie is dit in sprint 2 alsnog te leveren. LU2 en LU3 zijn nog niet aan bod gekomen (gepland voor latere sprints).

Instructies: antwoord kort, vriendelijk en in het Nederlands. Baseer je alleen op de informatie hierboven. Als iets niet in deze context staat (bijvoorbeeld details over latere sprints die nog niet zijn ingevuld), zeg dan eerlijk dat je dat nog niet weet in plaats van te verzinnen. Als de gebruiker vraagt om iets te laten zien, te openen of ernaartoe te gaan (bijvoorbeeld "laat sprint 1 zien" of "ga naar de leeruitkomsten"), roep dan de functie navigate_to_section aan met de juiste target in plaats van dit in tekst te beschrijven.`;

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

  for (let i = 0; i < modelCandidates.length; i += 1) {
    const model = modelCandidates[i];

    try {
      const response = await fetchWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_CONTEXT }] },
            contents: [{ parts: [{ text: prompt.trim() }] }],
            tools: [NAVIGATION_TOOL],
          }),
        },
        FETCH_TIMEOUT_MS
      );

      if (response.ok) {
        const data = await response.json();
        const parts = data?.candidates?.[0]?.content?.parts || [];
        const functionCallPart = parts.find((part) => part.functionCall);

        if (functionCallPart) {
          return res.status(200).json({
            functionCall: {
              name: functionCallPart.functionCall.name,
              args: functionCallPart.functionCall.args || {},
            },
          });
        }

        const answer = parts.map((part) => part.text || '').join('') || 'Ik kon geen antwoord genereren.';
        return res.status(200).json({ answer });
      }

      lastError = await extractErrorMessage(response);
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
});

app.listen(PORT, () => {
  console.log(`Chat-backend draait op http://localhost:${PORT}`);
});
