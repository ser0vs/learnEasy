import React, { createContext, useState } from 'react';

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    articleRead: false,
    videoWatched: false,
    testTaken: false,
  });

  const resetProgress = () => {
    setProgress({
      articleRead: false,
      videoWatched: false,
      testTaken: false,
    });
  };

  const countTrueFields = () => {
    let count = 0;
    for (const key in progress) {
      if (progress[key] === true) {
        count++;
      }
    }
    return count;
  };


  return (
    <ProgressContext.Provider value={{ progress, setProgress, resetProgress, countTrueFields }}>
      {children}
    </ProgressContext.Provider>
  );
};
