import React, { createContext, useState } from 'react';

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({});

  const resetProgress = (courseId) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [courseId]: {
        articleRead: false,
        videoWatched: false,
        testTaken: false,
      },
    }));
  };

  
  const countTrueFields = (courseId) => {
    let count = 0;
    // Loop through the keys of the progress object for the courseId
    for (const key in progress[courseId]) {
      // Check if the value associated with the key is true
      if (progress[courseId][key] === true) {
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