import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export default function LoadingScreen({ theme }: { theme?: 'LIGHT' | 'DARK' }) {
  const isDark = theme === 'DARK';
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 flex items-center justify-center transition-colors duration-500 relative overflow-hidden ${isDark ? 'bg-cyber-black' : 'bg-stone-100'}`}
    >
      {/* Futuristic Background Elements */}
      {isDark && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="scanline" />
        </>
      )}

      <div className="text-center relative z-10">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className={`text-5xl font-black italic mb-6 font-tech tracking-tighter ${isDark ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'text-stone-900'}`}
        >
          Re:LOGIC
        </motion.div>
        <div className={`h-1 w-64 rounded-full overflow-hidden relative ${isDark ? 'bg-white/10' : 'bg-stone-200'}`}>
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute inset-0 ${isDark ? 'bg-neon-cyan shadow-[0_0_10px_#00f3ff]' : 'bg-stone-900'}`}
          />
        </div>
        <div className={`mt-4 text-[10px] font-mono tracking-[0.5em] uppercase ${isDark ? 'text-neon-cyan/60' : 'text-stone-400'}`}>
          Initializing System...
        </div>
      </div>

      <div className={`absolute bottom-10 right-10 flex items-center gap-3 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
        <Loader2 className="w-5 h-5 animate-spin text-neon-cyan" />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Processing Data</span>
      </div>
    </motion.div>
  );
}
