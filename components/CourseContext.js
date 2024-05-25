import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const storedCourses = await AsyncStorage.getItem('myCourses');
        if (storedCourses) {
          setMyCourses(JSON.parse(storedCourses));
        }
      } catch (error) {
        console.log('Failed to load courses', error);
      }
    };

    loadCourses();
  }, []);
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
  const addCourse = async (course) => {
    const exists = myCourses.some(existingCourse => existingCourse.name === course.name);
    if (!exists) {
      const updatedCourses = [...myCourses, course];
      setMyCourses(updatedCourses);
      try {
        await AsyncStorage.setItem('myCourses', JSON.stringify(updatedCourses));
      } catch (error) {
        console.log('Failed to save course', error);
      }
    } else {
      console.log('Course already exists in the list.');
    }
  };

  const removeCourse = async (courseName) => {
    const updatedCourses = myCourses.filter(course => course.name !== courseName);
    setMyCourses(updatedCourses);
    try {
      await AsyncStorage.setItem('myCourses', JSON.stringify(updatedCourses));
    } catch (error) {
      console.log('Failed to remove course', error);
    }
  };

  return (
    <CourseContext.Provider value={{ myCourses, addCourse, removeCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
