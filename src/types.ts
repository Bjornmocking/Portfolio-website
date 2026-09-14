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

export interface Story {
  id: string;
  type: StoryType;
  title: string;
  summary: string;
}

export type EvidenceType = 'app' | 'document' | 'video' | 'code' | 'other';

export interface EvidenceLink {
  id: string;
  title: string;
  url: string;
  type: EvidenceType;
  description?: string;
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
  outcomeNotes?: Partial<Record<LearningOutcomeId, string>>;
}

export interface AboutMeData {
  name: string;
  role: string;
  subheading: string;
  photoUrl: string;
  bio: string;
  talents: string[];
  passions: string[];
  dreams: string[];
}

export interface PortfolioData {
  portfolioTitle: string;
  minorTitle: string;
  introText: string;
  aboutMe: AboutMeData;
  sprints: Sprint[];
}
