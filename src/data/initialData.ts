import profilePhoto from '../assets/linkedin-profielfoto.jpg';
import { LearningOutcome, PortfolioData } from '../types';

export const LEARNING_OUTCOMES: LearningOutcome[] = [
  {
    id: 'LU1',
    code: 'LU1',
    title: 'AI-impact',
    shortDesc: 'AI-impact op de toekomstige beroepspraktijk analyseren en evalueren',
    fullDesc: 'Zelfstandig onderzoek doen naar de impact van AI in jouw toekomstig beroep en vaststellen welke nieuwe AI- en digitale vaardigheden daarvoor nodig zijn.',
    color: 'emerald',
  },
  {
    id: 'LU2',
    code: 'LU2',
    title: 'AI Praktijkoplossing',
    shortDesc: 'Praktijkgerichte AI-oplossing ontwerpen, realiseren en presenteren',
    fullDesc: 'Zelfstandig een AI-oplossing ontwerpen, realiseren en presenteren die een specifieke beroepspraktijk radicaal transformeert.',
    color: 'sky',
  },
  {
    id: 'LU3',
    code: 'LU3',
    title: 'Ethiek',
    shortDesc: 'Ethiek en verantwoordelijk AI-gebruik beoordelen',
    fullDesc: 'Zelfstandig de ethische vraagstukken en uitdagingen van AI in je vakgebied identificeren en aanbevelingen formuleren voor verantwoord AI-gebruik, rekening houdend met privacy, bias en transparantie.',
    color: 'violet',
  },
  {
    id: 'LU4',
    code: 'LU4',
    title: 'AI Tools en technieken',
    shortDesc: 'AI-tools en technieken gebruiken',
    fullDesc: 'Zelfstandig verschillende AI-tools en platforms toepassen (zoals machine learning technieken, chatbots, agents, prompts) en deze gebruiken om specifieke taken binnen je vakgebied op te lossen.',
    color: 'amber',
  },
  {
    id: 'LU5',
    code: 'LU5',
    title: 'Zelfstandig werken',
    shortDesc: 'Zelfstandig en zelfsturend werken',
    fullDesc: 'Een eigen leerroute vaststellen en uitvoeren waarbij je zelfstandig je leervragen stelt, relevante bronnen en tools selecteert, je eigen voortgang monitort en kritisch reflecteert op je leerproces en persoonlijke ontwikkeling in het AI-landschap.',
    color: 'rose',
  },
];

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  portfolioTitle: 'Portfolio Minor: Futureproof met AI!',
  minorTitle: 'Minor Futureproof met AI! (30 EC)',
  introText:
    'Welkom op mijn persoonlijke portfolio voor de minor "Futureproof met AI!". In deze online leeromgeving documenteer ik chronologisch mijn ontwikkeling, verkenningen, gebouwde AI-oplossingen en reflecties verdeeld over 8 intensieve sprints van elk twee weken.',
  aboutMe: {
    name: 'Bjorn Mocking',
    role: 'Commerciële economie, Justlease',
    subheading: 'Commercieel denken, AI-gedreven bouwen.',
    photoUrl: profilePhoto,
    bio: 'Ik ben Bjorn, vierdejaars student Commerciële Economie aan de Hogeschool Utrecht. Naast mijn studie werk ik in sales bij Justlease, waar ik klanten help bij het vinden van hun perfecte leaseauto.\n\nMijn interesse ligt bij sales, en alles wat daaromheen efficiënter kan. Ik wil ontdekken wat AI voor mijn vakgebied kan betekenen.\n\nMijn motivatie is praktisch. Ik zie in mijn werk dagelijks waar tijd verloren gaat aan dingen die met de juiste tool sneller of slimmer kunnen, van het inwerken van nieuwe collega\'s tot het bijhouden van klantcontact. Deze minor geeft me de ruimte om daar zelf iets aan te bouwen, te leren wat er wel en niet werkt, en te ontdekken hoe ver ik kan komen zonder technische achtergrond.',
  },
  sprints: [
    {
      id: 1,
      number: 1,
      title: 'Sprint 1: Oriëntatie & Tools Verkennen',
      period: 'Week 1 – Week 2',
      theme: 'Kick-off van de minor: nieuwe AI-tools en vibe-coding ontdekken, in plaats van direct een praktijkoplossing bouwen',
      summary:
        'Deze eerste sprint verliep anders dan gepland: in plaats van meteen aan de onboarding-assistent te werken, ging vrijwel alle tijd op aan het ontdekken en leren gebruiken van nieuwe tools: van Perplexity tot vibe-coding met Google AI Studio, GitHub en Vercel. Dat leverde twee werkende, live gepubliceerde applicaties op en een stevige LU4/LU5-basis, maar LU2 en LU3 zijn eerlijk doorgeschoven naar sprint 2.',
      stories: [
        {
          id: 's1-story-1',
          type: 'research',
          title: 'AI-impact op een B2C-salesrol onderzoeken',
          summary:
            'Als commercieel medewerker in B2C-sales, wil ik onderzoeken hoe AI het werk van salesmedewerkers verandert, zodat ik weet welke AI- en digitale vaardigheden ik nodig heb voor mijn toekomstig beroep. Onderzoek gedaan met Perplexity naar AI-impact op klantcontact en leadopvolging, en vertaald naar mijn eigen rol bij Justlease (klanten zonder rijdende auto of met een aflopend contract).',
        },
        {
          id: 's1-story-2',
          type: 'learning',
          title: 'Vibe-coden leren met Google AI Studio, GitHub en Vercel',
          summary:
            'Als beginnende AI-bouwer, wil ik leren vibe-coden, zodat ik zelf kleine AI-applicaties kan bouwen en live kan publiceren zonder te kunnen programmeren. Een werkend digitaal dagboekje gebouwd (met dagvragen, lokale opslag, een AI-spreuk via Gemini en Excel-export), gepubliceerd via GitHub naar Vercel en getest op desktop en mobiel.',
        },
        {
          id: 's1-story-3',
          type: 'learning',
          title: 'Lokale ontwikkelomgeving opzetten',
          summary:
            'Als beginnende AI-bouwer, wil ik een lokale ontwikkelomgeving opzetten, zodat ik ook buiten de browser-tools kan bouwen en met een AI-agent lokaal kan werken. Node.js, Git, VS Code en GitHub Copilot geïnstalleerd, het portfolio-project via Git naar VS Code gehaald en lokaal draaiend gekregen.',
        },
        {
          id: 's1-story-4',
          type: 'user',
          title: 'Portfolio-website bouwen en publiceren',
          summary:
            'Als student wil ik een portfolio-website bouwen die mijn minor-voortgang per sprint laat zien, zodat ik mijn resultaten overzichtelijk kan presenteren aan mijn coach en toekomstige werkgevers. Eerste werkende versie gebouwd met homepage, over-mij sectie, sprintoverzicht per leeruitkomst, en gepubliceerd via GitHub en Vercel.',
        },
      ],
      evidenceLinks: [
        {
          id: 's1-ev-1',
          title: 'Live dagboekje',
          url: 'https://dagboek-ten.vercel.app/',
          type: 'app',
          description: 'Werkend digitaal dagboekje (dagvragen, AI-spreuk via Gemini, Excel-export), gebouwd als leeroefening in vibe-coding.',
        },
        {
          id: 's1-ev-2',
          title: 'GitHub: Dagboek',
          url: 'https://github.com/Bjornmocking/Dagboek.git',
          type: 'code',
          description: 'Broncode van het dagboekje.',
        },
        {
          id: 's1-ev-3',
          title: 'Live portfolio-website',
          url: 'https://portfolio-website-azure-psi-52.vercel.app/',
          type: 'app',
          description: 'De live versie van deze portfoliowebsite zelf, gepubliceerd via Vercel.',
        },
        {
          id: 's1-ev-4',
          title: 'GitHub: Portfolio-website',
          url: 'https://github.com/Bjornmocking/Portfolio-website.git',
          type: 'code',
          description: 'GitHub-repository met de broncode, opgehaald en verder ontwikkeld in VS Code.',
        },
      ],
      demonstratedOutcomes: ['LU4', 'LU5'],
      feedback: [
        {
          date: '16-09-2026',
          from: 'Docent (Gert)',
          comment:
            'Veel tools en technieken gebruikt. Zelfstandig werken ook voldoende. AI-impact nog niet op niveau want er is nog geen bewijs.',
          action: 'Ik ga zorgen dat ik bewijsmateriaal krijg voor mijn AI-impact op de beroepspraktijk.',
        },
      ],
      outcomeNotes: {
        LU1: 'Onderzoek gedaan naar AI-impact op B2C-sales via Perplexity en rondgevraagd bij collega\'s (door Gert gewaardeerd), maar nog geen concreet bewijsstuk of toepassing binnen Justlease. Door Gert beoordeeld als nog niet op niveau. Actie: in sprint 2 een afgerond bewijsstuk maken voor deze leeruitkomst.',
        LU2: 'Nog niet aan toegekomen deze sprint. De praktijkoplossing (onboarding-assistent) staat gepland voor sprint 2.',
        LU3: 'Nog niet aan toegekomen deze sprint.',
        LU4: 'Meerdere AI-tools en platforms leren gebruiken: Perplexity, Google AI Studio, GitHub, Vercel, Node.js, VS Code, GitHub Copilot. Twee werkende applicaties gebouwd en live gepubliceerd, inclusief het oplossen van een productiefout (API-structuur) en een verkeerd ingestelde API-key. Op 16-09 ook de live chatbot-integratie gedebugd: ontdekt dat een losse Express-server niet draait op Vercel (moest een serverless function worden onder /api), de Gemini API-key correct ingesteld via environment variables in plaats van de gedeelde demo-key uit de collegeslides, en met de browser Network-tab een prestatieprobleem opgespoord waarbij de chatbot 30+ seconden nodig had door een te trage retry-strategie. Opgelost door een harde timeout en minder pogingen toe te voegen.',
        LU5: 'Eigen leerroute bijgesteld toen bleek dat sprint 1 vooral tijd vroeg voor tool-verkenning. Zelfstandig technische problemen doorgrond en opgelost (lokale opslag vs. database, preview vs. productieomgeving, environment variables). Logboek en planning zelf bijgehouden.',
      },
      reflection: {
        learned:
          'Dat vibe-coden niet in één rechte lijn verloopt: een AI-tool kan zeggen dat iets gelukt is terwijl het niet zichtbaar of werkend is, en wat lokaal werkt hoeft niet zonder aanpassing te werken in een live omgeving (Vercel vraagt een andere bestandsstructuur voor API\'s dan een lokale server). Ook geleerd dat environment variables pas actief worden na een nieuwe deploy, en dat een verkeerd ingestelde key niet altijd een zichtbare foutmelding geeft maar stil kan terugvallen op een fallback.',
        keep: 'De gewoonte om bij een probleem eerst de browserconsole en Network-tab te checken voordat ik opnieuw ga prompten. Ook het testen op mobiel naast desktop, en eerlijk in het logboek zetten wat ik écht heb gedaan in plaats van wat ik gepland had.',
        change:
          'Volgende sprint bewuster plannen: deze sprint ging alle tijd naar het verkennen van tools, waardoor de onboarding-assistent nog niet is gestart. Ik wil sprint 2 gerichter beginnen, met Gert overleggen voordat ik ga bouwen, en de kennisvragen bij collega\'s daadwerkelijk gaan bijhouden.',
      },
    },
    {
      id: 2,
      number: 2,
      title: 'Sprint 2: De eerste praktijkoplossing',
      period: 'Week 3 – Week 4',
      theme: 'LU1 afmaken met een concreet bewijsstuk, en de onboarding-assistent voor Justlease daadwerkelijk bouwen.',
      summary:
        'In deze sprint heb ik mijn onderzoek naar AI-impact afgerond tot een concreet eindproduct, en mijn eerste echte praktijkoplossing gebouwd: een onboarding-assistent voor nieuwe salesmedewerkers bij Justlease. Omdat toestemming voor interne documenten nog loopt, draait die op openbare documenten van justlease.nl. Daarnaast voor het eerst gewerkt met een database (Supabase), Claude Code en Make.com.',
      stories: [
        {
          id: 's2-story-1',
          type: 'research',
          title: 'AI-impact op mijn beroepspraktijk: B2C-sales bij Justlease',
          summary:
            'Als toekomstig commercieel professional in B2C-sales onderzocht ik hoe AI mijn vakgebied verandert. Hoofdbevinding: AI verschuift het werk van B2C-salesmedewerkers van veel handmatig contact naar sneller, relevanter en datagedreven klantcontact.',
          details:
            'Als toekomstig commercieel professional in B2C-sales onderzocht ik hoe AI mijn vakgebied verandert. Ik combineerde deskresearch (Perplexity) met gesprekken met collega\'s bij Justlease, om te toetsen of de trends die ik online vond ook herkenbaar zijn in de dagelijkse praktijk.\n\nHoofdbevinding: AI verschuift het werk van B2C-salesmedewerkers van veel handmatig contact naar sneller, relevanter en datagedreven klantcontact. AI neemt de eerste selectie en een deel van de opvolging over, waardoor medewerkers zich meer kunnen richten op advies, vertrouwen, uitzonderingen en het daadwerkelijk sluiten van de verkoop.\n\nTwee gebieden waar AI het werk verandert:\n\nKlantcontact:\n- Chatbots die veelgestelde vragen beantwoorden en contactgegevens verzamelen, ook buiten kantooruren\n- Personalisatie op basis van klikgedrag en eerdere aankopen\n- Gespreksassistentie: relevante klantinformatie tonen tijdens een gesprek, plus automatische samenvattingen achteraf\n- Sentiment- en intentieanalyse: signaleren of een klant informatie zoekt, koopintentie heeft, twijfelt of ontevreden is\n- Slimme doorverwijzing: eenvoudige vragen bij de bot, complexe of emotionele gesprekken naar een medewerker\n\nLeadopvolging:\n- Leads rangschikken op koopkans (websitebezoek, formuliergedrag, eerdere interactie)\n- Automatisch een eerste reactie sturen zodat een klant niet hoeft te wachten\n- AI bepaalt het beste opvolgmoment\n- Berichten (mail, sms, chat) worden aangepast op productinteresse\n- Automatisering stopt of escaleert bij een reactie, klacht of duidelijke koopintentie\n\nVoorheen vs. steeds vaker met AI:\n- Voorheen alle leads gelijk opvolgen, steeds vaker met AI eerst de kansrijkste leads\n- Voorheen zelf standaardmails schrijven, steeds vaker met AI-concepten controleren en aanpassen\n- Voorheen handmatig informatie opzoeken, steeds vaker met AI verschijnt context automatisch tijdens het gesprek\n\nDe kernvaardigheid verschuift van "alleen overtuigen" naar "AI goed aansturen, de output beoordelen, en menselijk contact op het juiste moment inzetten."\n\nRisico\'s en beperkingen: Een foutieve leadscore kan kansrijke klanten onterecht laag prioriteren. Dit is voor mijn eigen werk bij Justlease extra relevant: ik werk met twee scherp afgebakende klantfases (klanten zonder rijdende auto, en klanten met een aflopend contract). Een verkeerd ingesteld model zou iemand in de overgang tussen die fases kunnen missen, met een gemiste lead als gevolg. AI-opvolging moet dus altijd gecontroleerd blijven, niet blind vertrouwd.\n\nGetoetst in de praktijk: Naast deskresearch heb ik dit getoetst bij collega\'s bij Justlease. Hun ervaringen bevestigden de trends uit mijn onderzoek en gaven extra praktijkcontext bij hoe leadopvolging en klantcontact er nu al uitzien.\n\nWelke AI- en digitale vaardigheden heb ik hierdoor nodig? Op basis van deze analyse zie ik voor mezelf drie vaardigheden die ik moet ontwikkelen om hierop voorbereid te zijn:\n1. AI-output kritisch beoordelen: niet blind vertrouwen op een leadscore of een AI-gegenereerde conceptmail, maar leren herkennen wanneer die fout kan zitten (bijvoorbeeld bij klanten die net overgaan tussen mijn twee klantfases).\n2. AI-tools effectief aansturen: weten hoe ik een AI-systeem goede input geef en hoe ik zelf beoordeel of de output klopt, in plaats van AI als black box te gebruiken.\n3. Herkennen wanneer een mens nodig is: AI neemt het standaardwerk over, maar ik moet blijven herkennen wanneer een klant advies, vertrouwen of maatwerk nodig heeft dat AI niet kan bieden.',
        },
        {
          id: 's2-story-2',
          type: 'user',
          title: 'Onboarding-assistent voor nieuwe salesmedewerkers bij Justlease',
          summary:
            'Als nieuwe salesmedewerker bij Justlease, wil ik op één plek vragen kunnen stellen over voorwaarden, verzekeringen, de kredietcheck en het verkoopgesprek, zodat ik sneller zelfstandig klanten te woord kan staan zonder steeds een senior te hoeven storen.',
          details:
            'Het probleem: op de salesafdeling werken veel studenten en stagiairs die snel wisselen. Nieuwe collega\'s leren door mee te luisteren en vragen te stellen aan een senior. Elke vraag kost dan twee mensen tijd, en nieuwe mensen stellen liever geen domme vragen. Er is al een draaiboek, maar niemand bladert daarin tijdens een gesprek.\n\nWat ik heb gebouwd: een eigen webapp, gebouwd met Claude Code en live gezet op Vercel, met vier onderdelen:\n- Een AI-assistent die vragen beantwoordt op basis van de documenten. Bij elk antwoord toont hij de bron met versiedatum en pagina, hij onthoudt het gesprek zodat vervolgvragen werken, en hij zegt eerlijk "dat weet ik niet" als iets niet in de documenten staat. Een fout antwoord kan gemeld worden.\n- Een verkoopdraaiboek: wie doet wat in fase 1 (nog geen rijdende auto) en fase 2 (rijdende auto) tussen sales, financiële afdeling en klantenservice, plus servicepakketten, gespreksargumenten en eerlijke nadelen.\n- Een kennisquiz als eindtoets: 20 vragen zoals klanten ze aan de telefoon stellen, geslaagd bij maximaal 3 fouten.\n- Achtergrond over Justlease.\nVragen waar de assistent geen antwoord op wist, worden opgeslagen in een database (Supabase), zodat ik weet wat er nog in de kennisbank ontbreekt.\n\nWat het verandert: inwerken verschuift van "meeluisteren en een senior storen" naar "eerst zelf opzoeken, met bron, en pas daarna escaleren". Het meeluisteren blijft nodig voor toon en timing; de assistent is voor de feitenvragen tussendoor.\n\nVerantwoord gebouwd: Justlease hoort bij Arval en BNP Paribas, waar AI gevoelig ligt. Ik heb eerst mijn leidinggevende gevraagd welke informatie ik mag gebruiken. Tot er akkoord is, gebruik ik alleen openbare documenten, zonder klant- of persoonsgegevens. De site is gemarkeerd als studentenproject en afgeschermd voor zoekmachines.',
        },
        {
          id: 's2-story-3',
          type: 'learning',
          title: 'Leren door vast te lopen: database, Supabase, Claude Code en Make.com',
          summary:
            'Als beginnende AI-bouwer, wil ik vastleggen wat ik deze sprint leer door vast te lopen en problemen op te lossen, zodat mijn leerproces zichtbaar is en ik het kan hergebruiken in latere projecten.',
          details:
            'Database en Supabase (oefenproject: dagboekje met database)\n- Het dagboekje sloeg niets op: na een refresh was alle data weg. Eerst SQLite geprobeerd, daarna overgestapt op Supabase omdat dat aansluit bij de lesstof en via MCP vanuit de editor aan te sturen is.\n- Een nieuw project starten zonder mijn portfolio te beschadigen: een aparte lege map in een eigen venster, los van de portfolio-repository.\n- De database laten praten met de app zonder sleutels in Git: API-sleutels in een .env-bestand (buiten Git via .gitignore) en Row Level Security ingesteld.\nWat ik hier leerde, heb ik daarna toegepast in de onboarding-assistent.\n\nClaude Code\n- Overgestapt van VS Code met Copilot naar Claude Code. De onboarding-assistent is daarmee gebouwd.\n- Obstakels: Gemini-modellen die niet meer beschikbaar waren (opgelost met herpogingen en een reservemodel), en de assistent die de Keurmerk-voorwaarden voor liet gaan op die van Justlease (opgelost door de Justlease-voorwaarden leidend te maken).\n\nMake.com\n- Eerste scenario gebouwd: productinformatie uit Google Sheets, Claude schrijft een productbeschrijving en zet die terug in de Sheet.\n- Obstakel: de tutorial was voor OpenAI, ik gebruikte Claude. Andere module, andere API-sleutel, en het eerste bericht moet van de "user" komen. Daarnaast leek de koppeling van een veld opgeslagen, maar was die niet bewaard in het scenario.\n- Daarna begonnen aan een opdracht om leads met AI te classificeren en via een Router te verwerken.',
        },
        {
          id: 's2-story-4',
          type: 'user',
          title: 'Portfolio-chatbot werkend maken',
          summary:
            'Als bezoeker van mijn portfolio-website, wil ik een chatbot kunnen gebruiken die vragen beantwoordt over mij en mijn minor-project, zodat ik snel inzicht krijg zonder alles te hoeven doorlezen. In sprint 1 gebouwd maar nog niet goed werkend; deze sprint afgemaakt. Hij draait nu live, beantwoordt vragen over mijn portfolio en kan zelf naar een onderdeel van de pagina scrollen.',
        },
        {
          id: 's2-story-5',
          type: 'user',
          title: 'Portfolio-website bijwerken',
          summary:
            'Als bezoeker van mijn portfolio-website, wil ik een actueel overzicht zien van sprint 1 en 2, inclusief mijn projecten, zodat ik een compleet beeld krijg van wat ik heb gebouwd en geleerd. Sprint 1 en 2 zijn ingevuld met stories en bewijslinks, lange stories worden compact getoond, en sprints die nog niet gestart zijn blijven bewust leeg.',
        },
      ],
      evidenceLinks: [
        {
          id: 's2-ev-1',
          title: 'Live: Justlease onboarding-assistent',
          url: 'https://justlease-onboarding-assistent.vercel.app/',
          type: 'app',
          description: 'Kennisbank met AI-assistent, verkoopdraaiboek en kennisquiz voor nieuwe salesmedewerkers. Studentenproject op basis van openbare documenten.',
        },
        {
          id: 's2-ev-2',
          title: 'GitHub: Onboarding-assistent',
          url: 'https://github.com/Bjornmocking/justlease-onboarding-assistent',
          type: 'code',
          description: 'Broncode van de onboarding-assistent.',
        },
        {
          id: 's2-ev-3',
          title: 'Live portfolio-website',
          url: 'https://portfolio-website-azure-psi-52.vercel.app/',
          type: 'app',
          description: 'Deze site, met de werkende chatbot rechtsonder.',
        },
        {
          id: 's2-ev-4',
          title: 'GitHub: Portfolio-website',
          url: 'https://github.com/Bjornmocking/Portfolio-website.git',
          type: 'code',
          description: 'Broncode van deze portfoliowebsite.',
        },
      ],
      demonstratedOutcomes: [],
      feedback: [
        {
          date: '23-09-2026',
          from: 'Docent (Gert), coaching sprint 2',
          comment:
            'Als ik nog geen toestemming heb voor interne Justlease-documenten, mag ik de onboarding-assistent ook bouwen met demo-data of openbare informatie. Belangrijkste is dat er een werkende oplossing staat.',
          action: 'Niet gewacht op toestemming: de assistent gebouwd op de openbare documenten van justlease.nl.',
        },
        {
          date: '28-09-2026',
          from: 'Docent (Gert), Make.com-opdracht',
          comment: 'Het wegschrijven naar Google Sheets vóór de Router plaatsen in plaats van in elke route apart.',
          action: 'Overgenomen. Wel geleerd dat ik de Router-filters dan via de History-tab moet controleren.',
        },
      ],
      outcomeNotes: {
        LU1: 'Ter beoordeling: Onderzoek afgerond tot een concreet eindproduct op deze site, met risico\'s voor mijn eigen rol en een expliciete conclusie over de drie vaardigheden die ik nodig heb.',
        LU2: 'Ter beoordeling: Onboarding-assistent ontworpen vanuit een probleem uit mijn eigen werk, gebouwd en live gezet, en gepresenteerd tijdens de Show & Grow.',
        LU3: 'Ter beoordeling: Toestemming gevraagd voordat ik bedrijfsinformatie gebruikte, alleen openbare documenten, bronvermelding, "weet ik niet" in plaats van verzinnen, en een disclaimer. Bias nog niet onderzocht.',
        LU4: 'Ter beoordeling: Nieuw ingezet: Claude Code, Supabase, Make.com en de Gemini API, met werkende resultaten.',
        LU5: 'Ter beoordeling: Zelf gepland, bijgestuurd waar nodig (niet wachten op toestemming, los project, SQLite naar Supabase) en eerst uitleg gevraagd in plaats van alles te laten bouwen.',
      },
      reflection: {
        learned:
          'Dat een AI-oplossing in een bedrijf niet alleen een technische vraag is. Bij Justlease bepaalde de vraag "wat mag ik gebruiken?" meer hoe ik bouwde dan de techniek zelf. Technisch leerde ik werken met een database, met Claude Code en met Make.com, en dat een AI-tool kan zeggen dat iets is opgeslagen terwijl het er niet echt staat: altijd zelf controleren.',
        keep: 'Per story één afgerond, klikbaar bewijsstuk. En niet wachten als iets vastloopt: met wat er wél mag verder bouwen.',
        change:
          'Mijn portfolio eerder in de sprint bijwerken in plaats van aan het eind. Bias meenemen bij de lead-classificatie. En de toestemming van Justlease opvolgen, zodat het interne draaiboek kan worden toegevoegd.',
      },
    },
    {
      id: 3,
      number: 3,
      title: 'Sprint 3: Nog niet gestart',
      period: 'Week 5 – Week 6',
      theme: 'Wordt ingevuld zodra deze sprint van start gaat.',
      summary: 'Deze sprint moet nog beginnen. Er is nog niets om te laten zien.',
      stories: [],
      evidenceLinks: [],
      demonstratedOutcomes: [],
    },
    {
      id: 4,
      number: 4,
      title: 'Sprint 4: Nog niet gestart',
      period: 'Week 7 – Week 8',
      theme: 'Wordt ingevuld zodra deze sprint van start gaat.',
      summary: 'Deze sprint moet nog beginnen. Er is nog niets om te laten zien.',
      stories: [],
      evidenceLinks: [],
      demonstratedOutcomes: [],
    },
    {
      id: 5,
      number: 5,
      title: 'Sprint 5: Nog niet gestart',
      period: 'Week 9 – Week 10',
      theme: 'Wordt ingevuld zodra deze sprint van start gaat.',
      summary: 'Deze sprint moet nog beginnen. Er is nog niets om te laten zien.',
      stories: [],
      evidenceLinks: [],
      demonstratedOutcomes: [],
    },
    {
      id: 6,
      number: 6,
      title: 'Sprint 6: Nog niet gestart',
      period: 'Week 11 – Week 12',
      theme: 'Wordt ingevuld zodra deze sprint van start gaat.',
      summary: 'Deze sprint moet nog beginnen. Er is nog niets om te laten zien.',
      stories: [],
      evidenceLinks: [],
      demonstratedOutcomes: [],
    },
    {
      id: 7,
      number: 7,
      title: 'Sprint 7: Nog niet gestart',
      period: 'Week 13 – Week 14',
      theme: 'Wordt ingevuld zodra deze sprint van start gaat.',
      summary: 'Deze sprint moet nog beginnen. Er is nog niets om te laten zien.',
      stories: [],
      evidenceLinks: [],
      demonstratedOutcomes: [],
    },
    {
      id: 8,
      number: 8,
      title: 'Sprint 8: Nog niet gestart',
      period: 'Week 15 – Week 16',
      theme: 'Wordt ingevuld zodra deze sprint van start gaat.',
      summary: 'Deze sprint moet nog beginnen. Er is nog niets om te laten zien.',
      stories: [],
      evidenceLinks: [],
      demonstratedOutcomes: [],
    },
  ],
};
