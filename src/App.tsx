import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Award,
  ArrowRight,
  Brain,
  BookOpen
} from 'lucide-react';
import { questions } from './data/questions';
import { categories } from './data/categories';
import { StaticCategory, StaticQuestion } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<StaticCategory | 'all' | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const filteredQuestions = selectedCategory === 'all' 
    ? questions 
    : questions.filter(q => q.category === selectedCategory);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleCategorySelect = (category: StaticCategory | 'all') => {
    setSelectedCategory(category);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswered(null);
  };

  const handleAnswer = (index: number) => {
    if (answered !== null) return;
    setAnswered(index);
    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnswered(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswered(null);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-[#F5F5F4] text-[#1C1917] font-sans selection:bg-emerald-100">
        <header className="max-w-4xl mx-auto px-6 pt-12 pb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Brain className="w-3 h-3" />
              <span>Logical Thinking Training</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
              論理的思考<br />
              <span className="text-emerald-600">トレーニング100</span>
            </h1>
            <p className="text-lg text-stone-500 max-w-xl font-medium leading-relaxed">
              主観と事実の区別、因果関係の把握、定義の思考など、論理的思考力を鍛える100問のクイズ。
            </p>
          </motion.div>
        </header>

        <main className="max-w-4xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategorySelect('all')}
              className="col-span-full p-8 rounded-3xl bg-stone-900 text-white flex items-center justify-between group transition-all"
            >
              <div className="text-left">
                <h3 className="text-2xl font-bold">全100問に挑戦</h3>
                <p className="text-stone-400">すべてのカテゴリーからランダムに出題されます</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                <ArrowRight className="w-6 h-6" />
              </div>
            </motion.button>

            {categories.map((cat, idx) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategorySelect(cat.id)}
                className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between h-48"
              >
                <div className="space-y-3">
                  <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center text-white", cat.color)}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{cat.title}</h3>
                    <p className="text-sm text-stone-500 line-clamp-2">{cat.description}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs font-bold text-stone-400 uppercase tracking-widest">
                  Start Training <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </motion.button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / filteredQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-[#F5F5F4] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl text-center space-y-8"
        >
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
              <Award className="w-12 h-12 text-emerald-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight">トレーニング完了！</h2>
            <p className="text-stone-500 font-medium">お疲れ様でした。あなたの論理力スコアです。</p>
          </div>
          
          <div className="py-8 border-y border-stone-100">
            <div className="text-6xl font-black text-emerald-600">{percentage}%</div>
            <div className="text-sm font-bold text-stone-400 uppercase tracking-widest mt-2">
              {score} / {filteredQuestions.length} Correct
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={resetQuiz}
              className="px-6 py-4 rounded-2xl bg-stone-100 text-stone-600 font-bold flex items-center justify-center space-x-2 hover:bg-stone-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>トップへ</span>
            </button>
            <button 
              onClick={() => {
                setCurrentQuestionIndex(0);
                setScore(0);
                setShowResult(false);
                setAnswered(null);
              }}
              className="px-6 py-4 rounded-2xl bg-stone-900 text-white font-bold flex items-center justify-center space-x-2 hover:bg-stone-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>もう一度</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F4] text-[#1C1917] font-sans">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={resetQuiz}
            className="p-2 rounded-full hover:bg-stone-200 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
              {selectedCategory === 'all' ? 'All Categories' : categories.find(c => c.id === selectedCategory)?.title}
            </span>
            <div className="text-sm font-bold">
              Question {currentQuestionIndex + 1} <span className="text-stone-300">/</span> {filteredQuestions.length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-xs font-bold">
            {score}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-stone-200 rounded-full mb-16 overflow-hidden">
          <motion.div 
            className="h-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {currentQuestion.text}
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, idx) => {
                const isCorrect = idx === currentQuestion.correctAnswer;
                const isSelected = answered === idx;
                
                return (
                  <button
                    key={idx}
                    disabled={answered !== null}
                    onClick={() => handleAnswer(idx)}
                    className={cn(
                      "group relative p-6 rounded-2xl text-left transition-all duration-200 border-2",
                      answered === null 
                        ? "bg-white border-stone-100 hover:border-emerald-500 hover:shadow-lg" 
                        : isCorrect 
                          ? "bg-emerald-50 bg-emerald-500/10 border-emerald-500" 
                          : isSelected 
                            ? "bg-rose-50 border-rose-500" 
                            : "bg-white border-stone-100 opacity-50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "text-lg font-bold",
                        answered !== null && isCorrect ? "text-emerald-700" : "text-stone-800"
                      )}>
                        {option}
                      </span>
                      {answered !== null && isCorrect && (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      )}
                      {answered !== null && isSelected && !isCorrect && (
                        <XCircle className="w-6 h-6 text-rose-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {answered !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 rounded-3xl bg-stone-900 text-white space-y-4"
                >
                  <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-emerald-400">
                    <BookOpen className="w-4 h-4" />
                    <span>Explanation</span>
                  </div>
                  <p className="text-lg font-medium leading-relaxed text-stone-200">
                    {currentQuestion.explanation}
                  </p>
                  <button
                    onClick={handleNext}
                    className="w-full mt-4 py-4 rounded-2xl bg-emerald-500 text-white font-bold flex items-center justify-center space-x-2 hover:bg-emerald-400 transition-colors"
                  >
                    <span>{currentQuestionIndex === filteredQuestions.length - 1 ? '結果を見る' : '次の問題へ'}</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
