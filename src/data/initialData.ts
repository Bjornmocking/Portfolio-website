import profilePhoto from '../assets/linkedin-profielfoto.jpg';
import { LearningOutcome, PortfolioData } from '../types';

export const LEARNING_OUTCOMES: LearningOutcome[] = [
  {
    id: 'LU1',
    code: 'LU1',
    title: 'AI-impact',
    shortDesc: 'Maatschappelijke, ethische en economische impact van AI',
    fullDesc: 'Inzicht in en analyseren van de invloed van AI-technologieën op individuen, organisaties en de maatschappij.',
    color: 'emerald',
  },
  {
    id: 'LU2',
    code: 'LU2',
    title: 'AI Praktijkoplossing',
    shortDesc: 'Ontwerpen en bouwen van werkende AI-oplossingen',
    fullDesc: 'Ontwerpen, ontwikkelen en valideren van een tastbare, werkende AI-toepassing die inspeelt op een concreet praktijkprobleem.',
    color: 'sky',
  },
  {
    id: 'LU3',
    code: 'LU3',
    title: 'Ethiek',
    shortDesc: 'Verantwoorde, betrouwbare en ethische inzet van AI',
    fullDesc: 'Kritisch reflecteren op ethische vraagstukken zoals data-privacy, bias, transparantie, copyright en verantwoord gebruik van AI.',
    color: 'violet',
  },
  {
    id: 'LU4',
    code: 'LU4',
    title: 'AI Tools en technieken',
    shortDesc: 'Selectie en implementatie van moderne AI-tools',
    fullDesc: 'Doelgericht selecteren, experimenteren met en toepassen van state-of-the-art AI-modellen, tools, frameworks en prompt-technieken.',
    color: 'amber',
  },
  {
    id: 'LU5',
    code: 'LU5',
    title: 'Zelfstandig werken',
    shortDesc: 'Agile sprintaanpak, zelfreflectie en autonomie',
    fullDesc: 'Zelfsturend werken volgens agile sprintmethodiek, eigen leerdoelen formuleren, voortgang bewaken en kritisch reflecteren op eigen groei.',
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
    bio: 'Ik ben Bjorn, vierdejaars student Commerciële Economie aan de Hogeschool Utrecht. Naast mijn studie werk ik in sales bij Justlease, waar ik dagelijks met klanten in gesprek ben over hun auto en hun keuzes rondom leasen.\n\nMijn interesse ligt bij sales, geld en alles wat daaromheen efficiënter kan. Ik kan niet programmeren en heb geen data-achtergrond, maar dat is precies waarom deze minor mij aanspreekt: ik wil ontdekken wat AI voor mijn vakgebied kan betekenen, zonder dat ik daarvoor eerst software engineer hoef te worden.\n\nMijn motivatie is praktisch. Ik zie in mijn werk dagelijks waar tijd verloren gaat aan dingen die met de juiste tool sneller of slimmer kunnen — van het inwerken van nieuwe collegas tot het bijhouden van klantcontact. Deze minor geeft me de ruimte om daar zelf iets aan te bouwen, te leren wat er wel en niet werkt, en te ontdekken hoe ver ik kan komen zonder technische achtergrond.',
    talents: [
      'Commercieel inzicht en klantgerichte communicatie',
      'Structuur geven aan processen en kansen herkennen',
      'Pragmatisch denken en snel handelen in een drukke werkomgeving',
    ],
    passions: [
      '[Passie 1: bijv. De wisselwerking tussen menselijke creativiteit en generatieve AI]',
      '[Passie 2: bijv. Ethische vraagstukken rondom data-transparantie en algoritmes]',
      '[Passie 3: bijv. Open-source tools en interactieve webtechnologieën]',
    ],
    dreams: [
      '[Droom 1: bijv. Een impactvolle AI-applicatie lanceren die dagelijkse taken vereenvoudigt]',
      '[Droom 2: bijv. Specialist worden in verantwoorde AI-adoptie binnen organisaties]',
      '[Droom 3: bijv. Continu blijven innoveren en leren aan het front van technologische ontwikkelingen]',
    ],
  },
  sprints: [
    {
      id: 1,
      number: 1,
      title: 'Sprint 1: Oriëntatie & Eerste AI Proof of Concept',
      period: 'Week 1 – Week 2',
      theme: 'Kick-off, verkenning van het AI-landschap en opzetten van de experimentele werkomgeving',
      summary:
        'Tijdens deze kick-off sprint heb ik het huidige generatieve AI-landschap in kaart gebracht, ethische kaders bestudeerd en een eerste functionele proof-of-concept gebouwd. Hiermee legde ik de basis voor mijn onderzoek en sprintritme in de minor.',
      stories: [
        {
          id: 's1-story-1',
          type: 'research',
          title: 'Research Story: Vergelijkend onderzoek naar State-of-the-Art LLM-modellen en API-kosten',
          summary:
            'Onderzoek gedaan naar de prestaties, contextlengte, latency en pricing van verschillende multimodale modellen (o.a. Gemini 2.5/Flash, GPT-4o en open source alternatieven) voor interactieve applicaties.',
        },
        {
          id: 's1-story-2',
          type: 'user',
          title: 'User Story: Als gebruiker wil ik direct prompts kunnen testen met gestructureerde output',
          summary:
            'Een functioneel frontend-prototype opgezet waarin gebruikers prompts kunnen invoeren en direct gevalideerde JSON-responses terugkrijgen met foutafhandeling en statusindicatoren.',
        },
        {
          id: 's1-story-3',
          type: 'learning',
          title: 'Learning Story: Reflectie op prompt-engineering technieken en hallucinatierisico\'s',
          summary:
            'Geleerd hoe few-shot prompting en schema-constraints helpen bij het voorkomen van hallucinaties. Reflectie geschreven over de balans tussen creativiteit en betrouwbaarheid in AI-systemen.',
        },
      ],
      evidenceLinks: [
        {
          id: 's1-ev-1',
          title: 'Gepubliceerde Applicatie: Prototype v1 (Live Demo)',
          url: 'https://example.com/demo-sprint-1',
          type: 'app',
          description: 'Eerste werkende proof-of-concept webapplicatie met directe modelinteractie.',
        },
        {
          id: 's1-ev-2',
          title: 'Onderzoeksdocument: LLM Benchmark & Architectuurkeuze',
          url: 'https://example.com/onderzoek-sprint-1.pdf',
          type: 'document',
          description: 'Document met vergelijkingstabellen, criteria en conclusies voor de minor.',
        },
        {
          id: 's1-ev-3',
          title: 'Video Pitch & Walkthrough (3 minuten)',
          url: 'https://example.com/video-walkthrough-sprint-1',
          type: 'video',
          description: 'Korte schermopname waarin de werking en het achterliggende idee worden toegelicht.',
        },
      ],
      demonstratedOutcomes: ['LU1', 'LU4', 'LU5'],
      outcomeNotes: {
        LU1: 'AI-impact: Verkenning van de invloed van multimodale modellen op softwareontwikkeling en productiviteit beschreven in het onderzoeksverslag.',
        LU4: 'AI Tools en technieken: Direct geëxperimenteerd met prompt engineering, token limits en model-API parameters.',
        LU5: 'Zelfstandig werken: Zelfstandig een backlog opgesteld, sprintplanning gemaakt en retrospective uitgevoerd.',
      },
    },
    {
      id: 2,
      number: 2,
      title: 'Sprint 2: Probleemanalyse & Doelgroepvalidatie',
      period: 'Week 3 – Week 4',
      theme: 'Diepgaande verkenning van een praktijkvraagstuk en gebruikersbehoeften',
      summary:
        'In Sprint 2 lag de focus op het onderzoeken van een concreet praktijkprobleem. Door middel van interviews en desktop research is gevalideerd waar AI echte meerwaarde biedt ten opzichte van traditionele software.',
      stories: [
        {
          id: 's2-story-1',
          type: 'research',
          title: 'Research Story: Analyse van gebruikersknelpunten in de praktijkcase',
          summary:
            'Onderzoek gedaan naar repetitieve taken van de doelgroep en potentiële AI-oplossingen in kaart gebracht via een desk research analyse.',
        },
        {
          id: 's2-story-2',
          type: 'user',
          title: 'User Story: Als gebruiker wil ik contextuele suggesties ontvangen op basis van mijn invoer',
          summary:
            'Gebruikersflow ontworpen waarin AI-assistentie realtime feedback geeft op ingevoerde tekst.',
        },
        {
          id: 's2-story-3',
          type: 'learning',
          title: 'Learning Story: Leren interviewen en aannames toetsen met stakeholders',
          summary:
            'Inzicht gekregen in hoe belangrijk het is om AI-hype te scheiden van daadwerkelijke gebruikersbehoeften.',
        },
      ],
      evidenceLinks: [
        {
          id: 's2-ev-1',
          title: 'Interviewverslagen & Empathy Map (Document)',
          url: 'https://example.com/sprint2-interviews.pdf',
          type: 'document',
          description: 'Gedocumenteerde inzichten uit gesprekken met stakeholders.',
        },
      ],
      demonstratedOutcomes: ['LU1', 'LU2', 'LU5'],
      outcomeNotes: {
        LU1: 'AI-impact: In kaart gebracht welke maatschappelijke effecten automatisering heeft op de doelgroep.',
        LU2: 'AI Praktijkoplossing: Eerste conceptuele architectuur voor het praktijkvraagstuk uitgewerkt.',
        LU5: 'Zelfstandig werken: Zelfstandig interviews gepland, afgenomen en samengevat.',
      },
    },
    {
      id: 3,
      number: 3,
      title: 'Sprint 3: Architectuur & Ethisch Kader',
      period: 'Week 5 – Week 6',
      theme: 'Systeemarchitectuur, databescherming en ethische toetsing',
      summary:
        'Tijdens deze sprint zijn ethische kaders en privacy-aspecten centraal gesteld. Er is een data-flow opgesteld waarin privacy en bias expliciet worden geadresseerd conform EU AI Act richtlijnen.',
      stories: [
        {
          id: 's3-story-1',
          type: 'research',
          title: 'Research Story: Ethische risico-analyse en compliance met de EU AI Act',
          summary:
            'Onderzoek gedaan naar privacywaarborgen, data minimalisatie en de verplichtingen rond transparantie bij AI-toepassingen.',
        },
        {
          id: 's3-story-2',
          type: 'user',
          title: 'User Story: Als gebruiker wil ik transparantie over hoe AI tot een antwoord is gekomen',
          summary:
            'Een bronvermelding- en explainability-component toegevoegd in de gebruikersinterface.',
        },
        {
          id: 's3-story-3',
          type: 'learning',
          title: 'Learning Story: Morele verantwoording en ethische dilemma\'s bij AI-adoptie',
          summary:
            'Reflectie geschreven over algorithmic bias en de verantwoordelijkheid van ontwikkelaars bij modeloutputs.',
        },
      ],
      evidenceLinks: [
        {
          id: 's3-ev-1',
          title: 'Ethisch Analyseverslag & PIA (Document)',
          url: 'https://example.com/sprint3-ethiek.pdf',
          type: 'document',
          description: 'Privacy Impact Assessment en ethisch afwegingskader.',
        },
      ],
      demonstratedOutcomes: ['LU3', 'LU4'],
      outcomeNotes: {
        LU3: 'Ethiek: Grondige risico-analyse uitgevoerd omtrent privacy, transparantie en bias.',
        LU4: 'AI Tools en technieken: Tools vergeleken op het gebied van data-retentie en privacy policies.',
      },
    },
    {
      id: 4,
      number: 4,
      title: 'Sprint 4: Prototype v2 & Core Algoritmes',
      period: 'Week 7 – Week 8',
      theme: 'Doorontwikkeling van de AI-kern en integratie van data pipelines',
      summary:
        'In Sprint 4 is de kernfunctionaliteit van de AI-oplossing gebouwd. Er is gewerkt met retrieval-augmented generation (RAG) of gestructureerde API-chains voor nauwkeurige output.',
      stories: [
        {
          id: 's4-story-1',
          type: 'research',
          title: 'Research Story: Vergelijking van embedding-modellen en vector retrieval methodes',
          summary:
            'Kwalitatieve en kwantitatieve evaluatie van chunking-strategieën en semantische zoekalgoritmes.',
        },
        {
          id: 's4-story-2',
          type: 'user',
          title: 'User Story: Als gebruiker wil ik eigen documenten uploaden en doorzoeken met AI',
          summary:
            'Drag-and-drop document upload geïmplementeerd met directe verwerking en semantische indexering.',
        },
        {
          id: 's4-story-3',
          type: 'learning',
          title: 'Learning Story: Debuggen van embedding mismatches en context limits',
          summary:
            'Geleerd hoe semantische afstand berekend wordt en hoe je effectief omgaat met tokenbudgetten.',
        },
      ],
      evidenceLinks: [
        {
          id: 's4-ev-1',
          title: 'Gepubliceerde Applicatie: Prototype v2 (Live)',
          url: 'https://example.com/demo-sprint-4',
          type: 'app',
          description: 'Tweede iteratie met werkende semantische zoek- en antwoordfunctionaliteit.',
        },
        {
          id: 's4-ev-2',
          title: 'Screencast & Code Walkthrough (Video)',
          url: 'https://example.com/sprint4-video',
          type: 'video',
          description: 'Video met uitleg over de geïmplementeerde pipeline en resultaten.',
        },
      ],
      demonstratedOutcomes: ['LU2', 'LU4', 'LU5'],
      outcomeNotes: {
        LU2: 'AI Praktijkoplossing: Werkend prototype met reële data geïntegreerd.',
        LU4: 'AI Tools en technieken: Modellen en embeddings geïntegreerd in de applicatie.',
        LU5: 'Zelfstandig werken: Complexe technische hobbels zelfstandig opgelost.',
      },
    },
    {
      id: 5,
      number: 5,
      title: 'Sprint 5: Gebruikerstesten & Evaluatiemetrieken',
      period: 'Week 9 – Week 10',
      theme: 'Validatie met eindgebruikers, kwantitatieve benchmarks en usability tests',
      summary:
        'Sprint 5 stond in het teken van testen met testpersonen. Feedback is verzameld over de bruikbaarheid, nauwkeurigheid van de AI-antwoorden en de responstijd.',
      stories: [
        {
          id: 's5-story-1',
          type: 'research',
          title: 'Research Story: Benchmark test naar antwoordkwaliteit en responstijden',
          summary:
            'Testbatterij opgesteld met 50 representatieve queries om accuraatheid en hallucinaties te meten.',
        },
        {
          id: 's5-story-2',
          type: 'user',
          title: 'User Story: Als tester wil ik duidelijke feedbackknoppen (duim omhoog/omlaag) bij AI-antwoorden',
          summary:
            'Gebruikersinteractie uitgebreid met directe evaluatiemogelijkheden voor continue verbetering.',
        },
        {
          id: 's5-story-3',
          type: 'learning',
          title: 'Learning Story: Leren omgaan met onvoorspelbare gebruikersinput in conversatie-interfaces',
          summary:
            'Inzicht gekregen in hoe gebruikers edge cases introduceren en hoe guardrails noodzakelijk zijn.',
        },
      ],
      evidenceLinks: [
        {
          id: 's5-ev-1',
          title: 'Testrapport & Usability Resultaten (Document)',
          url: 'https://example.com/sprint5-testrapport.pdf',
          type: 'document',
          description: 'Uitgebreid verslag van de gebruikersonderzoeken en meetbare resultaten.',
        },
      ],
      demonstratedOutcomes: ['LU2', 'LU3', 'LU5'],
      outcomeNotes: {
        LU2: 'AI Praktijkoplossing: Gebruikersvalidatie uitgevoerd op de praktijkoplossing.',
        LU3: 'Ethiek: Gebruikersperceptie van betrouwbaarheid en privacy getoetst.',
        LU5: 'Zelfstandig werken: Testopzet ontworpen en testresultaten geanalyseerd.',
      },
    },
    {
      id: 6,
      number: 6,
      title: 'Sprint 6: Verfijning, UX & Optimalisatie',
      period: 'Week 11 – Week 12',
      theme: 'Optimaliseren van UI/UX, caching, latency en streaming responses',
      summary:
        'In Sprint 6 zijn de feedbackpunten uit de testfase verwerkt. De gebruikerservaring is drastisch verbeterd met streaming tekst, duidelijke laadstatussen en caching van frequente vragen.',
      stories: [
        {
          id: 's6-story-1',
          type: 'research',
          title: 'Research Story: Onderzoek naar streaming UI patterns en perceived performance',
          summary:
            'Onderzocht hoe streaming responses en progressieve rendering de perceptie van snelheid beïnvloeden.',
        },
        {
          id: 's6-story-2',
          type: 'user',
          title: 'User Story: Als gebruiker wil ik direct letters zien verschijnen zonder te wachten op het hele antwoord',
          summary:
            'Server-sent streaming geïntegreerd in de frontend voor een responsieve chat-ervaring.',
        },
        {
          id: 's6-story-3',
          type: 'learning',
          title: 'Learning Story: Beheersen van asynchrone streams en error boundaries in moderne frameworks',
          summary:
            'Geleerd hoe robuuste error handling gebouwd moet worden rond netwerkonderbrekingen bij lange AI-generaties.',
        },
      ],
      evidenceLinks: [
        {
          id: 's6-ev-1',
          title: 'Gepubliceerde Applicatie: Release Candidate (Live)',
          url: 'https://example.com/demo-sprint-6',
          type: 'app',
          description: 'Geoptimaliseerde versie met streaming responses en caching.',
        },
        {
          id: 's6-ev-2',
          title: 'Performance Vergelijkingsrapport (Document)',
          url: 'https://example.com/sprint6-performance.pdf',
          type: 'document',
          description: 'Metingen van latency-reductie voor en na implementatie van caching en streaming.',
        },
      ],
      demonstratedOutcomes: ['LU2', 'LU4'],
      outcomeNotes: {
        LU2: 'AI Praktijkoplossing: De oplossing is kwalitatief verfijnd tot een productie-rijp niveau.',
        LU4: 'AI Tools en technieken: Geavanceerde streaming-API\'s en optimalisatietechnieken toegepast.',
      },
    },
    {
      id: 7,
      number: 7,
      title: 'Sprint 7: Integratie & Stakeholder Presentatie',
      period: 'Week 13 – Week 14',
      theme: 'Eindintegratie, overdrachtsdocumentatie en presentatie aan opdrachtgevers',
      summary:
        'Tijdens deze sprint is het systeem klaargemaakt voor eindoplevering. Een live demonstratie is verzorgd voor stakeholders en feedback is verzameld voor de eindevaluatie.',
      stories: [
        {
          id: 's7-story-1',
          type: 'research',
          title: 'Research Story: Onderzoek naar adoptiebarrières en trainingsbehoeften bij eindgebruikers',
          summary:
            'In kaart gebracht wat medewerkers nodig hebben om effectief en vertrouwd te werken met de AI-tool.',
        },
        {
          id: 's7-story-2',
          type: 'user',
          title: 'User Story: Als stakeholder wil ik een duidelijke handleiding en documentatie ontvangen',
          summary:
            'Een beknopte gebruikershandleiding en technische documentatie opgeleverd.',
        },
        {
          id: 's7-story-3',
          type: 'learning',
          title: 'Learning Story: Presenteren van AI-techniek aan niet-technische stakeholders',
          summary:
            'Geleerd om technische AI-concepten om te zetten in tastbare business-waarde en meetbare voordelen.',
        },
      ],
      evidenceLinks: [
        {
          id: 's7-ev-1',
          title: 'Eindpresentatie Slides (Document)',
          url: 'https://example.com/sprint7-presentatie.pdf',
          type: 'document',
          description: 'Presentatieslides gebruikt tijdens de stakeholder demo.',
        },
        {
          id: 's7-ev-2',
          title: 'Opname van de Stakeholder Demo (Video)',
          url: 'https://example.com/sprint7-demo-video',
          type: 'video',
          description: 'Video-opname van de live demonstratie en Q&A sessie.',
        },
      ],
      demonstratedOutcomes: ['LU1', 'LU2', 'LU5'],
      outcomeNotes: {
        LU1: 'AI-impact: Business case en impact op de werkprocessen helder overgebracht aan stakeholders.',
        LU2: 'AI Praktijkoplossing: Volledig functionerende oplossing gedemonstreerd in een live praktijkcontext.',
        LU5: 'Zelfstandig werken: Stakeholdersessie zelfstandig voorbereid, gefaciliteerd en gerapporteerd.',
      },
    },
    {
      id: 8,
      number: 8,
      title: 'Sprint 8: Eindreflectie, Portfolio Afronding & Assessment',
      period: 'Week 15 – Week 16',
      theme: 'Synthese van het leertraject, portfolio-evaluatie en voorbereiding op het eindassessment',
      summary:
        'In de afsluitende sprint van de minor zijn alle bewijsstukken gebundeld, is de eindreflectie geschreven en zijn de 5 leeruitkomsten definitief verantwoord voor het eindoordeel.',
      stories: [
        {
          id: 's8-story-1',
          type: 'research',
          title: 'Research Story: Synthese van de minor: Toekomstperspectief op AI in het werkveld',
          summary:
            'Een toekomstvisie geformuleerd over de evolutie van agentic workflows en autonome AI-systemen in mijn vakgebied.',
        },
        {
          id: 's8-story-2',
          type: 'user',
          title: 'User Story: Als assessor wil ik een overzichtelijk portfolio kunnen inzien met geverifieerde bewijsstukken per leeruitkomst',
          summary:
            'Alle 8 sprints van bewijslast voorzien met directe hyperlinks, duidelijke verantwoordingen en meetbare resultaten.',
        },
        {
          id: 's8-story-3',
          type: 'learning',
          title: 'Learning Story: Meta-reflectie op mijn persoonlijke groei als AI-professional',
          summary:
            'Reflectie geschreven op de gehele minor: van startende verkenner naar zelfstandige bouwer die kritisch en ethisch met AI kan innoveren.',
        },
      ],
      evidenceLinks: [
        {
          id: 's8-ev-1',
          title: 'Definitieve Verantwoording Leeruitkomsten (Document)',
          url: 'https://example.com/sprint8-eindverantwoording.pdf',
          type: 'document',
          description: 'Matrix waarin alle 5 leeruitkomsten gekoppeld zijn aan de bewijslast over de 8 sprints.',
        },
        {
          id: 's8-ev-2',
          title: 'Eindassessment Pitch Video (Video)',
          url: 'https://example.com/sprint8-assessment-pitch',
          type: 'video',
          description: 'Video-pitch voor de assessoren waarin de belangrijkste mijlpalen worden toegelicht.',
        },
      ],
      demonstratedOutcomes: ['LU1', 'LU2', 'LU3', 'LU4', 'LU5'],
      outcomeNotes: {
        LU1: 'AI-impact: Eindvisie geformuleerd op de lange-termijn impact van AI in mijn beroepsprofiel.',
        LU2: 'AI Praktijkoplossing: Volledig iteratief ontwikkeld product opgeleverd en geëvalueerd.',
        LU3: 'Ethiek: Ethische lessen samengevat in een richtlijnenkader.',
        LU4: 'AI Tools en technieken: Beheersing van tools en modellen gedemonstreerd over alle fasen.',
        LU5: 'Zelfstandig werken: Volledige 16 weken agile zelfsturend doorlopen en verantwoord.',
      },
    },
  ],
};
