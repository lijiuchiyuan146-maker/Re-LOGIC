import { motion } from 'motion/react';
import { X, ShoppingBag } from 'lucide-react';
import { User } from '../types';
import { TRANSLATIONS } from '../translations';

interface StoreProps {
  user: User;
  onBack: () => void;
}

export default function Store({ user, onBack }: StoreProps) {
  const t = TRANSLATIONS[user.language || 'JA'];
  const isDark = user.theme === 'DARK';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDark ? 'bg-black text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
      <div className="p-6 flex justify-end">
        <button 
          onClick={onBack}
          className={`p-3 rounded-full transition-colors ${isDark ? 'bg-stone-900 text-stone-400 hover:bg-stone-800' : 'bg-white text-stone-600 hover:bg-stone-100 shadow-sm'}`}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <div className={`w-24 h-24 rounded-3xl bg-blue-500 text-white flex items-center justify-center mx-auto shadow-lg mb-8`}>
            <ShoppingBag className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black tracking-tighter italic">{t.coming_soon}</h2>
          <p className="text-stone-500 font-bold">{t.stay_tuned}</p>
        </motion.div>
      </div>
    </div>
  );
}
