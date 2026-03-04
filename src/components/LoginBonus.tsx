import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { User } from '../types';
import { TRANSLATIONS } from '../translations';
import { Gift, Check, Coins, Gem, Ticket, X, Trophy } from 'lucide-react';

interface LoginBonusProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
  onClose: () => void;
}

export default function LoginBonus({ user, onUpdateUser, onClose }: LoginBonusProps) {
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimedReward, setClaimedReward] = useState<{ type: string; amount: number } | null>(null);
  const [showMilestone, setShowMilestone] = useState<number | null>(null);

  const isDark = user.theme === 'DARK';
  const t = TRANSLATIONS[user.language || 'JA'];
  const today = new Date().toISOString().split('T')[0];
  const canClaim = user.loginBonusClaimedDate !== today;
  
  // Calculate next claim time (24h after last login)
  const lastLogin = new Date(user.lastLoginDate);
  const nextClaimTime = new Date(lastLogin.getTime() + 24 * 60 * 60 * 1000);
  const now = new Date();
  const hoursLeft = Math.max(0, Math.ceil((nextClaimTime.getTime() - now.getTime()) / (1000 * 60 * 60)));

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const getRewardForDay = (day: number) => {
    if (day % 7 === 0) return { type: 'TICKET', amount: 1, icon: <Ticket className="w-4 h-4" /> };
    if (day % 3 === 0) return { type: 'GEM', amount: 1, icon: <Gem className="w-4 h-4" /> };
    return { type: 'COIN', amount: 100, icon: <Coins className="w-4 h-4" /> };
  };

  const handleClaim = () => {
    if (!canClaim) return;
    
    setIsClaiming(true);
    const reward = getRewardForDay(user.loginDays);
    setClaimedReward(reward);

    // Check for milestones
    const days = user.loginDays;
    const milestones = [10, 20, 30, 50, 70, 100, 150, 200];
    const isMilestone = milestones.includes(days) || (days >= 250 && (days - 250) % 50 === 0);

    if (isMilestone) {
      setTimeout(() => {
        setShowMilestone(days);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']
        });
      }, 500);
    }

    setTimeout(() => {
      const updates: Partial<User> = {
        loginBonusClaimedDate: today
      };

      if (reward.type === 'COIN') updates.coins = user.coins + reward.amount;
      if (reward.type === 'GEM') updates.gems = user.gems + reward.amount;
      if (reward.type === 'TICKET') updates.tickets = user.tickets + reward.amount;

      onUpdateUser(updates);
      
      setTimeout(() => {
        if (!isMilestone) {
          setIsClaiming(false);
          onClose();
        }
      }, 1500);
    }, 1000);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl ${isDark ? 'bg-black/90' : 'bg-stone-900/90'}`}
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl ${isDark ? 'bg-stone-900 border border-stone-800' : 'bg-white'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-8 border-b flex items-center justify-between ${isDark ? 'border-stone-800' : 'border-stone-100'}`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black">{t.login_bonus_title}</h2>
              <p className="text-sm text-stone-400 font-bold uppercase tracking-widest">Daily Rewards</p>
            </div>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-stone-800' : 'hover:bg-stone-100'}`}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-5 gap-3">
            {days.map((day) => {
              const isClaimed = day < user.loginDays || (day === user.loginDays && !canClaim);
              const isToday = day === user.loginDays && canClaim;
              const reward = getRewardForDay(day);
              
              return (
                <div 
                  key={day}
                  className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center relative transition-all ${
                    isClaimed 
                      ? isDark ? 'bg-stone-800/50 border-stone-800 opacity-50' : 'bg-stone-50 border-stone-100 opacity-50' 
                      : isToday 
                        ? isDark ? 'bg-stone-800 border-stone-100 shadow-lg scale-105 z-10' : 'bg-white border-stone-900 shadow-lg scale-105 z-10' 
                        : isDark ? 'bg-stone-800 border-stone-700' : 'bg-white border-stone-100'
                  }`}
                >
                  <span className="text-[10px] font-bold text-stone-400 absolute top-2 left-2">Day {day}</span>
                  <div className={`mb-1 ${isToday ? isDark ? 'text-white' : 'text-stone-900' : 'text-stone-300'}`}>
                    {reward.icon}
                  </div>
                  <span className={`text-[10px] font-black ${isDark && !isClaimed ? 'text-stone-300' : ''}`}>{reward.amount}</span>
                  
                  {isClaimed && (
                    <div className={`absolute inset-0 flex items-center justify-center rounded-2xl ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-500/10'}`}>
                      <Check className="w-6 h-6 text-emerald-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className={`p-8 border-t flex flex-col gap-3 ${isDark ? 'bg-stone-800/50 border-stone-800' : 'bg-stone-50 border-stone-100'}`}>
          {canClaim ? (
            <>
              <button 
                onClick={handleClaim}
                disabled={isClaiming}
                className={`w-full py-5 rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-3 ${isDark ? 'bg-stone-100 text-stone-900 shadow-white/5' : 'bg-stone-900 text-white shadow-stone-900/20'}`}
              >
                {isClaiming ? t.login_bonus_claiming : t.login_bonus_claim}
              </button>
              {!isClaiming && (
                <button 
                  onClick={onClose}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${isDark ? 'text-stone-500 hover:text-stone-300' : 'text-stone-400 hover:text-stone-600'}`}
                >
                  {user.language === 'JA' ? 'あとで受け取る' : user.language === 'ZH' ? '稍後領取' : user.language === 'KO' ? '나중에 받기' : 'Claim Later'}
                </button>
              )}
            </>
          ) : (
            <div className="text-center space-y-2">
              <p className="text-stone-400 font-bold text-sm">{t.login_bonus_claimed}</p>
              <p className="text-xs text-stone-300 uppercase tracking-widest">{t.login_bonus_next.replace('{hours}', hoursLeft.toString())}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Claim Effect */}
      <AnimatePresence>
        {isClaiming && claimedReward && !showMilestone && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 20 }}
              animate={{ scale: 1.2, y: -100 }}
              className="bg-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 border-2 border-stone-900"
            >
              <div className="text-amber-500">
                {claimedReward.type === 'COIN' ? <Coins /> : claimedReward.type === 'GEM' ? <Gem /> : <Ticket />}
              </div>
              <span className="text-2xl font-black">+{claimedReward.amount} {user.language === 'JA' ? '獲得！' : user.language === 'ZH' ? '獲得！' : user.language === 'KO' ? '획득!' : 'Gained!'}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestone Celebration */}
      <AnimatePresence>
        {showMilestone && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-center"
            >
              <div className="w-32 h-32 bg-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(245,158,11,0.5)] animate-bounce">
                <Trophy className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-5xl font-black text-white mb-4 italic tracking-tighter">
                {showMilestone} DAYS!
              </h2>
              <p className="text-amber-400 text-xl font-bold mb-12 uppercase tracking-widest">
                {user.language === 'JA' ? '連続ログイン達成！' : user.language === 'ZH' ? '連續登錄達成！' : user.language === 'KO' ? '연속 로그인 달성!' : 'Consecutive Login Milestone!'}
              </p>
              <button 
                onClick={() => {
                  setShowMilestone(null);
                  setIsClaiming(false);
                  onClose();
                }}
                className="px-12 py-4 bg-white text-stone-900 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl"
              >
                {t.lesson_rank_up_confirm}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
