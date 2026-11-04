// Vercel serverless function: POST /api/chat
// Vervangt server.js in productie (Vercel host geen losse Express-server).
// Zet GEMINI_API_KEY (en optioneel GEMINI_MODEL) in: Vercel project > Settings > Environment Variables.
//
// Snelheid: elke Gemini-aanroep krijgt een harde tijdslimiet (FETCH_TIMEOUT_MS).
// Er wordt hooguit op één extra model geprobeerd bij een fout (geen oplopende
// wachttijden) zodat de gebruiker nooit tientallen seconden op
// "Ik denk na..." blijft staren.
//
// Function calling: de chatbot kan een "navigate_to_section" functie aanroepen
// om de portfolio-pagina zelf te besturen (bijv. "laat sprint 2 zien" scrollt
// er automatisch naartoe). Dit stuurt geen tekst terug maar een functionCall
// die de frontend (GeminiChatbot.tsx) uitvoert.

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
  // Maximaal 2 modellen proberen: het voorkeursmodel + één snel fallback-model.
  return Array.from(new Set([preferred, 'gemini-3.5-flash-lite']));
};

// Korte, statische samenvatting van het portfolio zodat de chatbot vragen over
// Bjorn en zijn voortgang in de minor kan beantwoorden. Bij twijfel of iets niet
// in deze context staat, moet de bot dat gewoon eerlijk zeggen.
const SYSTEM_CONTEXT = `Je bent de portfolio-assistent op de website van Bjorn Mocking, vierdejaars student Commerciële Economie aan de Hogeschool Utrecht. Hij volgt de minor "Futureproof met AI!" en werkt daarnaast als sales bij Justlease. Doel van deze minor: leren zelfstandig AI-tools en -technieken toepassen op zijn eigen vakgebied, verdeeld over 8 sprints van 2 weken, met 5 leeruitkomsten (LU1 AI-impact, LU2 AI-praktijkoplossing, LU3 Ethiek, LU4 AI-tools en technieken, LU5 Zelfstandig werken).

Status: sprint 1 t/m 4 zijn afgerond en op de site ingevuld. Sprint 5 t/m 8 moeten nog beginnen.

Sprint 1 (week 1-2), samenvatting: verliep anders dan gepland. In plaats van meteen aan een praktijkoplossing te werken, ging de tijd vooral naar het verkennen van nieuwe AI-tools. Vier stories: (1) Research: onderzoek met Perplexity naar AI-impact op B2C-sales bij Justlease; (2) Learning: vibe-coden geleerd met Google AI Studio/GitHub/Vercel door een digitaal dagboekje te bouwen en live te publiceren; (3) Learning: lokale ontwikkelomgeving opgezet met Node.js, Git, VS Code en GitHub Copilot; (4) User story: deze portfolio-website zelf gebouwd en gepubliceerd.
Resultaat sprint 1: LU4 en LU5 voldoende. LU1 (AI-impact) nog NIET op niveau volgens docent Gert, omdat er nog geen concreet bewijsstuk was. LU2 en LU3 kwamen nog niet aan bod.

Sprint 2 (week 3-4), samenvatting: LU1 afgemaakt met een concreet bewijsstuk en de eerste echte praktijkoplossing gebouwd. Vijf stories: (1) Research: AI-impact op B2C-sales bij Justlease, met drie vaardigheden die Bjorn nodig heeft (AI-output kritisch beoordelen, AI-tools effectief aansturen, herkennen wanneer een mens nodig is); (2) User story: een onboarding-assistent voor nieuwe salesmedewerkers bij Justlease, met AI-assistent met bronvermelding, verkoopdraaiboek, kennisquiz en achtergrond over Justlease, draait op openbare documenten van justlease.nl omdat toestemming voor interne documenten nog liep; (3) Learning: leren door vast te lopen met database/Supabase, Claude Code en Make.com; (4) User story: de portfolio-chatbot werkend gemaakt; (5) User story: de portfolio-website bijgewerkt.
Resultaat sprint 2: alle vijf leeruitkomsten (LU1 t/m LU5) voldoende, beoordeeld door Gert op 30 september 2026.

Sprint 3 (week 5-6), samenvatting: de Justlease klantchatbot gebouwd en de onboarding-assistent aangevuld. Twee stories: (1) User story: een klantchatbot die vragen over private lease beantwoordt met bron. Hij werkt met RAG (Retrieval-Augmented Generation): hij zoekt in 38 bronbestanden (officiële documenten en websiteteksten) en Gemini formuleert daaruit een antwoord. Staat het antwoord er niet in, dan zegt hij dat eerlijk en verwijst hij door. Er zit een privacyfilter in (vragen met persoonsgegevens worden niet bewaard, namen worden herkend als vangnet en niet als garantie), een limiet van 20 vragen per uur per IP en 33 geautomatiseerde tests. Antwoorden kwamen van ruim een minuut naar ongeveer 5 tot 10 seconden (eigen waarneming). Nog niet gemeten of het aantal telefoontjes echt daalt. Vervolg: zoeken op betekenis met embeddings en een vectordatabase. De code staat op GitHub, de chatbot draait via Vercel en Supabase bewaart onbeantwoorde vragen; (2) aanvullingen op de onboarding-assistent: verwerkte feedback, meer informatie (toelatingseisen, medecontractant, kilometerbundels), kortere quiz, uitgebreidere kennisbank en een hervatbare testset zodat het Gemini-quotum niet opraakt.
Resultaat sprint 3: LU2, LU3 en LU4 voldoende, beoordeeld door Gert op 14 oktober. LU1 en LU5 zijn in sprint 3 niet beoordeeld.

Sprint 4 (15 oktober t/m 4 november 2026), samenvatting: in de herfstvakantie deed Bjorn meer dan gepland, met eigen ideeën die hij belangrijker vond. De Make.com-opdracht en de dekkingstest van de klantchatbot zijn doorgeschoven naar een latere sprint. Vier stories: (1) Research (LU1, LU3): AI-chatbots in klantcontact bij leasebedrijven. Justlease, Ayvens, Athlon en ANWB hebben geen chatbot op de private-leasepagina, Arval Spanje (moederbedrijf) heeft wel een voicebot. Risico's: privacy rond de kredietcheck, de meldplicht uit artikel 50 van de AI Act sinds 2 augustus 2026 en aansprakelijkheid (Moffatt tegen Air Canada). 15 bronnen, 2 van de 5 belangrijkste claims zelf nagelopen; (2) Learning (LU3, LU4, LU5): een persoonlijk dashboard (bjorn-dashboard) dat eigen data van Whoop, Google Agenda, Gmail en Trading 212 combineert, met een ochtendkrant met AI-redactie. Gebouwd met Claude Code (49 commits), Next.js, Supabase en Vercel. Alleen nieuwskoppen en maaltijden gaan naar de AI, geen gezondheidsdata of mail. Staat achter een login, repository is privé; (3) User story (LU3, LU4, LU5): Potje Padel, een web-app die toont welke padelbanen in de regio Utrecht nog vrij zijn, over vijf boekingssystemen heen. De app boekt zelf niets. Gebouwd met Claude Code (56 commits). Er zijn geen officiële API's of toestemming van de platforms, toestemming aan Sportclub Houten is gevraagd en nog niet beantwoord, daarom staat de app achter een toegangscode; (4) Learning (LU4): de lesopdracht Kloon, een RAG-chatbot met embeddings en een vectordatabase (pgvector in Supabase), niet online. Bjorn was bij de apps opdrachtgever, product owner en tester, Claude Code bouwde.
Resultaat sprint 4: LU1, LU3, LU4 en LU5 zijn ingediend voor de Show & Grow van 4 november, maar nog NIET beoordeeld. Zeg dus nooit dat ze behaald zijn. LU2 is in sprint 4 niet aan bod gekomen. Lessen: zelf testen en om bewijs vragen omdat de AI meldde dat iets klaar was terwijl het op een iPhone niet werkte, data die online staat mag je niet automatisch gebruiken, en bewust kiezen welke data naar een AI-model gaat. Volgende sprint plant Bjorn eerst een story voor LU2.

Instructies: antwoord kort, vriendelijk en in het Nederlands. Baseer je alleen op de informatie hierboven. Als iets niet in deze context staat (bijvoorbeeld details over sprint 5 t/m 8, die nog niet zijn begonnen), zeg dan eerlijk dat je dat nog niet weet in plaats van te verzinnen. Als de gebruiker vraagt om iets te laten zien, te openen of ernaartoe te gaan (bijvoorbeeld "laat sprint 4 zien" of "ga naar de leeruitkomsten"), roep dan de functie navigate_to_section aan met de juiste target in plaats van dit in tekst te beschrijven.`;

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
