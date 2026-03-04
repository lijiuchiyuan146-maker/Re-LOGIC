import { motion } from 'motion/react';
import { TRANSLATIONS } from '../translations';

export default function TitleScreen({ onStart, language = 'JA' }: { onStart: () => void; language?: 'JA' | 'EN' | 'ZH' | 'KO' }) {
  const t = TRANSLATIONS[language];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white cursor-pointer overflow-hidden"
      onClick={onStart}
    >
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-2 italic">
            Re:LOGIC
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-[0.3em] opacity-60 uppercase mb-12">
            {t.title_subtitle}
          </p>
        </motion.div>

        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-sm tracking-widest uppercase opacity-50"
        >
          {t.tap_to_start}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/20 rounded-full animate-pulse [animation-delay:0.5s]" />
      </div>
    </motion.div>
  );
}
