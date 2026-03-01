import { LucideIcon } from 'lucide-react';

export type CharacterType = 'ANALYSIS' | 'HYPOTHESIS' | 'COUNTER' | 'STRUCTURE';
export type Difficulty = 'EASY' | 'NORMAL' | 'HARD' | 'VERY_HARD' | 'EXPERT' | 'MASTER' | 'GRAND_MASTER' | 'LEGEND' | 'MYTHIC';
export type Rarity = 'NORMAL' | 'RARE' | 'SUPER_RARE' | 'ULTRA_RARE' | 'POWERFUL_RARE' | 'LEGEND_RARE';

export interface User {
  id: string;
  name: string;
  rank: string;
  score: number;
  coins: number;
  gems: number;
  tickets: number;
  character: CharacterType;
  theme: 'LIGHT' | 'DARK';
  language: 'JA' | 'EN' | 'ZH' | 'KO';
  logicalPercentage: number;
  inventory: string[];
  profileIcon?: string;
  loginDays: number;
  loginBonusClaimedDate?: string;
  lastLoginDate?: string;
}

export interface Question {
  id: string | number;
  type: 'CHOICE' | 'TEXT';
  difficulty: Difficulty;
  category: string;
  text: string;
  options: string[];
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

// Types for the new 100 questions quiz
export type StaticCategory = 
  | 'subjective_fact' 
  | 'cause_effect' 
  | 'logical_leap' 
  | 'element_division' 
  | 'perspective_shift' 
  | 'data_interpretation' 
  | 'definition_thinking';

export interface StaticQuestion {
  id: number;
  category: StaticCategory;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface StaticCategoryInfo {
  id: StaticCategory;
  title: string;
  icon: LucideIcon;
  description: string;
  color: string;
}
