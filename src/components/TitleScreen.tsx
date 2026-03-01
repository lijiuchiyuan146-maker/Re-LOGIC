import { motion } from 'motion/react';
import { TRANSLATIONS } from '../translations';
import { audioManager } from '../utils/audio';

export default function TitleScreen({ onStart, language = 'JA' }: { onStart: () => void; language?: 'JA' | 'EN' | 'ZH' | 'KO' }) {
  const t = TRANSLATIONS[language];

  const handleStart = () => {
    audioManager.playSFX('TITLE_TAP');
    onStart();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-cyber-black text-white cursor-pointer overflow-hidden"
      onClick={handleStart}
    >
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.1),transparent_70%)] pointer-events-none" />
      <div className="scanline" />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-2 italic font-tech text-white drop-shadow-[0_0_30px_rgba(0,243,255,0.5)]">
            Re:LOGIC
          </h1>
          <p className="text-lg md:text-xl font-medium tracking-[0.5em] text-neon-cyan/60 uppercase mb-16 font-tech">
            {t.title_subtitle}
          </p>
        </motion.div>

        <motion.div
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-xs tracking-[0.8em] uppercase text-neon-cyan/40 font-tech"
        >
          {t.tap_to_start}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-neon-cyan/5 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-neon-violet/5 rounded-full animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-neon-cyan/10 rounded-full animate-pulse [animation-delay:0.5s]" />
        
        {/* Corner Accents */}
        <div className="absolute top-12 left-12 w-12 h-12 border-t-2 border-l-2 border-neon-cyan/30" />
        <div className="absolute top-12 right-12 w-12 h-12 border-t-2 border-r-2 border-neon-cyan/30" />
        <div className="absolute bottom-12 left-12 w-12 h-12 border-b-2 border-l-2 border-neon-cyan/30" />
        <div className="absolute bottom-12 right-12 w-12 h-12 border-b-2 border-r-2 border-neon-cyan/30" />
      </div>

      {/* System Status Mock */}
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-neon-cyan/20 space-y-1 hidden md:block text-left">
        <div>SYSTEM: INITIALIZED</div>
        <div>KERNEL: LOGIC_CORE_V2.5</div>
        <div>STATUS: STANDBY</div>
      </div>
    </motion.div>
  );
}
