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

export const PERSPECTIVE_THEMES = [
  "学校に自販機を置く",
  "授業はすべてオンラインにする",
  "テスト回数を増やす",
  "校則はもっと厳しくする",
  "スマホは学校に持ち込む",
  "給食は全部同じ量にする",
  "部活は自由に参加する",
  "学校行事を減らす",
  "授業時間を短くする",
  "全テキストをタブレットにする",
  "制服を毎年変える",
  "放課後は全員自習する",
  "体育祭の競争をなくす",
  "図書室の漫画を増やす",
  "成績をすべて公開する",
  "授業中の発言を自由にする",
  "宿題をもっと出す",
  "朝の会をなくす",
  "席替えを毎月する",
  "学校を週4日にする",
  "すべての会社を週4日勤務にする",
  "電車内での通話を禁止する",
  "完全キャッシュレス化する",
  "ニュースをすべて無料にする",
  "すべての車を電気自動車にする",
  "学校のテストをすべてなくす",
  "動画サイトの年齢制限を厳しくする",
  "コンビニの24時間営業をやめる",
  "観光地の入場料を上げる",
  "インターネットを実名登録にする",
  "プラスチック製品を全面禁止する",
  "有名人はSNSを使うべきではない",
  "すべての仕事をAIに任せる",
  "ゲームを1日1時間に制限する",
  "広告をすべて禁止する",
  "大学を無償化する",
  "ニュースのコメント欄を廃止する",
  "学校や会社をすべて制服にする"
];
