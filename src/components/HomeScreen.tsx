import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, CharacterType } from '../types';
import { CHARACTERS, RANKS } from '../constants';
import { TRANSLATIONS } from '../translations';
import { 
  Coins, 
  Gem, 
  Ticket, 
  Settings as SettingsIcon, 
  Play, 
  ShoppingBag, 
  Gift, 
  Trophy, 
  HelpCircle,
  Info,
  Flame,
  User as UserIcon
} from 'lucide-react';

const GachaIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 3a7 7 0 0 0-7 7v2h14v-2a7 7 0 0 0-7-7Z" />
    <rect x="5" y="12" width="14" height="9" rx="2" />
    <circle cx="12" cy="16" r="1.5" />
    <path d="M9 21h6" />
  </svg>
);

interface HomeScreenProps {
  user: User;
  onNavigate: (screen: any) => void;
  onUpdateUser: (updates: Partial<User>) => void;
}

export default function HomeScreen({ user, onNavigate, onUpdateUser }: HomeScreenProps) {
  const [showGuide, setShowGuide] = useState<string | null>(null);
  const t = TRANSLATIONS[user.language || 'JA'];

  const currentRank = RANKS.find(r => user.score < (RANKS[RANKS.indexOf(r) + 1]?.minScore || Infinity)) || RANKS[RANKS.length - 1];

  const modes = [
    { 
      id: 'LESSON', 
      name: t.home_tab_lesson, 
      desc: t.home_lesson_desc, 
      help: t.help_lesson,
      icon: <Play className="w-8 h-8" />,
      color: 'bg-emerald-500'
    },
    { 
      id: 'GACHA', 
      name: t.home_tab_gacha, 
      desc: t.gacha_desc, 
      help: t.help_gacha,
      icon: <GachaIcon className="w-8 h-8" />,
      color: 'bg-amber-500'
    },
    { 
      id: 'STORE', 
      name: user.language === 'JA' ? 'ストア' : user.language === 'ZH' ? '商店' : user.language === 'KO' ? '상점' : 'Store', 
      desc: user.language === 'JA' ? 'アイテムやジェムの購入' : user.language === 'ZH' ? '購買道具或寶石' : user.language === 'KO' ? '아이템 및 젬 구매' : 'Purchase items and gems', 
      help: t.help_store,
      icon: <ShoppingBag className="w-8 h-8" />,
      color: 'bg-blue-500'
    },
    { 
      id: 'RANKING', 
      name: user.language === 'JA' ? 'ランキング' : user.language === 'ZH' ? '排行榜' : user.language === 'KO' ? '랭킹' : 'Ranking', 
      desc: user.language === 'JA' ? '世界中のロジカーとスコアを競う' : user.language === 'ZH' ? '與全球邏輯家競爭得分' : user.language === 'KO' ? '전 세계 로지커들과 스코어 경쟁' : 'Compete with Logickers worldwide', 
      help: t.help_ranking,
      icon: <Trophy className="w-8 h-8" />,
      color: 'bg-purple-500'
    }
  ];

  const isDark = user.theme === 'DARK';

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-500 ${isDark ? 'bg-black text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
      {/* Top Bar */}
      <div className={`sticky top-0 z-30 backdrop-blur-md border-b px-4 py-3 flex items-center justify-between shadow-sm transition-colors ${isDark ? 'bg-stone-900/80 border-stone-800' : 'bg-white/80 border-stone-200'}`}>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isDark ? 'bg-stone-800' : 'bg-stone-100'}`}>
            <Coins className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold font-mono">{user.coins.toLocaleString()}</span>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isDark ? 'bg-stone-800' : 'bg-stone-100'}`}>
            <Gem className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-bold font-mono">{user.gems.toLocaleString()}</span>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isDark ? 'bg-stone-800' : 'bg-stone-100'}`}>
            <Ticket className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-bold font-mono">{user.tickets.toLocaleString()}</span>
          </div>
        </div>
        
        <button 
          onClick={() => onNavigate('SETTINGS')}
          className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-stone-800 text-stone-400' : 'hover:bg-stone-100 text-stone-600'}`}
        >
          <SettingsIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-8 space-y-8">
        {/* Profile Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden transition-colors ${isDark ? 'bg-stone-900 shadow-black/20 border border-stone-800' : 'bg-white shadow-stone-200/50'}`}
        >
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-8 -mt-8 z-0 ${isDark ? 'bg-stone-800/50' : 'bg-stone-50'}`} />
          
          <div className={`relative z-10 w-24 h-24 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden border-2 ${isDark ? 'bg-stone-800 border-stone-700' : 'bg-stone-100 border-stone-200'}`}>
            {user.profileIcon === 'NORMAL' ? (
              <UserIcon className={`w-12 h-12 ${isDark ? 'text-stone-600' : 'text-stone-400'}`} />
            ) : (
              <img src={user.profileIcon} alt="Profile" className="w-full h-full object-cover" />
            )}
          </div>
          
          <div className="relative z-10 flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-end gap-2 mb-4">
              <h2 className="text-3xl font-black">{user.name}</h2>
              <span className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${isDark ? 'bg-stone-100 text-stone-900' : 'bg-stone-900 text-white'}`}>
                {user.rank}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400">
                <span>{t.home_stats_score}</span>
                <span>{user.score.toLocaleString()}</span>
              </div>
              <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-stone-800' : 'bg-stone-100'}`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (user.score / (RANKS[RANKS.indexOf(currentRank) + 1]?.minScore || user.score)) * 100)}%` }}
                  className={`h-full ${isDark ? 'bg-stone-100' : 'bg-stone-900'}`}
                />
              </div>
            </div>
          </div>

          <div className={`relative z-10 flex flex-col items-center gap-1 p-4 rounded-2xl border ${isDark ? 'bg-emerald-900/20 border-emerald-800/50' : 'bg-emerald-50 border-emerald-100'}`}>
            <span className={`text-[10px] font-bold uppercase tracking-tighter ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{t.home_stats_logical}</span>
            <span className={`text-3xl font-black ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>{user.logicalPercentage}%</span>
          </div>
        </motion.div>

        {/* Stats & Login */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-6 rounded-3xl shadow-md flex items-center gap-4 transition-colors ${isDark ? 'bg-stone-900 border border-stone-800' : 'bg-white'}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDark ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-50 text-orange-500'}`}>
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-400 uppercase">{user.language === 'JA' ? '連続ログイン' : user.language === 'ZH' ? '連續登錄' : user.language === 'KO' ? '연속 로그인' : 'Consecutive Login'}</div>
              <div className="text-2xl font-black">{user.loginDays}{user.language === 'JA' ? '日' : user.language === 'ZH' ? '天' : user.language === 'KO' ? '일' : ' Days'}</div>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('LOGIN_BONUS')}
            className={`p-6 rounded-3xl shadow-md flex items-center gap-4 transition-all text-left ${isDark ? 'bg-stone-900 border border-stone-800 hover:bg-stone-800' : 'bg-white hover:bg-stone-50'}`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDark ? 'bg-pink-900/30 text-pink-400' : 'bg-pink-50 text-pink-500'}`}>
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-400 uppercase">{t.login_bonus_title}</div>
              <div className={`text-sm font-bold ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>{user.language === 'JA' ? 'スタンプを確認' : user.language === 'ZH' ? '查看印章' : user.language === 'KO' ? '스탬프 확인' : 'Check Stamps'}</div>
            </div>
          </button>
        </div>

        {/* Modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modes.map((mode) => (
            <div key={mode.id} className="relative group">
              <button
                onClick={() => onNavigate(mode.id)}
                className={`w-full p-8 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all flex items-center gap-6 text-left border group-hover:-translate-y-1 ${isDark ? 'bg-stone-900 border-stone-800 shadow-black/20' : 'bg-white border-stone-100 shadow-stone-200/50'}`}
              >
                <div className={`w-16 h-16 rounded-3xl ${mode.color} text-white flex items-center justify-center shadow-lg`}>
                  {mode.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black mb-1">{mode.name}</h3>
                  <p className="text-sm text-stone-400 leading-tight">{mode.desc}</p>
                </div>
              </button>
              
              <button 
                onClick={() => setShowGuide(showGuide === mode.id ? null : mode.id)}
                className={`absolute top-4 right-4 p-2 transition-colors ${isDark ? 'text-stone-600 hover:text-stone-300' : 'text-stone-300 hover:text-stone-900'}`}
              >
                <HelpCircle className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {showGuide === mode.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className={`absolute z-20 top-full mt-2 left-0 right-0 p-4 rounded-2xl shadow-2xl text-sm ${isDark ? 'bg-stone-100 text-stone-900' : 'bg-stone-900 text-white'}`}
                  >
                    <div className={`absolute -top-2 right-6 w-4 h-4 rotate-45 ${isDark ? 'bg-stone-100' : 'bg-stone-900'}`} />
                    {(mode as any).help || mode.desc}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
