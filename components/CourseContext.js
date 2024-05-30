import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Creating a context for managing courses
export const CourseContext = createContext();

// Provider component for managing courses
export const CourseProvider = ({ children }) => {
  // State to hold the list of courses
  const [myCourses, setMyCourses] = useState([]);

  // Effect hook to load courses from AsyncStorage when component mounts
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const storedCourses = await AsyncStorage.getItem('myCourses');
        if (storedCourses) {
          setMyCourses(JSON.parse(storedCourses));
        }
      } catch (error) {
        console.error('Failed to load courses', error);
      }
    };

    loadCourses();
  }, []);

  // Function to fetch additional courses from AsyncStorage
  const getCourses = async () => {
    try {
      const storedCourses = await AsyncStorage.getItem('addcourses');
      if (storedCourses !== null) {
        return JSON.parse(storedCourses);
      }
      return [];
    } catch (error) {
      console.error('Error fetching courses', error);
      return [];
    }
  };

  // Function to add a new course
  const addCourse = async (course) => {
    const exists = myCourses.some(existingCourse => existingCourse.name === course.name);
    if (!exists) {
      const updatedCourses = [...myCourses, course];
      setMyCourses(updatedCourses);
      try {
        await AsyncStorage.setItem('myCourses', JSON.stringify(updatedCourses));
      } catch (error) {
        console.error('Failed to save course', error);
      }
    } else {
      console.log('Course already exists in the list.');
    }
  };

  // Function to remove a course
  const removeCourse = async (courseName) => {
    const updatedCourses = myCourses.filter(course => course.name !== courseName);
    setMyCourses(updatedCourses);
    try {
      await AsyncStorage.setItem('myCourses', JSON.stringify(updatedCourses));
    } catch (error) {
      console.error('Failed to remove course', error);
    }
  };

  // Providing the state and functions to child components through context
  return (
    <CourseContext.Provider value={{ myCourses, addCourse, removeCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
