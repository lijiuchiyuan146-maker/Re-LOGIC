import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export default function LoadingScreen({ theme }: { theme?: 'LIGHT' | 'DARK' }) {
  const isDark = theme === 'DARK';
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 flex items-center justify-center transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-stone-100'}`}
    >
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`text-4xl font-black italic mb-4 ${isDark ? 'text-stone-100' : 'text-stone-900'}`}
        >
          Re:LOGIC
        </motion.div>
        <div className={`h-1 w-48 rounded-full overflow-hidden relative ${isDark ? 'bg-stone-800' : 'bg-stone-200'}`}>
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className={`absolute inset-0 ${isDark ? 'bg-stone-100' : 'bg-stone-900'}`}
          />
        </div>
      </div>

      <div className={`absolute bottom-8 right-8 flex items-center gap-2 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-xs font-mono tracking-widest uppercase">Loading...</span>
      </div>
    </motion.div>
  );
}
