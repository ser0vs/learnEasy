import React, { createContext, useState } from 'react';

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [myUsername, setMyUsername] = useState('');

  const [progress, setProgress] = useState({});

  const updateProgress = (courseId, updates) => {
    console.log('updateProgress', courseId, updates);
    setProgress((prevProgress) => ({
      ...prevProgress,
      [courseId]: {
        ...prevProgress[courseId],
        ...updates,
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
    <ProgressContext.Provider value={{ progress, setProgress, updateProgress, countTrueFields, myUsername, setMyUsername }}>
      {children}
    </ProgressContext.Provider>
  );
};