export type Language = 'en' | 'ur' | 'hi' | 'ar' | 'es' | 'fr' | 'zh';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

export interface EraTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBg: string;
  borderColor: string;
  glowColor: string;
  textColor: string;
  fontFamily: 'serif' | 'sans' | 'cinzel' | 'orbitron';
  bannerGradient: string;
}

export interface Deity {
  id: string;
  name: string;
  title: string;
  domain: string;
  symbol: string;
  avatar: string;
  description: string;
  powers: string[];
}

export interface FamousPerson {
  id: string;
  name: string;
  title: string;
  reign?: string;
  lifespan: string;
  image: string;
  quote: string;
  achievements: string[];
  bio: string;
}

export interface BattleEvent {
  id: string;
  title: string;
  year: string;
  opponents: string;
  location: string;
  outcome: string;
  description: string;
  tactic: string;
  territoryChange: string;
  phases: {
    phase: number;
    title: string;
    details: string;
  }[];
}

export interface TimelineMilestone {
  year: string;
  bce?: boolean;
  title: string;
  category: 'Politics' | 'Architecture' | 'Warfare' | 'Culture' | 'Science';
  description: string;
  image?: string;
}

export interface ArtifactItem {
  id: string;
  title: string;
  date: string;
  material: string;
  significance: string;
  image: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Era {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  timePeriod: string;
  epoch: 'Ancient' | 'Classical' | 'Medieval' | 'Early Modern' | 'Modern' | 'Late 20th';
  capital: string;
  location: string;
  heroVideoUrl?: string;
  heroImageUrl: string;
  theme: EraTheme;
  description: string;
  quickFacts: { label: string; value: string }[];
  
  // 20 Core Sections Detailed Data
  rise: {
    title: string;
    period: string;
    content: string;
    images: { url: string; caption: string }[];
    milestones: string[];
  };
  peak: {
    title: string;
    period: string;
    content: string;
    images: { url: string; caption: string }[];
    achievements: string[];
  };
  decline: {
    title: string;
    period: string;
    content: string;
    images: { url: string; caption: string }[];
    causes: string[];
  };
  fall: {
    title: string;
    period: string;
    content: string;
    images: { url: string; caption: string }[];
    aftermath: string;
  };
  religion: {
    title: string;
    content: string;
    coreBeliefs: string[];
    deities: Deity[];
  };
  battles: {
    title: string;
    content: string;
    majorWars: BattleEvent[];
  };
  culture: {
    title: string;
    content: string;
    traditions: { title: string; desc: string; icon: string }[];
    festivals: { name: string; timing: string; significance: string }[];
  };
  music: {
    title: string;
    content: string;
    instruments: { name: string; type: string; desc: string; image: string }[];
    youtubeId?: string;
    soundscapeTone: string;
  };
  fashion: {
    title: string;
    content: string;
    items: { title: string; wornBy: string; desc: string; image: string }[];
  };
  food: {
    title: string;
    content: string;
    staples: { name: string; role: string; desc: string; image: string }[];
  };
  dailyLife: {
    title: string;
    content: string;
    socialClasses: { rank: string; role: string; populationPercent: string; desc: string }[];
  };
  architecture: {
    title: string;
    content: string;
    monumentName: string;
    monumentType: 'pyramid' | 'colosseum' | 'taj' | 'parthenon' | 'arcade';
    specs: { height: string; base: string; stones: string; builtFor: string };
    gallery: { title: string; image: string; desc: string }[];
  };
  art: {
    title: string;
    content: string;
    colorSymbolism: { color: string; hex: string; meaning: string }[];
    masterpieces: { title: string; medium: string; image: string; desc: string }[];
  };
  technology: {
    title: string;
    content: string;
    innovations: { title: string; impact: string; desc: string; icon: string }[];
  };
  language: {
    title: string;
    content: string;
    writingSystem: string;
    evolution: { stage: string; period: string; desc: string }[];
    sampleGlyphs: { glyph: string; phonetic: string; meaning: string }[];
  };
  events: {
    title: string;
    timeline: TimelineMilestone[];
  };
  famousPeople: {
    title: string;
    figures: FamousPerson[];
  };
  whatIsThereNow: {
    title: string;
    content: string;
    modernLocation: string;
    coordinates: { lat: number; lng: number };
    beforeImg: string;
    afterImg: string;
    beforeLabel: string;
    afterLabel: string;
    museums: { name: string; city: string; highlight: string; link?: string }[];
    ruinsGallery: { title: string; image: string; modernNote: string }[];
    travelAdvice: string;
  };
  quiz: {
    title: string;
    questions: QuizQuestion[];
  };
}

