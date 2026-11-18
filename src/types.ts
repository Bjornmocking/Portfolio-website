export type LearningOutcomeId = 'LU1' | 'LU2' | 'LU3' | 'LU4' | 'LU5';

export interface LearningOutcome {
  id: LearningOutcomeId;
  code: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  color: string;
}

export type StoryType = 'research' | 'user' | 'learning';

/** Grouped bar chart (before and after) shown in the "Lees meer" modal. */
export interface ShareChart {
  title: string;
  caption: string;
  beforeLabel: string;
  afterLabel: string;
  rows: { label: string; before: number; after: number }[];
}

export interface Story {
  id: string;
  /** Fixed anchor so the story can be linked as /#anchor. */
  anchor?: string;
  type: StoryType;
  title: string;
  summary: string;
  /** Volledige inhoud voor langere bewijsstukken, getoond via een "Lees meer"-modal. */
  details?: string;
  /** Stappen van een eenvoudige flow, getoond als plaatje bovenaan de "Lees meer"-modal. */
  flow?: string[];
  /** Leeruitkomsten waar deze story bij hoort, getoond als labels. */
  outcomes?: LearningOutcomeId[];
  /** Label before the outcomes, for stories that only "fit" outcomes (not submitted, not assessed). */
  outcomesPrefix?: string;
  /** Short text for a placeholder where screenshots will come. */
  screenshotPlaceholder?: string;
  chart?: ShareChart;
}

export type EvidenceType = 'app' | 'document' | 'video' | 'code' | 'other';

export interface EvidenceLink {
  id: string;
  title: string;
  url: string;
  type: EvidenceType;
  description?: string;
}

export interface SprintFeedback {
  date: string;
  from: string;
  comment: string;
  action: string;
}

export interface SprintReflection {
  learned: string;
  keep: string;
  change: string;
}

export interface Sprint {
  id: number;
  number: number;
  title: string;
  period: string;
  theme: string;
  summary: string;
  stories: Story[];
  evidenceLinks: EvidenceLink[];
  demonstratedOutcomes: LearningOutcomeId[];
  /** Ingediend voor beoordeling, maar nog niet beoordeeld. Telt nergens als behaald. */
  submittedOutcomes?: LearningOutcomeId[];
  /** Past bij deze leeruitkomsten, maar nog niet ingediend en niet beoordeeld. */
  fittingOutcomes?: LearningOutcomeId[];
  /** Gepland maar niet gedaan en verplaatst. */
  adjustment?: { title: string; text: string; outcomes?: LearningOutcomeId[] };
  /** Korte feitelijke toelichting bij de beoordeling van deze sprint. */
  assessmentNote?: string;
  outcomeNotes?: Partial<Record<LearningOutcomeId, string>>;
  feedback?: SprintFeedback[];
  reflection?: SprintReflection;
}

export interface AboutMeData {
  name: string;
  role: string;
  subheading: string;
  photoUrl: string;
  bio: string;
}

export interface PortfolioData {
  portfolioTitle: string;
  minorTitle: string;
  introText: string;
  aboutMe: AboutMeData;
  sprints: Sprint[];
}
