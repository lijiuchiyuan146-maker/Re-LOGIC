import { StaticCategory, StaticCategoryInfo } from '../types';
import { 
  Brain, 
  HelpCircle, 
  Zap, 
  Layers, 
  Users, 
  BarChart2, 
  BookOpen 
} from 'lucide-react';

export const categories: StaticCategoryInfo[] = [
  {
    id: 'subjective_fact',
    title: '主観 or 事実',
    icon: Brain,
    description: '客観的な事実と個人の主観を見分ける力を養います。',
    color: 'bg-blue-500'
  },
  {
    id: 'cause_effect',
    title: 'なぜ？（原因）',
    icon: HelpCircle,
    description: '物事の背後にある直接的な原因を特定する力を鍛えます。',
    color: 'bg-emerald-500'
  },
  {
    id: 'logical_leap',
    title: '因果の飛躍',
    icon: Zap,
    description: '論理のつながりにある不自然な飛躍を見抜きます。',
    color: 'bg-amber-500'
  },
  {
    id: 'element_division',
    title: '要素を分けろ',
    icon: Layers,
    description: '複雑な事象を構成要素に分解して理解を深めます。',
    color: 'bg-purple-500'
  },
  {
    id: 'perspective_shift',
    title: '立場を変えろ',
    icon: Users,
    description: '多角的な視点から物事を捉え直す柔軟性を養います。',
    color: 'bg-rose-500'
  },
  {
    id: 'data_interpretation',
    title: 'データを見る',
    icon: BarChart2,
    description: '数値や統計から正しく論理的な推論を行う力を鍛えます。',
    color: 'bg-indigo-500'
  },
  {
    id: 'definition_thinking',
    title: '定義を考えろ',
    icon: BookOpen,
    description: '言葉や概念の本質的な意味を再定義し、思考を整理します。',
    color: 'bg-slate-700'
  }
];
