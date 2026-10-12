export type TargetLevel = 'all' | 'stpm' | 'degree';
export type LanguageMode = 'bm' | 'en' | 'bilingual';

export interface GlossaryItem {
  id: string;
  bmTerm: string;
  enTerm: string;
  category: 'mikro' | 'makro' | 'pasaran' | 'kuantitatif';
  level: 'stpm' | 'degree' | 'both';
  definitionBm: string;
  definitionEn: string;
  formula?: string;
  analogi: string;
  example: string;
}

export interface ElibArticle {
  id: string;
  title: string;
  titleEn: string;
  tag: string;
  level: 'STPM' | 'Degree' | 'Umum';
  readTime: string;
  hook: string;
  analogi: string;
  teoriFormalBm: string;
  teoriFormalEn: string;
  takeaway: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  level: 'stpm' | 'degree';
  topic: string;
  question: string;
  questionEn: string;
  options: {
    text: string;
    textEn: string;
    isCorrect: boolean;
  }[];
  explanationBm: string;
  explanationEn: string;
}
