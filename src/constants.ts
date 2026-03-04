import { CharacterType, Difficulty, Rarity } from "./types";

export const LANGUAGES = {
  JA: { name: '日本語', native: '日本語' },
  EN: { name: 'English', native: 'English' },
  ZH: { name: 'Chinese', native: '中文' },
  KO: { name: 'Korean', native: '한국어' }
};

export const CHARACTERS: Record<CharacterType, { name: string; description: string; specialty: string; icon: string }> = {
  ANALYSIS: {
    name: '分析型',
    description: '情報をきれいに整理するのが得意',
    specialty: '情報整理問題',
    icon: '🔍'
  },
  HYPOTHESIS: {
    name: '仮説型',
    description: '「なぜ？」を深く考えるのが得意',
    specialty: '「なぜ？」問題',
    icon: '🧠'
  },
  COUNTER: {
    name: '反論型',
    description: '相手の考えのミスを見つけるのが得意',
    specialty: '論理ミス指摘',
    icon: '⚖️'
  },
  STRUCTURE: {
    name: '構造型',
    description: '物事のつながりや順番を見るのが得意',
    specialty: '因果・順序問題',
    icon: '🧩'
  }
};

export const RANKS = [
  { name: '論理ビギナー', minScore: 0, color: '#94a3b8' },
  { name: '論理ノービス', minScore: 1500, color: '#64748b' },
  { name: '論理ルーキー', minScore: 4000, color: '#4ade80' },
  { name: '論理ブロンズ', minScore: 7500, color: '#d97706' },
  { name: '論理シルバー', minScore: 10000, color: '#94a3b8' },
  { name: '論理ゴールド', minScore: 15000, color: '#facc15' },
  { name: '論理プラチナ', minScore: 30000, color: '#22d3ee' },
  { name: '論理ダイヤ', minScore: 60000, color: '#3b82f6' },
  { name: '論理マスター', minScore: 90000, color: '#a855f7' },
  { name: '論理レジェンド', minScore: 150000, color: '#ef4444' },
  { name: '論理ゴッド', minScore: 200000, color: '#000000' },
];

export const DIFFICULTIES: Difficulty[] = [
  'EASY', 'NORMAL', 'HARD', 'VERY_HARD', 'EXPERT', 'MASTER', 'GRAND_MASTER', 'LEGEND', 'MYTHIC'
];

export const RARITIES: Record<Rarity, { name: string; color: string; chance: number }> = {
  NORMAL: { name: 'ノーマル', color: '#94a3b8', chance: 0.5 },
  RARE: { name: 'レア', color: '#3b82f6', chance: 0.3 },
  SUPER_RARE: { name: 'スーパーレア', color: '#a855f7', chance: 0.12 },
  ULTRA_RARE: { name: 'ウルトラレア', color: '#facc15', chance: 0.05 },
  POWERFUL_RARE: { name: 'パワフルレア', color: '#f97316', chance: 0.02 },
  LEGEND_RARE: { name: 'レジェンドレア', color: '#ef4444', chance: 0.01 },
};

export const LOGIN_BONUS_REWARDS = [
  { type: 'COINS', amount: 100 },
  { type: 'GEMS', amount: 1 },
  { type: 'TICKETS', amount: 1 },
  { type: 'COINS', amount: 200 },
  { type: 'GEMS', amount: 2 },
  { type: 'TICKETS', amount: 1 },
  { type: 'COINS', amount: 500 },
];
