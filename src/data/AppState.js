import React, { createContext, useContext, useState } from 'react';
import { landmarks as initialLandmarks } from './landmarks';

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [userName, setUserName] = useState('Guest');
  const [userTier, setUserTier] = useState('free'); // 'free' | 'premium' | 'vip'
  const [quizAnswers, setQuizAnswers] = useState({ interest: null, pace: null });
  const [landmarks, setLandmarks] = useState(initialLandmarks);
  const [savedIds, setSavedIds] = useState([]);

  function addReview(landmarkId, review) {
    setLandmarks(prev =>
      prev.map(l =>
        l.id === landmarkId
          ? { ...l, reviews: [review, ...l.reviews], reviewCount: l.reviewCount + 1 }
          : l
      )
    );
  }

  function toggleSaved(id) {
    setSavedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  }

  const value = {
    userName, setUserName,
    userTier, setUserTier,
    quizAnswers, setQuizAnswers,
    landmarks, addReview,
    savedIds, toggleSaved,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
