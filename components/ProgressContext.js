import React, { createContext, useState } from 'react';

// Create a context for progress tracking
export const ProgressContext = createContext();

// ProgressProvider component manages the state related to user progress
export const ProgressProvider = ({ children }) => {
  // State for storing the current username
  const [myUsername, setMyUsername] = useState('');

  // State for tracking progress of each course
  const [progress, setProgress] = useState({});

  // Function to update progress for a specific course
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

  // Function to count the number of completed tasks in a course
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

  // Provide the context values to the children components
  return (
    <ProgressContext.Provider value={{ progress, setProgress, updateProgress, countTrueFields, myUsername, setMyUsername }}>
      {children}
    </ProgressContext.Provider>
  );
};
