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

  return (
    <ProgressContext.Provider value={{ progress, setProgress, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
