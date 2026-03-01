import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, CharacterType } from '../types';
import { CHARACTERS, RANKS } from '../constants';
import { TRANSLATIONS } from '../translations';
import { audioManager } from '../utils/audio';
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

  useEffect(() => {
    // Start BGM on Home Screen
    audioManager.startBGM();
    return () => {
      // Stop BGM when leaving Home Screen
      audioManager.stopBGM();
    };
  }, []);

  const handleNavigate = (screen: any) => {
    audioManager.playSFX('BUTTON_TAP');
    onNavigate(screen);
  };

  const handleModeNavigate = (screen: any) => {
    audioManager.playSFX('MODE_TAP');
    onNavigate(screen);
  };

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
      desc: user.language === 'JA' ? '世界中のロジカーとスコアを競う' : user.language === 'ZH' ? '與全球邏輯家競爭得分' : user.language === 'KO' ? '전 세계 로ジ커들과 스코어 경쟁' : 'Compete with Logickers worldwide', 
      help: t.help_ranking,
      icon: <Trophy className="w-8 h-8" />,
      color: 'bg-purple-500'
    }
  ];

  const isDark = user.theme === 'DARK';

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-500 relative overflow-hidden ${isDark ? 'bg-cyber-black text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
      {/* Futuristic Background Elements */}
      {isDark && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.05),transparent_70%)] pointer-events-none" />
          <div className="scanline" />
        </>
      )}

      {/* Top Bar */}
      <div className={`sticky top-0 z-30 backdrop-blur-md border-b px-4 py-3 flex items-center justify-between shadow-sm transition-colors ${isDark ? 'bg-cyber-black/80 border-white/10' : 'bg-white/80 border-stone-200'}`}>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${isDark ? 'bg-white/5 border-white/10' : 'bg-stone-100 border-stone-200'}`}>
            <Coins className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-bold font-mono tracking-tighter">{user.coins.toLocaleString()}</span>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${isDark ? 'bg-white/5 border-white/10' : 'bg-stone-100 border-stone-200'}`}>
            <Gem className="w-4 h-4 text-neon-violet" />
            <span className="text-sm font-bold font-mono tracking-tighter">{user.gems.toLocaleString()}</span>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${isDark ? 'bg-white/5 border-white/10' : 'bg-stone-100 border-stone-200'}`}>
            <Ticket className="w-4 h-4 text-neon-emerald" />
            <span className="text-sm font-bold font-mono tracking-tighter">{user.tickets.toLocaleString()}</span>
          </div>
        </div>
        
        <button 
          onClick={() => handleNavigate('SETTINGS')}
          className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-stone-400 hover:text-neon-cyan' : 'hover:bg-stone-100 text-stone-600'}`}
        >
          <SettingsIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-8 space-y-8 relative z-10">
        {/* Profile Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden transition-all ${isDark ? 'glass-panel cyber-glow' : 'bg-white shadow-stone-200/50'}`}
        >
          {isDark && (
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
          )}
          
          <div className={`relative z-10 w-24 h-24 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden border-2 ${isDark ? 'bg-cyber-black border-white/10' : 'bg-stone-100 border-stone-200'}`}>
            {user.profileIcon === 'NORMAL' ? (
              <UserIcon className={`w-12 h-12 ${isDark ? 'text-stone-700' : 'text-stone-400'}`} />
            ) : (
              <img src={user.profileIcon} alt="Profile" className="w-full h-full object-cover" />
            )}
          </div>
          
          <div className="relative z-10 flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-end gap-2 mb-4">
              <h2 className={`text-3xl font-black font-tech tracking-tighter ${isDark ? 'text-white' : 'text-stone-900'}`}>{user.name}</h2>
              <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block font-mono ${isDark ? 'bg-neon-cyan text-cyber-black' : 'bg-stone-900 text-white'}`}>
                {user.rank}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
                <span>{t.home_stats_score}</span>
                <span className="font-mono">{user.score.toLocaleString()}</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-stone-100'}`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (user.score / (RANKS[RANKS.indexOf(currentRank) + 1]?.minScore || user.score)) * 100)}%` }}
                  className={`h-full transition-all duration-1000 ${isDark ? 'bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)]' : 'bg-stone-900'}`}
                />
              </div>
            </div>
          </div>

          <div className={`relative z-10 flex flex-col items-center gap-1 p-4 rounded-2xl border transition-all ${isDark ? 'bg-neon-emerald/10 border-neon-emerald/30 shadow-[0_0_15px_rgba(0,255,159,0.1)]' : 'bg-emerald-50 border-emerald-100'}`}>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-neon-emerald' : 'text-emerald-600'}`}>{t.home_stats_logical}</span>
            <span className={`text-3xl font-black font-tech ${isDark ? 'text-white' : 'text-emerald-700'}`}>{user.logicalPercentage}%</span>
          </div>
        </motion.div>

        {/* Stats & Login */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-6 rounded-3xl shadow-md flex items-center gap-4 transition-all ${isDark ? 'glass-panel border-white/10' : 'bg-white'}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isDark ? 'bg-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]' : 'bg-orange-50 text-orange-500'}`}>
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{user.language === 'JA' ? '連続ログイン' : user.language === 'ZH' ? '連續登錄' : user.language === 'KO' ? '연속 로그인' : 'Consecutive Login'}</div>
              <div className="text-2xl font-black font-tech">{user.loginDays}{user.language === 'JA' ? '日' : user.language === 'ZH' ? '天' : user.language === 'KO' ? '일' : ' Days'}</div>
            </div>
          </div>
          <button 
            onClick={() => handleNavigate('LOGIN_BONUS')}
            className={`p-6 rounded-3xl shadow-md flex items-center gap-4 transition-all text-left group ${isDark ? 'glass-panel border-white/10 hover:border-neon-violet/50' : 'bg-white hover:bg-stone-50'}`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isDark ? 'bg-neon-violet/20 text-neon-violet shadow-[0_0_15px_rgba(188,19,254,0.2)]' : 'bg-pink-50 text-pink-500'}`}>
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{t.login_bonus_title}</div>
              <div className={`text-sm font-bold ${isDark ? 'text-stone-300 group-hover:text-neon-violet' : 'text-stone-600'}`}>{user.language === 'JA' ? 'スタンプを確認' : user.language === 'ZH' ? '查看印章' : user.language === 'KO' ? '스탬프 확인' : 'Check Stamps'}</div>
            </div>
          </button>
        </div>

        {/* Modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modes.map((mode) => (
            <div key={mode.id} className="relative group">
              <button
                onClick={() => handleModeNavigate(mode.id)}
                className={`w-full p-8 rounded-[2.5rem] shadow-lg transition-all flex items-center gap-6 text-left border group-hover:-translate-y-1 ${isDark ? 'glass-panel border-white/10 hover:border-neon-cyan/50' : 'bg-white border-stone-100 shadow-stone-200/50'}`}
              >
                <div className={`w-16 h-16 rounded-3xl ${mode.color} text-white flex items-center justify-center shadow-lg transition-all group-hover:scale-110 group-hover:rotate-3`}>
                  {mode.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-black mb-1 font-tech tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>{mode.name}</h3>
                  <p className="text-sm text-stone-400 leading-tight font-medium">{mode.desc}</p>
                </div>
              </button>
              
              <button 
                onClick={() => {
                  audioManager.playSFX('BUTTON_TAP');
                  setShowGuide(showGuide === mode.id ? null : mode.id);
                }}
                className={`absolute top-4 right-4 p-2 transition-colors ${isDark ? 'text-stone-600 hover:text-neon-cyan' : 'text-stone-300 hover:text-stone-900'}`}
              >
                <HelpCircle className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {showGuide === mode.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className={`absolute z-20 top-full mt-2 left-0 right-0 p-4 rounded-2xl shadow-2xl text-sm border ${isDark ? 'bg-cyber-black text-white border-neon-cyan/30' : 'bg-stone-900 text-white'}`}
                  >
                    <div className={`absolute -top-2 right-6 w-4 h-4 rotate-45 border-t border-l ${isDark ? 'bg-cyber-black border-neon-cyan/30' : 'bg-stone-900'}`} />
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
