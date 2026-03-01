import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Question, Difficulty, QuizResult, CharacterType } from '../types';
import { CHARACTERS, RANKS, DIFFICULTIES } from '../constants';
import { TRANSLATIONS } from '../translations';
import { generateQuestions, analyzeAnswer, getHint } from '../services/geminiService';
import { 
  X, 
  ChevronRight, 
  Lightbulb, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Loader2,
  Brain,
  Trophy
} from 'lucide-react';

interface LogicalLessonProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
  onBack: () => void;
}

export default function LogicalLesson({ user, onUpdateUser, onBack }: LogicalLessonProps) {
  const [step, setStep] = useState<'LOADING' | 'QUIZ' | 'RESULT'>('LOADING');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('NORMAL');
  const [showDifficultySplash, setShowDifficultySplash] = useState(false);
  const isDark = user.theme === 'DARK';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintText, setHintText] = useState('');
  const [isGettingHint, setIsGettingHint] = useState(false);
  const [showInterruptConfirm, setShowInterruptConfirm] = useState(false);
  const [sessionResults, setSessionResults] = useState<QuizResult[]>([]);
  const [rankUpInfo, setRankUpInfo] = useState<{ oldRank: string; newRank: string } | null>(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [addedScore, setAddedScore] = useState<number | null>(null);
  const [showBonusEffect, setShowBonusEffect] = useState(false);

  const t = TRANSLATIONS[user.language || 'JA'];

  useEffect(() => {
    const initLesson = async () => {
      const rankIndex = RANKS.findIndex(r => r.name === user.rank);
      
      // Determine difficulty based on rank
      let selectedDifficulty: Difficulty = 'NORMAL';
      if (rankIndex === 0) selectedDifficulty = Math.random() > 0.3 ? 'NORMAL' : 'EASY';
      else if (rankIndex === 1) selectedDifficulty = 'HARD';
      else if (rankIndex === 2) selectedDifficulty = 'VERY_HARD';
      else if (rankIndex === 3) selectedDifficulty = 'EXPERT';
      else if (rankIndex === 4) selectedDifficulty = 'MASTER';
      else if (rankIndex === 5) selectedDifficulty = 'GRAND_MASTER';
      else if (rankIndex === 6) selectedDifficulty = 'LEGEND';
      else if (rankIndex === 7) selectedDifficulty = 'MYTHIC';

      setCurrentDifficulty(selectedDifficulty);

      const newQuestions = await generateQuestions(selectedDifficulty, user.language);
      
      // Safety check for CHOICE questions missing options
      const validatedQuestions = newQuestions.map(q => {
        if (q.type === 'CHOICE' && (!q.options || q.options.length === 0)) {
          return { ...q, type: 'TEXT' as const };
        }
        return q;
      });

      if (validatedQuestions.length === 0) {
        // If failed to generate, try once more or fallback
        onBack();
        return;
      }

      setQuestions(validatedQuestions);
      setStep('QUIZ');
      setShowDifficultySplash(true);
      setTimeout(() => {
        setShowDifficultySplash(false);
      }, 2000);
    };
    initLesson();
  }, []);

  const handleAnswer = async () => {
    if (!userAnswer.trim()) return;
    setIsAnalyzing(true);
    const result = await analyzeAnswer(questions[currentIndex], userAnswer, user.language);
    setQuizResult(result);
    setSessionResults([...sessionResults, result]);
    setIsAnalyzing(false);

    // Score animation
    setAddedScore(result.score);
    setSessionScore(prev => prev + result.score);

    // Character bonus check
    if (result.score >= 80 && questions[currentIndex].specialty.includes(user.character)) {
      setTimeout(() => {
        setShowBonusEffect(true);
        setSessionScore(prev => prev + 40);
        setTimeout(() => setShowBonusEffect(false), 2000);
      }, 1000);
    }

    setTimeout(() => setAddedScore(null), 2000);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setQuizResult(null);
      setShowHint(false);
      setHintText('');
    } else {
      finishLesson();
    }
  };

  const skipQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setUserAnswer('');
    setQuizResult(null);
    setShowHint(false);
    setHintText('');
    if (currentIndex === questions.length - 1) {
      finishLesson();
    }
  };

  const finishLesson = () => {
    const totalScore = sessionResults.reduce((acc, curr) => acc + curr.score, 0);
    const avgPercentage = Math.round(sessionResults.reduce((acc, curr) => acc + curr.score, 0) / sessionResults.length);
    
    // Character bonus check
    let bonus = 0;
    sessionResults.forEach((res, idx) => {
      if (res.score >= 80 && questions[idx].specialty.includes(user.character)) {
        bonus += 40;
      }
    });

    const finalScore = totalScore + bonus;
    const newTotalScore = user.score + finalScore;
    
    // Rank check
    const newRank = RANKS.find(r => newTotalScore < (RANKS[RANKS.indexOf(r) + 1]?.minScore || Infinity)) || RANKS[RANKS.length - 1];
    
    if (newRank.name !== user.rank) {
      setRankUpInfo({ oldRank: user.rank, newRank: newRank.name });
    }

    onUpdateUser({
      score: newTotalScore,
      rank: newRank.name,
      logicalPercentage: Math.round((user.logicalPercentage + avgPercentage) / 2),
      coins: user.coins + Math.floor(finalScore / 2),
      gems: user.gems + (finalScore >= 250 ? 1 : 0)
    });

    setStep('RESULT');
  };

  const fetchHint = async () => {
    if (hintText) {
      setShowHint(true);
      return;
    }
    setIsGettingHint(true);
    const hint = await getHint(questions[currentIndex], user.character, user.language);
    setHintText(hint);
    setShowHint(true);
    setIsGettingHint(false);
  };

  if (step === 'LOADING') {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 relative overflow-hidden ${isDark ? 'bg-cyber-black text-stone-100' : 'bg-stone-100 text-stone-900'}`}>
        {isDark && (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="scanline" />
          </>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="flex flex-col items-center relative z-10"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mb-8"
            >
              <Brain className={`w-16 h-16 ${isDark ? 'text-neon-cyan drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]' : 'text-emerald-500'}`} />
            </motion.div>
            <h2 className={`text-2xl font-black mb-2 font-tech tracking-tight ${isDark ? 'text-white' : ''}`}>{t.lesson_loading_title}</h2>
            <p className="text-stone-500 text-center max-w-xs font-medium">{t.lesson_loading_desc}</p>
          </motion.div>
        </AnimatePresence>
        
        <button 
          onClick={() => setShowInterruptConfirm(true)}
          className={`mt-12 px-6 py-2 border rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative z-10 ${isDark ? 'border-white/10 hover:border-neon-cyan/50 text-stone-500 hover:text-neon-cyan' : 'border-stone-200 hover:bg-stone-100 text-stone-500'}`}
        >
          {t.lesson_interrupt}
        </button>

        <AnimatePresence>
          {showInterruptConfirm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            >
              <div className={`rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl ${isDark ? 'glass-panel border-white/10' : 'bg-white'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-500'}`}>
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h2 className={`text-xl font-black mb-2 font-tech ${isDark ? 'text-white' : 'text-stone-900'}`}>{t.lesson_interrupt_title}</h2>
                <p className="text-stone-500 text-sm mb-8 font-medium">
                  {t.lesson_interrupt_text}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setShowInterruptConfirm(false)}
                    className={`py-4 rounded-xl font-bold transition-colors ${isDark ? 'bg-white/5 text-stone-400 hover:bg-white/10' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                  >
                    {t.lesson_continue}
                  </button>
                  <button 
                    onClick={onBack}
                    className="py-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 shadow-lg shadow-red-500/20"
                  >
                    {t.lesson_quit}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (step === 'QUIZ') {
    const question = questions[currentIndex];
    if (!question) return null;
    
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-500 relative overflow-hidden ${isDark ? 'bg-cyber-black text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
        {isDark && (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="scanline" />
          </>
        )}
        <AnimatePresence>
          {showDifficultySplash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.5em] mb-4 font-mono">Target Difficulty</div>
                <motion.div
                  initial={{ letterSpacing: "0.5em" }}
                  animate={{ letterSpacing: "0.1em" }}
                  className={`text-6xl md:text-8xl font-black italic uppercase tracking-tighter font-tech drop-shadow-[0_0_30px_currentColor] ${
                    currentDifficulty === 'EASY' ? 'text-neon-emerald' :
                    currentDifficulty === 'NORMAL' ? 'text-neon-cyan' :
                    currentDifficulty === 'HARD' ? 'text-amber-400' :
                    currentDifficulty === 'VERY_HARD' ? 'text-orange-500' :
                    'text-red-500'
                  }`}
                >
                  {currentDifficulty}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className={`sticky top-0 z-30 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between transition-colors ${isDark ? 'bg-cyber-black/80 border-white/10' : 'bg-white border-stone-200'}`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowInterruptConfirm(true)} className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-stone-400' : 'hover:bg-stone-100'}`}>
              <X className="w-6 h-6" />
            </button>
            <div className={`h-1.5 w-32 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-stone-100'}`}>
              <motion.div 
                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                className={`h-full transition-all duration-500 ${isDark ? 'bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)]' : 'bg-stone-900'}`}
              />
            </div>
            <span className="text-[10px] font-bold text-stone-500 font-mono">{currentIndex + 1} / {questions.length}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative flex flex-col items-end">
              <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest font-mono">
                {user.language === 'JA' ? '獲得スコア' : 'Lesson Score'}
              </div>
              <div className={`text-xl font-black font-mono tracking-tighter ${isDark ? 'text-white' : 'text-stone-900'}`}>
                {sessionScore.toLocaleString()}
              </div>
              
              <AnimatePresence>
                {addedScore !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 top-0 text-neon-emerald font-black text-lg drop-shadow-[0_0_10px_rgba(0,255,159,0.5)]"
                  >
                    +{addedScore}
                  </motion.div>
                )}
                {showBonusEffect && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.5 }}
                    animate={{ opacity: 1, y: -40, scale: 1.2 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 top-0 flex flex-col items-end"
                  >
                    <span className="text-[10px] font-bold text-amber-500 uppercase font-mono">Bonus!</span>
                    <span className="text-amber-500 font-black text-xl drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">+40</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border font-mono ${isDark ? 'bg-white/5 border-white/10 text-stone-400' : 'bg-stone-100 border-stone-200 text-stone-500'}`}>
                {question.difficulty}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border font-mono ${isDark ? 'bg-neon-emerald/10 border-neon-emerald/30 text-neon-emerald' : 'bg-emerald-100 border-emerald-200 text-emerald-600'}`}>
                {question.category}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center relative z-10">
          <div className="max-w-2xl w-full space-y-8 py-8">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-8 rounded-[2.5rem] shadow-xl border transition-all ${isDark ? 'glass-panel border-white/10 cyber-glow' : 'bg-white border-stone-100 shadow-stone-200/50'}`}
            >
              <h3 className={`text-xl md:text-2xl font-bold leading-relaxed mb-8 font-tech tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
                <span className="text-neon-cyan mr-2 font-mono opacity-50">#</span>
                {question.text}
              </h3>

              {question.type === 'CHOICE' && (
                <div className="grid grid-cols-1 gap-3">
                  {question.options?.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => !quizResult && !isAnalyzing && setUserAnswer(option)}
                      disabled={!!quizResult || isAnalyzing}
                      className={`w-full p-5 rounded-2xl border-2 text-left transition-all font-medium ${
                        userAnswer === option 
                          ? isDark ? 'border-neon-cyan bg-neon-cyan/10 text-white shadow-[0_0_20px_rgba(0,243,255,0.2)]' : 'border-stone-900 bg-stone-900 text-white shadow-lg' 
                          : isDark ? 'border-white/5 bg-white/5 hover:border-white/20 text-stone-400' : 'border-stone-100 hover:border-stone-300 text-stone-600'
                      } ${!!quizResult || isAnalyzing ? 'cursor-default' : 'cursor-pointer hover:scale-[1.02]'}`}
                    >
                      <span className="font-mono mr-4 opacity-30">0{i + 1}</span>
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {question.type === 'TEXT' && (
                <div className="relative">
                  <textarea
                    value={userAnswer}
                    onChange={(e) => !quizResult && !isAnalyzing && setUserAnswer(e.target.value)}
                    disabled={!!quizResult || isAnalyzing}
                    placeholder={user.language === 'JA' ? 'ここに回答を入力...' : user.language === 'ZH' ? '在此輸入回答...' : user.language === 'KO' ? '여기에 답변 입력...' : 'Enter your answer here...'}
                    className={`w-full h-40 p-6 rounded-2xl border-2 outline-none resize-none transition-all font-mono text-sm leading-relaxed ${isDark ? 'bg-cyber-black/50 border-white/10 focus:border-neon-cyan text-white' : 'bg-white border-stone-100 focus:border-stone-900 text-stone-900'} ${!!quizResult || isAnalyzing ? 'opacity-50' : ''}`}
                  />
                  {isDark && !userAnswer && (
                    <div className="absolute top-6 left-6 pointer-events-none text-neon-cyan/20 font-mono text-sm animate-pulse">
                      _
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {quizResult && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-8 rounded-[2.5rem] shadow-xl border transition-all ${quizResult.score >= 80 ? isDark ? 'bg-neon-emerald/5 border-neon-emerald/30 shadow-[0_0_20px_rgba(0,255,159,0.1)]' : 'bg-emerald-50 border border-emerald-100' : isDark ? 'glass-panel border-white/10' : 'bg-stone-100 border border-stone-200'}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  {quizResult.score >= 80 ? <CheckCircle2 className="w-8 h-8 text-neon-emerald" /> : <AlertCircle className="w-8 h-8 text-stone-500" />}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500 font-mono">AI Analysis Score</div>
                    <div className={`text-3xl font-black font-tech ${isDark ? 'text-white' : 'text-stone-900'}`}>{quizResult.score}</div>
                  </div>
                  {questions[currentIndex].specialty.includes(user.character) && quizResult.score >= 80 && (
                    <div className="ml-auto flex flex-col items-end">
                      <span className="text-[10px] font-bold text-amber-500 uppercase font-mono tracking-widest">Character Bonus</span>
                      <span className="text-xl font-black text-amber-500 animate-bounce">+40pt</span>
                    </div>
                  )}
                </div>
                <p className={`leading-relaxed mb-6 font-medium ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>{quizResult.feedback}</p>
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/50 border-stone-200'}`}>
                  <div className="text-[10px] font-bold uppercase mb-3 text-stone-500 tracking-widest font-mono">{user.language === 'JA' ? '正解 / 解説' : user.language === 'ZH' ? '正確答案 / 解說' : user.language === 'KO' ? '정답 / 해설' : 'Correct Answer / Explanation'}</div>
                  <div className={`font-bold mb-3 font-tech text-lg ${isDark ? 'text-neon-cyan' : 'text-stone-900'}`}>{Array.isArray(question.answer) ? question.answer.join(' → ') : question.answer}</div>
                  <div className={`text-sm leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{question.explanation}</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 z-30 backdrop-blur-md border-t p-6 flex items-center justify-between transition-colors ${isDark ? 'bg-cyber-black/80 border-white/10' : 'bg-white border-stone-200'}`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchHint}
              disabled={isGettingHint || !!quizResult}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all disabled:opacity-30 border ${isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20' : 'bg-amber-50 border-amber-100 text-amber-600 hover:bg-amber-100'}`}
            >
              {isGettingHint ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
              {t.lesson_hint}
            </button>
            <button 
              onClick={skipQuestion}
              disabled={!!quizResult}
              className={`font-bold text-xs transition-colors disabled:opacity-30 uppercase tracking-widest ${isDark ? 'text-stone-500 hover:text-white' : 'text-stone-400 hover:text-stone-900'}`}
            >
              {t.lesson_skip}
            </button>
          </div>

          {!quizResult ? (
            <button
              onClick={handleAnswer}
              disabled={!userAnswer || isAnalyzing}
              className={`px-10 py-4 rounded-2xl font-bold shadow-xl transition-all disabled:opacity-30 font-tech tracking-tight ${isDark ? 'bg-neon-cyan text-cyber-black shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:scale-105 active:scale-95' : 'bg-stone-900 text-white shadow-stone-900/20 hover:scale-105 active:scale-95'}`}
            >
              {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : t.lesson_submit}
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className={`px-10 py-4 rounded-2xl font-bold shadow-xl transition-all flex items-center gap-2 font-tech tracking-tight ${isDark ? 'bg-white text-cyber-black shadow-white/10 hover:scale-105 active:scale-95' : 'bg-stone-900 text-white shadow-stone-900/20 hover:scale-105 active:scale-95'}`}
            >
              {currentIndex === questions.length - 1 ? t.lesson_view_result : t.lesson_next}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showHint && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowHint(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className={`rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative ${isDark ? 'bg-stone-900 border border-stone-800' : 'bg-white'}`}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{CHARACTERS[user.character].icon}</div>
                  <div>
                    <div className="text-xs font-bold text-stone-400 uppercase">{CHARACTERS[user.character].name}{t.lesson_hint_title}</div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>{t.lesson_hint}</div>
                  </div>
                </div>
                <p className={`leading-relaxed italic ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>「{hintText}」</p>
                <button 
                  onClick={() => setShowHint(false)}
                  className={`mt-8 w-full py-4 rounded-xl font-bold transition-colors ${isDark ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-100 text-stone-900 hover:bg-stone-200'}`}
                >
                  {t.lesson_hint_confirm}
                </button>
              </motion.div>
            </motion.div>
          )}

          {showInterruptConfirm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
            >
              <div className={`rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl ${isDark ? 'bg-stone-900 border border-stone-800' : 'bg-white'}`}>
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h2 className={`text-xl font-black mb-2 ${isDark ? 'text-white' : 'text-stone-900'}`}>{t.lesson_interrupt_title}</h2>
                <p className="text-stone-500 text-sm mb-8">
                  {t.lesson_interrupt_text}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setShowInterruptConfirm(false)}
                    className={`py-4 rounded-xl font-bold transition-colors ${isDark ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                  >
                    {t.lesson_continue}
                  </button>
                  <button 
                    onClick={onBack}
                    className="py-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 shadow-lg shadow-red-500/20"
                  >
                    {t.lesson_quit}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (step === 'RESULT') {
    return (
      <div className={`min-h-screen p-6 flex flex-col items-center justify-center transition-colors duration-500 relative overflow-hidden ${isDark ? 'bg-cyber-black text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
        {isDark && (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="scanline" />
          </>
        )}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`max-w-md w-full rounded-[3rem] p-10 shadow-2xl text-center relative overflow-hidden transition-all z-10 ${isDark ? 'glass-panel border-white/10 shadow-black/40' : 'bg-white border-stone-100 shadow-stone-200/50'}`}
        >
          <div className={`absolute top-0 left-0 right-0 h-1.5 ${isDark ? 'bg-neon-emerald shadow-[0_0_10px_rgba(0,255,159,0.5)]' : 'bg-emerald-500'}`} />
          
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${isDark ? 'bg-neon-emerald/10 text-neon-emerald drop-shadow-[0_0_15px_rgba(0,255,159,0.3)]' : 'bg-emerald-100 text-emerald-600'}`}>
            <Trophy className="w-12 h-12" />
          </div>
          
          <h2 className={`text-4xl font-black mb-2 font-tech tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>{t.lesson_complete}</h2>
          <p className="text-stone-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-12 font-mono">{t.lesson_result_title}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-12">
            <div className={`p-6 rounded-3xl transition-all border ${isDark ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'}`}>
              <div className="text-[10px] font-bold text-stone-500 uppercase mb-2 font-mono tracking-widest">{t.lesson_result_score}</div>
              <div className={`text-3xl font-black font-tech ${isDark ? 'text-white' : 'text-stone-900'}`}>+{sessionResults.reduce((acc, curr) => acc + curr.score, 0)}</div>
            </div>
            <div className={`p-6 rounded-3xl transition-all border ${isDark ? 'bg-white/5 border-white/5' : 'bg-stone-50 border-stone-100'}`}>
              <div className="text-[10px] font-bold text-stone-500 uppercase mb-2 font-mono tracking-widest">{t.lesson_result_coins}</div>
              <div className={`text-3xl font-black font-tech ${isDark ? 'text-white' : 'text-stone-900'}`}>+{Math.floor(sessionResults.reduce((acc, curr) => acc + curr.score, 0) / 2)}</div>
            </div>
          </div>

          <button 
            onClick={onBack}
            className={`w-full py-5 rounded-2xl font-bold shadow-xl transition-all hover:scale-105 active:scale-95 font-tech tracking-tight ${isDark ? 'bg-white text-cyber-black shadow-white/10' : 'bg-stone-900 text-white shadow-stone-900/20'}`}
          >
            {user.language === 'JA' ? 'ホームへ戻る' : user.language === 'ZH' ? '返回首頁' : user.language === 'KO' ? '홈으로 돌아가기' : 'Back to Home'}
          </button>
        </motion.div>

        {/* Rank Up Modal */}
        <AnimatePresence>
          {rankUpInfo && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-cyber-black/90 backdrop-blur-2xl"
            >
              <motion.div 
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="text-center text-white"
              >
                <div className="w-32 h-32 bg-neon-emerald rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(0,255,159,0.5)] animate-pulse">
                  <Trophy className="w-16 h-16 text-cyber-black" />
                </div>
                <h2 className="text-5xl font-black mb-4 italic tracking-tighter font-tech">{t.lesson_rank_up}</h2>
                <div className="flex items-center justify-center gap-6 mb-8">
                  <span className="text-xl opacity-50 font-tech">{rankUpInfo.oldRank}</span>
                  <ArrowRight className="w-6 h-6 text-neon-emerald" />
                  <span className="text-3xl font-black text-neon-emerald drop-shadow-[0_0_10px_rgba(0,255,159,0.5)] font-tech">{rankUpInfo.newRank}</span>
                </div>
                <p className="text-stone-400 mb-12 whitespace-pre-line font-medium">{t.lesson_rank_up_desc}</p>
                <button 
                  onClick={() => setRankUpInfo(null)}
                  className="px-12 py-4 bg-white text-cyber-black rounded-2xl font-bold hover:scale-105 transition-all font-tech tracking-tight"
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

  return null;
}
