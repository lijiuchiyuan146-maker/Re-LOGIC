import { motion } from 'motion/react';
import { X, Trophy } from 'lucide-react';
import { User } from '../types';
import { TRANSLATIONS } from '../translations';

interface RankingProps {
  user: User;
  onBack: () => void;
}

export default function Ranking({ user, onBack }: RankingProps) {
  const t = TRANSLATIONS[user.language || 'JA'];
  const isDark = user.theme === 'DARK';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 relative overflow-hidden ${isDark ? 'bg-cyber-black text-white' : 'bg-stone-50 text-stone-900'}`}>
      {/* Futuristic Background Elements */}
      {isDark && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="scanline" />
        </>
      )}

      <div className="p-6 flex justify-end relative z-20">
        <button 
          onClick={onBack}
          className={`p-3 rounded-full transition-colors ${isDark ? 'bg-white/5 text-stone-400 hover:bg-white/10 border border-white/10' : 'bg-white text-stone-600 hover:bg-stone-100 shadow-sm'}`}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-8"
        >
          <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl mb-10 border-2 ${isDark ? 'bg-neon-violet/10 border-neon-violet/30 text-neon-violet cyber-glow' : 'bg-purple-500 text-white'}`}>
            <Trophy className="w-16 h-16 drop-shadow-[0_0_10px_currentColor]" />
          </div>
          <h2 className="text-5xl font-black tracking-tighter italic font-tech text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{t.coming_soon}</h2>
          <p className={`font-bold font-tech tracking-tight ${isDark ? 'text-neon-violet/60' : 'text-stone-500'}`}>{t.stay_tuned}</p>
          
          <div className="flex gap-2 justify-center mt-8">
            <div className="w-2 h-2 rounded-full bg-neon-violet animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-neon-violet animate-pulse delay-75" />
            <div className="w-2 h-2 rounded-full bg-neon-violet animate-pulse delay-150" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
