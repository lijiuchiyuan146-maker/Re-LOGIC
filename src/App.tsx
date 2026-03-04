/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, CharacterType } from './types';
import { RANKS } from './constants';
import TitleScreen from './components/TitleScreen';
import LoadingScreen from './components/LoadingScreen';
import Tutorial from './components/Tutorial';
import HomeScreen from './components/HomeScreen';
import LogicalLesson from './components/LogicalLesson';
import Gacha from './components/Gacha';
import Settings from './components/Settings';
import LoginBonus from './components/LoginBonus';
import Store from './components/Store';
import Ranking from './components/Ranking';

type Screen = 'TITLE' | 'LOADING' | 'TUTORIAL' | 'HOME' | 'LESSON' | 'GACHA' | 'SETTINGS' | 'LOGIN_BONUS' | 'STORE' | 'RANKING';

export default function App() {
  const [screen, setScreen] = useState<Screen>('TITLE');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nextScreen, setNextScreen] = useState<Screen | null>(null);
  const [hasShownLoginBonusThisSession, setHasShownLoginBonusThisSession] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('relogic_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('relogic_user', JSON.stringify(user));
    }
  }, [user]);

  const navigateTo = (target: Screen) => {
    setNextScreen(target);
    setScreen('LOADING');
    setTimeout(() => {
      setScreen(target);
    }, 1500);
  };

  useEffect(() => {
    if (screen === 'HOME' && user) {
      const today = new Date().toISOString().split('T')[0];
      const lastLogin = user.lastLoginDate.split('T')[0];

      // Show login bonus every time the app starts (once per session)
      if (!hasShownLoginBonusThisSession) {
        setHasShownLoginBonusThisSession(true);
        setScreen('LOGIN_BONUS');
        
        // Update login stats if it's a new day
        if (today !== lastLogin) {
          const lastDate = new Date(user.lastLoginDate);
          const diffTime = Math.abs(new Date().getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          let newLoginDays = user.loginDays;
          if (diffDays === 1) {
            newLoginDays += 1;
          } else if (diffDays > 1) {
            newLoginDays = 1;
          }
          
          updateUser({ 
            loginDays: newLoginDays, 
            lastLoginDate: new Date().toISOString() 
          });
        }
        return;
      }

      // Fallback for new day if session was already active
      if (today !== lastLogin) {
        if (user.loginBonusClaimedDate !== today) {
          setScreen('LOGIN_BONUS');
        }
      }
    }
  }, [screen, user, hasShownLoginBonusThisSession]);

  const handleTutorialComplete = (name: string, character: CharacterType, language: 'JA' | 'EN' | 'ZH' | 'KO') => {
    const newUser: User = {
      name,
      character,
      profileIcon: 'NORMAL',
      score: 0,
      coins: 1500,
      gems: 10,
      tickets: 0,
      rank: RANKS[0].name,
      level: 1,
      loginDays: 1,
      lastLoginDate: new Date().toISOString(),
      loginBonusClaimedDate: '',
      logicalPercentage: 0,
      isTutorialComplete: true,
      traits: [],
      theme: 'LIGHT',
      language
    };
    setUser(newUser);
    setScreen('LOGIN_BONUS');
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-emerald-200 transition-colors duration-500 ${user?.theme === 'DARK' ? 'bg-black text-stone-100' : 'bg-stone-100 text-stone-900'}`}>
      <AnimatePresence mode="wait">
        {screen === 'TITLE' && (
          <motion.div key="title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TitleScreen onStart={() => {
              if (!user || !user.isTutorialComplete) {
                navigateTo('TUTORIAL');
              } else {
                navigateTo('HOME');
              }
            }} language={user?.language} />
          </motion.div>
        )}
        {screen === 'LOADING' && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoadingScreen theme={user?.theme} />
          </motion.div>
        )}
        {screen === 'TUTORIAL' && (
          <motion.div key="tutorial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Tutorial onComplete={handleTutorialComplete} />
          </motion.div>
        )}
        {screen === 'HOME' && user && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomeScreen 
              user={user} 
              onNavigate={setScreen} 
              onUpdateUser={updateUser}
            />
          </motion.div>
        )}
        {screen === 'LESSON' && user && (
          <motion.div key="lesson" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LogicalLesson 
              user={user} 
              onUpdateUser={updateUser} 
              onBack={() => setScreen('HOME')} 
            />
          </motion.div>
        )}
        {screen === 'GACHA' && user && (
          <motion.div key="gacha" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Gacha 
              user={user} 
              onUpdateUser={updateUser} 
              onBack={() => setScreen('HOME')} 
            />
          </motion.div>
        )}
        {screen === 'SETTINGS' && user && (
          <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Settings 
              user={user} 
              onUpdateUser={updateUser} 
              onBack={() => setScreen('HOME')} 
            />
          </motion.div>
        )}
        {screen === 'LOGIN_BONUS' && user && (
          <motion.div key="login_bonus" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoginBonus 
              user={user} 
              onUpdateUser={updateUser} 
              onClose={() => setScreen('HOME')} 
            />
          </motion.div>
        )}
        {screen === 'STORE' && user && (
          <motion.div key="store" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Store 
              user={user} 
              onBack={() => setScreen('HOME')} 
            />
          </motion.div>
        )}
        {screen === 'RANKING' && user && (
          <motion.div key="ranking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Ranking 
              user={user} 
              onBack={() => setScreen('HOME')} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
