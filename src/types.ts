
export type CharacterType = 'ANALYSIS' | 'HYPOTHESIS' | 'COUNTER' | 'STRUCTURE';

export interface User {
  name: string;
  character: CharacterType;
  profileIcon: string; // 'NORMAL' or a data URL
  score: number;
  coins: number;
  gems: number;
  tickets: number;
  rank: string;
  level: number;
  loginDays: number;
  lastLoginDate: string;
  loginBonusClaimedDate: string;
  logicalPercentage: number;
  isTutorialComplete: boolean;
  traits: string[];
  theme: 'LIGHT' | 'DARK';
  language: 'JA' | 'EN' | 'ZH' | 'KO';
}

export type Difficulty = 'EASY' | 'NORMAL' | 'HARD' | 'VERY_HARD' | 'EXPERT' | 'MASTER' | 'GRAND_MASTER' | 'LEGEND' | 'MYTHIC';

export type QuestionType = 'CHOICE' | 'TEXT' | 'SORT' | 'FILL';

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  category: string;
  text: string;
  options?: string[];
  answer: string | string[];
  explanation: string;
  hint: string;
  specialty: CharacterType[];
}

export interface QuizResult {
  score: number;
  feedback: string;
  analysis: {
    causality: number;
    organization: number;
    objectivity: number;
    understanding: number;
    consistency: number;
  };
}

export type Rarity = 'NORMAL' | 'RARE' | 'SUPER_RARE' | 'ULTRA_RARE' | 'POWERFUL_RARE' | 'LEGEND_RARE';

export interface GachaResult {
  rarity: Rarity;
  name: string;
  type: 'SKIN' | 'DECORATION' | 'ITEM';
}
