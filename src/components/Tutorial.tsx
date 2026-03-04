import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CharacterType } from '../types';
import { CHARACTERS } from '../constants';
import { TRANSLATIONS } from '../translations';
import { User as UserIcon, Search, Brain, Scale, Puzzle } from 'lucide-react';

export default function Tutorial({ onComplete }: { onComplete: (name: string, character: CharacterType, language: 'JA' | 'EN' | 'ZH' | 'KO') => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [selectedChar, setSelectedChar] = useState<CharacterType | null>(null);
  const [selectedLang, setSelectedLang] = useState<'JA' | 'EN' | 'ZH' | 'KO'>('JA');

  const t = TRANSLATIONS[selectedLang];

  const steps = [
    {
      title: "Language / 言語",
      content: (
        <div className="space-y-6">
          <p className="text-center text-stone-500">Please select your preferred language.<br />使用する言語を選択してください。</p>
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            {(['JA', 'EN', 'ZH', 'KO'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`p-4 rounded-2xl border-2 transition-all font-bold ${
                  selectedLang === lang 
                    ? 'border-stone-900 bg-stone-900 text-white shadow-lg' 
                    : 'border-stone-200 bg-white hover:border-stone-400 text-stone-600'
                }`}
              >
                {lang === 'JA' ? '日本語' : lang === 'EN' ? 'English' : lang === 'ZH' ? '中文' : '한국어'}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: t.tutorial_welcome_title,
      content: (
        <div className="space-y-4 text-center">
          <p className="text-xl font-medium whitespace-pre-line">{t.tutorial_welcome_text}</p>
          <p className="text-stone-500">{t.tutorial_name_prompt}</p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.tutorial_name_placeholder}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-stone-900 outline-none transition-colors text-center"
            />
            <button 
              onClick={() => {
                const randomId = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
                const anonName = selectedLang === 'JA' ? `ロジカー${randomId}` : `Logicker${randomId}`;
                setName(anonName);
              }}
              className="text-xs text-stone-400 hover:text-stone-600 underline"
            >
              {t.tutorial_name_anon}
            </button>
          </div>
        </div>
      )
    },
    {
      title: t.tutorial_logic_title,
      content: (
        <div className="space-y-6 text-lg leading-relaxed">
          <p className="whitespace-pre-line">{t.tutorial_logic_q}</p>
          <p>{t.tutorial_logic_a}</p>
          <ul className="space-y-2 text-stone-600">
            {t.tutorial_logic_list.map((item, i) => (
              <li key={i}>・{item}</li>
            ))}
          </ul>
          <p>{t.tutorial_logic_power}</p>
        </div>
      )
    },
    {
      title: t.tutorial_quality_title,
      content: (
        <div className="space-y-6 text-lg">
          <p className="whitespace-pre-line">{t.tutorial_quality_text}</p>
          <div className="grid grid-cols-1 gap-3">
            {t.tutorial_quality_list.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-stone-100">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">✓</div>
                {item}
              </div>
            ))}
          </div>
          <p className="whitespace-pre-line">{t.tutorial_quality_footer}</p>
        </div>
      )
    },
    {
      title: t.tutorial_partner_title,
      content: (
        <div className="space-y-4">
          <p className="text-center mb-6 whitespace-pre-line">{t.tutorial_partner_text}</p>
          <div className="grid grid-cols-2 gap-4">
            {(Object.entries(CHARACTERS) as [CharacterType, any][]).map(([key, char]) => (
              <button
                key={key}
                onClick={() => setSelectedChar(key)}
                className={`p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedChar === key 
                    ? 'border-stone-900 bg-stone-900 text-white shadow-lg scale-[1.02]' 
                    : 'border-stone-200 bg-white hover:border-stone-400'
                }`}
              >
                <div className="text-3xl mb-2">{char.icon}</div>
                <div className="font-bold text-lg">{char.name}</div>
                <div className="text-xs opacity-70 mt-1">{char.description}</div>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: selectedLang === 'JA' ? "準備はいい？" : "Are you ready?",
      content: (
        <div className="space-y-6 text-center py-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-black leading-tight whitespace-pre-line"
          >
            {selectedLang === 'JA' ? (
              <>
                よし！さあ、準備はいい？<br />
                ここから君の<br />
                論理トレーニングが始まる。<br />
                <span className="text-emerald-600">Re:LOGIC</span>へようこそ。<br />
                考えることを、楽しもう！
              </>
            ) : (
              <>
                Alright! Are you ready?<br />
                Your logical training<br />
                starts here.<br />
                Welcome to <span className="text-emerald-600">Re:LOGIC</span>.<br />
                Enjoy the thinking process!
              </>
            )}
          </motion.div>
        </div>
      )
    }
  ];

  const next = () => {
    if (step === 1 && !name.trim()) return;
    if (step === 4 && !selectedChar) return;
    if (step === steps.length - 1) {
      if (selectedChar) onComplete(name, selectedChar, selectedLang);
      return;
    }
    setStep(step + 1);
  };

  return (
    <div className="fixed inset-0 bg-stone-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl shadow-stone-200/50 p-8 md:p-12 relative overflow-hidden"
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-stone-100">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            className="h-full bg-stone-900"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="min-h-[400px] flex flex-col justify-center"
          >
            <div className="text-xs font-mono tracking-widest uppercase text-stone-400 mb-2">
              Step {step + 1} / {steps.length}
            </div>
            <h2 className="text-3xl font-black mb-8">{steps[step].title}</h2>
            {steps[step].content}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-between items-center">
          <button 
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className={`text-stone-400 font-bold uppercase tracking-widest text-sm ${step === 0 ? 'opacity-0' : 'hover:text-stone-900'}`}
          >
            {t.back}
          </button>
          <button 
            onClick={next}
            disabled={(step === 1 && !name.trim()) || (step === 4 && !selectedChar)}
            className="px-10 py-4 bg-stone-900 text-white rounded-2xl font-bold shadow-xl shadow-stone-900/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100"
          >
            {step === steps.length - 1 ? t.tutorial_start : t.next}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
