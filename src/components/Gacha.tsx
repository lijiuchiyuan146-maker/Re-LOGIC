import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { User, Rarity } from '../types';
import { RARITIES } from '../constants';
import { TRANSLATIONS } from '../translations';
import { audioManager } from '../utils/audio';
import { 
  X, 
  Coins, 
  Gem, 
  Ticket, 
  Zap, 
  Sparkles,
  Lightbulb,
  AlertCircle
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

interface GachaProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
  onBack: () => void;
}

export default function Gacha({ user, onUpdateUser, onBack }: GachaProps) {
  const [step, setStep] = useState<'IDLE' | 'CONFIRM' | 'PULLING' | 'RESULT'>('IDLE');
  const [pullType, setPullType] = useState<'COIN' | 'GEM' | 'TICKET' | null>(null);
  const [tapCount, setTapCount] = useState(0);
  const [currentRarity, setCurrentRarity] = useState<Rarity>('NORMAL');
  const [result, setResult] = useState<{ rarity: Rarity; name: string } | null>(null);
  const [showLightning, setShowLightning] = useState(false);

  const pullCosts = {
    COIN: 300,
    GEM: 3,
    TICKET: 1
  };

  const handlePullRequest = (type: 'COIN' | 'GEM' | 'TICKET') => {
    if (type === 'COIN' && user.coins < pullCosts.COIN) return;
    if (type === 'GEM' && user.gems < pullCosts.GEM) return;
    if (type === 'TICKET' && user.tickets < pullCosts.TICKET) return;
    
    audioManager.playSFX('MODE_TAP');
    setPullType(type);
    setStep('CONFIRM');
  };

  const startPull = () => {
    audioManager.playSFX('BUTTON_TAP');
    // Consume resources
    if (pullType === 'COIN') onUpdateUser({ coins: user.coins - pullCosts.COIN });
    if (pullType === 'GEM') onUpdateUser({ gems: user.gems - pullCosts.GEM });
    if (pullType === 'TICKET') onUpdateUser({ tickets: user.tickets - pullCosts.TICKET });
    
    setStep('PULLING');
    setTapCount(0);
    setCurrentRarity('NORMAL');
  };

  const handleTap = () => {
    if (tapCount >= 5) return;
    
    audioManager.playSFX('TITLE_TAP');
    const nextTap = tapCount + 1;
    setTapCount(nextTap);
    
    // Trigger quick lightning flash
    setShowLightning(true);
    setTimeout(() => setShowLightning(false), 150);
    
    // Chance to upgrade rarity - Adjusted to ~2% for Powerful Rare (0.37^4 ≈ 0.018)
    const rarities: Rarity[] = ['NORMAL', 'RARE', 'SUPER_RARE', 'ULTRA_RARE', 'POWERFUL_RARE', 'LEGEND_RARE'];
    const currentIndex = rarities.indexOf(currentRarity);
    
    if (Math.random() < 0.37 && currentIndex < rarities.length - 1) {
      const nextRarity = rarities[currentIndex + 1];
      setCurrentRarity(nextRarity);
      
      // Intense lightning for upgrade
      setShowLightning(true);
      setTimeout(() => setShowLightning(false), 400);
      
      // Scale confetti based on rarity
      const intensity = (currentIndex + 1) / rarities.length;
      confetti({
        particleCount: Math.floor(30 + intensity * 70),
        spread: 40 + intensity * 60,
        origin: { y: 0.7 },
        colors: [RARITIES[nextRarity].color, '#ffffff', '#00f3ff']
      });
    }

    if (nextTap === 5) {
      setTimeout(() => {
        // Final result based on current rarity with some randomness
        setResult({
          rarity: currentRarity,
          name: `${user.language === 'JA' ? 'ロジカル' : user.language === 'ZH' ? '逻辑' : user.language === 'KO' ? '로지컬' : 'Logical'} ${currentRarity === 'NORMAL' ? (user.language === 'JA' ? 'チップ' : user.language === 'ZH' ? '碎片' : user.language === 'KO' ? '칩' : 'Chip') : (user.language === 'JA' ? 'コア' : user.language === 'ZH' ? '核心' : user.language === 'KO' ? '코어' : 'Core')}`
        });
        
        // Final big blast for high rarities
        if (currentIndex >= 3) {
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
            colors: [RARITIES[currentRarity].color, '#ffffff', '#00f3ff', '#ffd700']
          });
        }
        
        setStep('RESULT');
      }, 500);
    }
  };

  const handleBack = () => {
    audioManager.playSFX('BUTTON_TAP');
    onBack();
  };

  const handleReset = () => {
    audioManager.playSFX('BUTTON_TAP');
    setStep('IDLE');
  };

  const handleCancel = () => {
    audioManager.playSFX('BUTTON_TAP');
    setStep('IDLE');
  };

  const isDark = user.theme === 'DARK';
  const t = TRANSLATIONS[user.language || 'JA'];
  const rarities: Rarity[] = ['NORMAL', 'RARE', 'SUPER_RARE', 'ULTRA_RARE', 'POWERFUL_RARE', 'LEGEND_RARE'];
  const currentIndex = rarities.indexOf(currentRarity);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 relative overflow-hidden ${isDark ? 'bg-cyber-black text-white' : 'bg-stone-50 text-stone-900'}`}>
      {/* Futuristic Background Elements */}
      {isDark && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="scanline" />
        </>
      )}

      {/* Header */}
      <div className={`sticky top-0 z-30 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between transition-colors ${isDark ? 'bg-cyber-black/80 border-white/10' : 'bg-white/80 border-stone-200'}`}>
        <button onClick={handleBack} className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-stone-400' : 'hover:bg-stone-200 text-stone-600'}`}>
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${isDark ? 'bg-white/5 border-white/10' : 'bg-stone-100 border-stone-200'}`}>
            <Coins className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-bold font-mono">{user.coins.toLocaleString()}</span>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${isDark ? 'bg-white/5 border-white/10' : 'bg-stone-100 border-stone-200'}`}>
            <Gem className="w-4 h-4 text-neon-violet" />
            <span className="text-sm font-bold font-mono">{user.gems.toLocaleString()}</span>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${isDark ? 'bg-white/5 border-white/10' : 'bg-stone-100 border-stone-200'}`}>
            <Ticket className="w-4 h-4 text-neon-emerald" />
            <span className="text-sm font-bold font-mono">{user.tickets.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        {step === 'IDLE' && (
          <div className="max-w-md w-full space-y-12 text-center">
            <div className="relative">
              <motion.div 
                animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className={`w-64 h-64 rounded-[3rem] mx-auto border flex items-center justify-center shadow-2xl transition-all ${isDark ? 'glass-panel border-white/10 cyber-glow' : 'bg-white border-stone-100 shadow-stone-200'}`}
              >
                <GachaIcon className={`w-32 h-32 ${isDark ? 'text-neon-cyan drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]' : 'text-stone-200'}`} />
              </motion.div>
              <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-12 blur-2xl rounded-full ${isDark ? 'bg-neon-cyan/10' : 'bg-stone-200/40'}`} />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-black italic tracking-tighter font-tech">LOGICAL GACHA</h2>
              <p className={`text-sm font-medium ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>{t.gacha_desc}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => handlePullRequest('COIN')}
                className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl font-tech tracking-tight ${isDark ? 'bg-white text-cyber-black shadow-white/10' : 'bg-stone-900 text-white'}`}
              >
                <Coins className="w-5 h-5 text-neon-cyan" />
                {t.gacha_start_coin.replace('{cost}', pullCosts.COIN.toString())}
              </button>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handlePullRequest('GEM')}
                  className={`py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-all border ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-stone-100 border-stone-200 text-stone-900 hover:bg-stone-200'}`}
                >
                  <Gem className="w-5 h-5 text-neon-violet" />
                  {t.gacha_start_gem.replace('{cost}', pullCosts.GEM.toString())}
                </button>
                <button 
                  onClick={() => handlePullRequest('TICKET')}
                  className={`py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-all border ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-stone-100 border-stone-200 text-stone-900 hover:bg-stone-200'}`}
                >
                  <Ticket className="w-5 h-5 text-neon-emerald" />
                  {t.gacha_start_ticket.replace('{cost}', pullCosts.TICKET.toString())}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'PULLING' && (
          <motion.div 
            animate={showLightning ? { x: [-3, 3, -3, 3, 0], y: [-3, 3, -3, 3, 0] } : {}}
            transition={{ duration: 0.1 }}
            className="text-center space-y-12 relative w-full max-w-lg mx-auto"
          >
            {/* Rarity Display at Top */}
            <motion.div 
              key={currentRarity}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute -top-32 left-0 right-0"
            >
              <div 
                className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter drop-shadow-[0_0_20px_currentColor] font-tech"
                style={{ color: RARITIES[currentRarity].color }}
              >
                {RARITIES[currentRarity].name}
              </div>
              <div className={`text-[10px] font-bold uppercase tracking-[0.5em] mt-3 font-mono ${isDark ? 'text-white/40' : 'text-stone-400'}`}>
                Current Grade
              </div>
            </motion.div>

            <div className="relative">
              <motion.button 
                onClick={handleTap}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                  scale: 1 + (tapCount * 0.08),
                  rotate: tapCount * 3,
                  boxShadow: `0 0 ${30 + tapCount * 15}px ${RARITIES[currentRarity].color}60`
                }}
                className={`w-64 h-64 rounded-[3rem] mx-auto flex items-center justify-center transition-all duration-500 cursor-pointer relative z-10`}
                style={{ backgroundColor: RARITIES[currentRarity].color + '15', border: `4px solid ${RARITIES[currentRarity].color}30` }}
              >
                <Lightbulb 
                  className="w-28 h-28 transition-colors duration-500 drop-shadow-[0_0_10px_currentColor]" 
                  style={{ color: RARITIES[currentRarity].color }}
                />

                {/* Lightning Bolts & Sparkles */}
                <AnimatePresence>
                  {showLightning && (
                    <>
                      {[...Array(currentIndex + 4)].map((_, i) => (
                        <motion.div
                          key={`zap-${i}`}
                          initial={{ opacity: 0, scale: 0.5, rotate: Math.random() * 360 }}
                          animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 1], x: (Math.random() - 0.5) * 400, y: (Math.random() - 0.5) * 400 }}
                          exit={{ opacity: 0 }}
                          className="absolute pointer-events-none"
                          style={{ color: RARITIES[currentRarity].color }}
                        >
                          {i % 2 === 0 ? (
                            <Zap className="w-14 h-14 fill-current filter drop-shadow-[0_0_12px_currentColor]" />
                          ) : (
                            <Sparkles className="w-12 h-12 fill-current filter drop-shadow-[0_0_12px_currentColor]" />
                          )}
                        </motion.div>
                      ))}
                      {/* Screen Flash */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.3, 0] }}
                        className="fixed inset-0 pointer-events-none z-[100]"
                        style={{ backgroundColor: RARITIES[currentRarity].color }}
                      />
                    </>
                  )}
                </AnimatePresence>
                
                {/* Visual Feedback on Tap */}
                <AnimatePresence>
                  {[...Array(tapCount)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      className="absolute inset-0 rounded-[3rem] border-4 pointer-events-none"
                      style={{ borderColor: RARITIES[currentRarity].color }}
                    />
                  ))}
                </AnimatePresence>
              </motion.button>
              
              <AnimatePresence>
                {tapCount < 5 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`absolute -bottom-16 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.8em] font-mono ${isDark ? 'text-neon-cyan' : 'text-stone-400'}`}
                  >
                    {t.gacha_tap_charge} ({tapCount}/5)
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hint text */}
            <p className={`text-sm font-bold font-tech tracking-tight ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
              {user.language === 'JA' ? 'アイコンをタップしてパワーを注入！' : 'Tap the icon to inject power!'}
            </p>
          </motion.div>
        )}

        {step === 'RESULT' && result && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-12"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="absolute inset-0 blur-[60px] opacity-40"
                style={{ backgroundColor: RARITIES[result.rarity].color }}
              />
              <div 
                className="relative w-64 h-64 rounded-[3rem] mx-auto flex flex-col items-center justify-center shadow-2xl border-4"
                style={{ backgroundColor: RARITIES[result.rarity].color, borderColor: 'rgba(255,255,255,0.3)' }}
              >
                <Sparkles className="w-24 h-24 text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 font-mono">{RARITIES[result.rarity].name}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-5xl font-black italic font-tech tracking-tight">{result.name}</h2>
              <p className={`font-medium ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>{t.gacha_result_desc}</p>
            </div>

            <button 
              onClick={handleReset}
              className={`px-16 py-5 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl font-tech tracking-tight ${isDark ? 'bg-white text-cyber-black shadow-white/10' : 'bg-stone-900 text-white'}`}
            >
              {t.gacha_result_btn}
            </button>
          </motion.div>
        )}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {step === 'CONFIRM' && pullType && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
          >
            <div className={`border rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl ${isDark ? 'glass-panel border-white/10' : 'bg-white border-stone-100'}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${isDark ? 'bg-white/5 text-neon-cyan' : 'bg-stone-100 text-stone-900'}`}>
                <AlertCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black mb-2 font-tech tracking-tight">{t.gacha_confirm_title}</h2>
              <p className={`text-sm mb-10 font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                {t.gacha_confirm_desc.replace('{cost}', pullType === 'COIN' ? `300 ${t.logical_coin}` : pullType === 'GEM' ? `3 ${t.logical_gem}` : `1 ${t.gacha_ticket}`)}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleCancel}
                  className={`py-4 rounded-xl font-bold transition-colors border ${isDark ? 'bg-white/5 border-white/10 text-stone-400 hover:bg-white/10' : 'bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-200'}`}
                >
                  {t.gacha_confirm_cancel}
                </button>
                <button 
                  onClick={startPull}
                  className={`py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-lg font-tech tracking-tight ${isDark ? 'bg-white text-cyber-black' : 'bg-stone-900 text-white'}`}
                >
                  {t.gacha_confirm_ok}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
