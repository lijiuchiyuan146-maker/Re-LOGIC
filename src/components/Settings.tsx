import { useState, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { User, CharacterType } from '../types';
import { LANGUAGES, CHARACTERS, RANKS } from '../constants';
import { TRANSLATIONS } from '../translations';
import { audioManager } from '../utils/audio';
import { 
  X, 
  User as UserIcon, 
  Shield, 
  Check,
  ChevronRight,
  Moon,
  Sun,
  Globe,
  Camera,
  Upload,
  Trash2
} from 'lucide-react';

interface SettingsProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
  onBack: () => void;
}

export default function Settings({ user, onUpdateUser, onBack }: SettingsProps) {
  const [name, setName] = useState(user.name);
  const [selectedChar, setSelectedChar] = useState<CharacterType>(user.character);
  const [profileIcon, setProfileIcon] = useState(user.profileIcon);
  const [theme, setTheme] = useState<'LIGHT' | 'DARK'>(user.theme || 'LIGHT');
  const [language, setLanguage] = useState<'JA' | 'EN' | 'ZH' | 'KO'>(user.language || 'JA');
  const [showSaved, setShowSaved] = useState(false);

  const isDark = user.theme === 'DARK';
  const t = TRANSLATIONS[language];

  const handleSave = () => {
    audioManager.playSFX('BUTTON_TAP');
    onUpdateUser({ name, character: selectedChar, profileIcon, theme, language });
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handleBack = () => {
    audioManager.playSFX('BUTTON_TAP');
    onBack();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    audioManager.playSFX('BUTTON_TAP');
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileIcon(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetLanguage = (key: 'JA' | 'EN' | 'ZH' | 'KO') => {
    audioManager.playSFX('BUTTON_TAP');
    setLanguage(key);
  };

  const handleSetTheme = (newTheme: 'LIGHT' | 'DARK') => {
    audioManager.playSFX('BUTTON_TAP');
    setTheme(newTheme);
  };

  const handleSetChar = (key: CharacterType) => {
    audioManager.playSFX('BUTTON_TAP');
    setSelectedChar(key);
  };

  const handleResetIcon = () => {
    audioManager.playSFX('BUTTON_TAP');
    setProfileIcon('NORMAL');
  };

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
      <div className={`sticky top-0 z-30 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between transition-colors ${isDark ? 'bg-cyber-black/80 border-white/10' : 'bg-white/80 border-stone-100'}`}>
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-stone-400' : 'hover:bg-stone-100'}`}>
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-black font-tech tracking-tight italic">{t.settings}</h2>
        </div>
        <button 
          onClick={handleSave}
          className={`px-8 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all font-tech tracking-tight ${isDark ? 'bg-white text-cyber-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-stone-900 text-white'}`}
        >
          {t.save}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 relative z-10">
        <div className="max-w-2xl mx-auto space-y-10 pb-20">
          {/* Name Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-stone-500">
              <UserIcon className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono">{t.player_name}</span>
            </div>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-6 py-5 rounded-2xl border outline-none transition-all font-bold text-xl font-tech ${isDark ? 'bg-white/5 border-white/10 focus:border-neon-cyan cyber-glow' : 'bg-white border-stone-100 focus:border-stone-900'}`}
            />
          </section>

          {/* Profile Icon Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-stone-500">
              <Camera className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono">
                {user.language === 'JA' ? 'プロフィールアイコン' : user.language === 'ZH' ? '個人資料圖標' : user.language === 'KO' ? '프로필 아이콘' : 'Profile Icon'}
              </span>
            </div>
            <div className={`p-8 rounded-3xl border flex flex-col md:flex-row items-center gap-10 ${isDark ? 'glass-panel border-white/10' : 'bg-white border-stone-100'}`}>
              <div className={`w-36 h-36 rounded-full overflow-hidden flex items-center justify-center border-4 relative group ${isDark ? 'bg-white/5 border-white/10' : 'bg-stone-50 border-stone-200'}`}>
                {profileIcon === 'NORMAL' ? (
                  <UserIcon className={`w-16 h-16 ${isDark ? 'text-white/20' : 'text-stone-400'}`} />
                ) : (
                  <img src={profileIcon} alt="Preview" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-1 gap-4 w-full">
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm cursor-pointer transition-all border ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-stone-100 border-stone-200 text-stone-900 hover:bg-stone-200'}`}>
                    <Upload className="w-4 h-4 text-neon-cyan" />
                    {user.language === 'JA' ? 'アップロード' : 'Upload'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm cursor-pointer transition-all border ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-stone-100 border-stone-200 text-stone-900 hover:bg-stone-200'}`}>
                    <Camera className="w-4 h-4 text-neon-violet" />
                    {user.language === 'JA' ? 'カメラ' : 'Camera'}
                    <input type="file" accept="image/*" capture="user" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
                <button 
                  onClick={handleResetIcon}
                  disabled={profileIcon === 'NORMAL'}
                  className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all disabled:opacity-20 border ${isDark ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20' : 'bg-red-50 border-red-100 text-red-600 hover:bg-red-100'}`}
                >
                  <Trash2 className="w-4 h-4" />
                  {user.language === 'JA' ? '初期化' : 'Reset'}
                </button>
              </div>
            </div>
          </section>

          {/* Language Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-stone-500">
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono">{t.language_setting}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(Object.entries(LANGUAGES) as [keyof typeof LANGUAGES, any][]).map(([key, lang]) => (
                <button
                  key={key}
                  onClick={() => handleSetLanguage(key as any)}
                  className={`p-5 rounded-2xl border transition-all flex items-center justify-center gap-3 font-tech ${
                    language === key 
                      ? isDark ? 'border-neon-cyan bg-neon-cyan/10 text-white cyber-glow' : 'border-stone-900 bg-white shadow-lg' 
                      : isDark ? 'border-white/10 bg-white/5 text-stone-400 hover:border-white/20' : 'border-stone-100 bg-white hover:border-stone-300'
                  }`}
                >
                  <span className="font-bold tracking-tight">
                    {lang.native}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Theme Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-stone-500">
              <Sun className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono">{t.theme_setting}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSetTheme('LIGHT')}
                className={`p-6 rounded-2xl border transition-all flex items-center justify-center gap-3 font-tech ${
                  theme === 'LIGHT' 
                    ? 'border-stone-900 bg-white shadow-lg' 
                    : isDark ? 'border-white/10 bg-white/5 text-stone-500' : 'border-stone-100 bg-white hover:border-stone-300'
                }`}
              >
                <Sun className={`w-5 h-5 ${theme === 'LIGHT' ? 'text-amber-500' : 'text-stone-400'}`} />
                <span className="font-bold tracking-tight">{t.theme_light}</span>
              </button>
              <button
                onClick={() => handleSetTheme('DARK')}
                className={`p-6 rounded-2xl border transition-all flex items-center justify-center gap-3 font-tech ${
                  theme === 'DARK' 
                    ? 'border-neon-cyan bg-neon-cyan/10 text-white cyber-glow' 
                    : isDark ? 'border-white/10 bg-white/5 text-stone-500' : 'border-stone-100 bg-white hover:border-stone-300'
                }`}
              >
                <Moon className={`w-5 h-5 ${theme === 'DARK' ? 'text-neon-cyan' : 'text-stone-400'}`} />
                <span className="font-bold tracking-tight">{t.theme_dark}</span>
              </button>
            </div>
          </section>

          {/* Character Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-stone-500">
              <Shield className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono">{t.support_char}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.entries(CHARACTERS) as [CharacterType, any][]).map(([key, char]) => (
                <button
                  key={key}
                  onClick={() => handleSetChar(key)}
                  className={`p-6 rounded-2xl border transition-all text-left flex items-center gap-5 ${
                    selectedChar === key 
                      ? isDark ? 'border-neon-cyan bg-neon-cyan/10 cyber-glow' : 'border-stone-900 bg-white shadow-lg' 
                      : isDark ? 'border-white/10 bg-white/5 hover:border-white/20' : 'border-stone-100 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="text-4xl drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{char.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold font-tech tracking-tight text-white">{char.name}</div>
                    <div className="text-[10px] text-stone-500 font-medium uppercase tracking-wider">{char.description}</div>
                  </div>
                  {selectedChar === key && <Check className="w-5 h-5 text-neon-emerald" />}
                </button>
              ))}
            </div>
          </section>

          {/* Current Rank Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-stone-500">
              <Shield className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono">{t.current_rank}</span>
            </div>
            <div className={`p-8 rounded-2xl border transition-all ${isDark ? 'glass-panel border-white/10' : 'bg-white border-stone-100'}`}>
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black italic text-2xl font-tech ${isDark ? 'bg-white text-cyber-black cyber-glow shadow-white/20' : 'bg-stone-900 text-white'}`}>
                  {user.rank[0]}
                </div>
                <div>
                  <div className="font-black text-2xl font-tech tracking-tight italic text-white">{user.rank}</div>
                  <div className="text-[10px] text-neon-cyan font-mono uppercase tracking-[0.2em] mt-1">Score: {user.score.toLocaleString()} pt</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Save Notification */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: showSaved ? 0 : 100 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-cyber-black px-10 py-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-3 z-50 pointer-events-none font-tech tracking-tight"
      >
        <Check className="w-5 h-5 text-neon-emerald" />
        <span className="font-bold">{t.settings_saved}</span>
      </motion.div>
    </div>
  );
}
