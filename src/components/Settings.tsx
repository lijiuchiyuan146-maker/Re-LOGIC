import { useState, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { User, CharacterType } from '../types';
import { LANGUAGES, CHARACTERS, RANKS } from '../constants';
import { TRANSLATIONS } from '../translations';
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
    onUpdateUser({ name, character: selectedChar, profileIcon, theme, language });
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileIcon(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDark ? 'bg-black text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
      {/* Header */}
      <div className={`p-6 flex items-center justify-between border-b transition-colors ${isDark ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
        <div className="flex items-center gap-4">
          <button onClick={onBack} className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-stone-800' : 'hover:bg-stone-100'}`}>
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-black">{t.settings}</h2>
        </div>
        <button 
          onClick={handleSave}
          className={`px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all ${isDark ? 'bg-stone-100 text-stone-900' : 'bg-stone-900 text-white'}`}
        >
          {t.save}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Name Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-stone-400">
              <UserIcon className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">{t.player_name}</span>
            </div>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-6 py-4 rounded-2xl border-2 outline-none transition-all font-bold text-lg ${isDark ? 'bg-stone-900 border-stone-800 focus:border-stone-100' : 'bg-white border-stone-100 focus:border-stone-900'}`}
            />
          </section>

          {/* Profile Icon Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-stone-400">
              <Camera className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">
                {user.language === 'JA' ? 'プロフィールアイコン' : user.language === 'ZH' ? '個人資料圖標' : user.language === 'KO' ? '프로필 아이콘' : 'Profile Icon'}
              </span>
            </div>
            <div className={`p-6 rounded-3xl border-2 flex flex-col md:flex-row items-center gap-8 ${isDark ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
              <div className={`w-32 h-32 rounded-full overflow-hidden flex items-center justify-center border-4 ${isDark ? 'bg-stone-800 border-stone-700' : 'bg-stone-50 border-stone-200'}`}>
                {profileIcon === 'NORMAL' ? (
                  <UserIcon className={`w-16 h-16 ${isDark ? 'text-stone-600' : 'text-stone-400'}`} />
                ) : (
                  <img src={profileIcon} alt="Preview" className="w-full h-full object-cover" />
                )}
              </div>
              
              <div className="flex-1 grid grid-cols-1 gap-3 w-full">
                <div className="flex gap-3">
                  <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all ${isDark ? 'bg-stone-800 hover:bg-stone-700 text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-900'}`}>
                    <Upload className="w-4 h-4" />
                    {user.language === 'JA' ? '写真をアップロード' : 'Upload Photo'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all ${isDark ? 'bg-stone-800 hover:bg-stone-700 text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-900'}`}>
                    <Camera className="w-4 h-4" />
                    {user.language === 'JA' ? 'カメラで撮影' : 'Take Photo'}
                    <input type="file" accept="image/*" capture="user" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
                <button 
                  onClick={() => setProfileIcon('NORMAL')}
                  disabled={profileIcon === 'NORMAL'}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-30 ${isDark ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                >
                  <Trash2 className="w-4 h-4" />
                  {user.language === 'JA' ? '初期アイコンに戻す' : 'Reset to Default'}
                </button>
              </div>
            </div>
          </section>

          {/* Language Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-stone-400">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">{t.language_setting} / Language</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(LANGUAGES) as [keyof typeof LANGUAGES, any][]).map(([key, lang]) => (
                <button
                  key={key}
                  onClick={() => setLanguage(key as any)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 ${
                    language === key 
                      ? isDark ? 'border-stone-100 bg-stone-800 shadow-lg' : 'border-stone-900 bg-white shadow-lg' 
                      : isDark ? 'border-stone-800 bg-stone-900 hover:border-stone-700' : 'border-stone-100 bg-white hover:border-stone-300'
                  }`}
                >
                  <span className={`font-bold ${language === key ? isDark ? 'text-white' : 'text-stone-900' : 'text-stone-400'}`}>
                    {lang.native}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Theme Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-stone-400">
              <Sun className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">{t.theme_setting}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme('LIGHT')}
                className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 ${
                  theme === 'LIGHT' 
                    ? 'border-stone-900 bg-white shadow-lg' 
                    : 'border-stone-100 bg-white hover:border-stone-300'
                }`}
              >
                <Sun className={`w-5 h-5 ${theme === 'LIGHT' ? 'text-amber-500' : 'text-stone-300'}`} />
                <span className={`font-bold ${theme === 'LIGHT' ? 'text-stone-900' : 'text-stone-400'}`}>{t.theme_light}</span>
              </button>
              <button
                onClick={() => setTheme('DARK')}
                className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 ${
                  theme === 'DARK' 
                    ? 'border-stone-900 bg-stone-800 shadow-lg' 
                    : 'border-stone-100 bg-stone-800 hover:border-stone-600'
                }`}
              >
                <Moon className={`w-5 h-5 ${theme === 'DARK' ? 'text-blue-400' : 'text-stone-500'}`} />
                <span className={`font-bold ${theme === 'DARK' ? 'text-white' : 'text-stone-500'}`}>{t.theme_dark}</span>
              </button>
            </div>
          </section>

          {/* Character Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-stone-400">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">{t.support_char}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(Object.entries(CHARACTERS) as [CharacterType, any][]).map(([key, char]) => (
                <button
                  key={key}
                  onClick={() => setSelectedChar(key)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left flex items-center gap-4 ${
                    selectedChar === key 
                      ? isDark ? 'border-stone-100 bg-stone-800 shadow-lg' : 'border-stone-900 bg-white shadow-lg' 
                      : isDark ? 'border-stone-800 bg-stone-900 hover:border-stone-700' : 'border-stone-100 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="text-4xl">{char.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold">{char.name}</div>
                    <div className="text-xs text-stone-400">{char.description}</div>
                  </div>
                  {selectedChar === key && <Check className="w-5 h-5 text-emerald-500" />}
                </button>
              ))}
            </div>
          </section>

          {/* Current Rank Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-stone-400">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">{t.current_rank}</span>
            </div>
            <div className={`p-6 rounded-2xl border-2 transition-colors ${isDark ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black italic ${isDark ? 'bg-stone-100 text-stone-900' : 'bg-stone-900 text-white'}`}>
                  {user.rank[0]}
                </div>
                <div>
                  <div className="font-black text-xl">{user.rank}</div>
                  <div className="text-xs text-stone-400">Score: {user.score.toLocaleString()} pt</div>
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
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 z-50 pointer-events-none"
      >
        <Check className="w-5 h-5 text-emerald-400" />
        <span className="font-bold">{t.settings_saved}</span>
      </motion.div>
    </div>
  );
}
