import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { CourseContext } from './CourseContext.js';

// CourseCard component renders a single course card
const CourseCard = ({ name, hours, description, level, onRemoveCourse, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.courseCard}>
      <View style={styles.courseHeader}>
        <Text style={styles.courseName}>{name}</Text>
        <Text style={styles.courseHours}>{hours}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.courseDescription}>{description}</Text>
        {/* Button to remove course */}
        <TouchableOpacity onPress={() => onRemoveCourse(name)}>
          <Ionicons name="remove" size={20} color="#6513BD" />
        </TouchableOpacity>
      </View>
      <View style={styles.courseFooter}>
        {/* Display course level */}
        <Text style={[styles.courseLevel, level === 'Beginner Friendly' ? styles.beginner : styles.intermediate]}>
          {level}
        </Text>
        {/* Display icons for different resources */}
        <View style={styles.icons}>
          <Ionicons name="book-outline" size={20} color="gray" />
          <Ionicons name="document-text-outline" size={20} color="gray" />
          <Ionicons name="videocam-outline" size={20} color="gray" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// MyCourse component displays the list of user's enrolled courses
const MyCourse = ({ navigation }) => {
  const { myCourses, removeCourse } = useContext(CourseContext);

  // Function to handle course press
  const handleCoursePress = async (courseName) => {
    try {
      const data = require('./courses.json'); // Import course data from JSON file
      const courses = data.courses;

      // Check if the courses data is an array
      if (!Array.isArray(courses)) {
        throw new Error('courses.json does not contain an array');
      }

      // Find the selected course and navigate to its details screen
      const course = courses.find(course => course.title === courseName);
      if (course) {
        navigation.navigate('CourseDetails', { course });
      } else {
        console.error('Not found');
      }
    } catch (error) {
      console.error('Can not read courses.json:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background SVG */}
      <Svg height="50%" width="130%" style={styles.svg}>
        <Path
          d="M100,300 Q100,250 300,100 T300,100 T800,300 T1000,100 T0,90"
          fill="#d8b4fe"
          scale="1"
        />
      </Svg>
      <ScrollView contentContainerStyle={styles.courseList}>
        {/* Render course cards */}
        {myCourses.map((course, index) => (
          <CourseCard
            key={index}
            name={course.name}
            hours={course.hours}
            description={course.description}
            level={course.level}
            onRemoveCourse={removeCourse}
            onPress={() => handleCoursePress(course.name)}
          />
        ))}
      </ScrollView>
      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Ionicons name="home-outline" size={24} color="gray" onPress={() => navigation.navigate('Home')} />
        <Ionicons name="search-outline" size={24} color="gray" onPress={() => navigation.navigate('FindCourses')} />
        <Ionicons name="person" size={24} color="#6513BD" onPress={() => navigation.navigate('MyCourse')} />
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
    top: 150,
    left: '50',
    zIndex: -1,
  },
  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  forwardIcon: {
    position: 'absolute',
    right: 16,
  },
  backIcon: {
    position: 'absolute',
    left: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  // Course list styles
  courseList: {
    padding: 16,
  },
  courseCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 16,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  courseHours: {
    fontSize: 16,
    color: '#666',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseLevel: {
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  beginner: {
    backgroundColor: '#d8f8d8',
    color: '#3b7d3b',
  },
  intermediate: {
    backgroundColor: '#f8e8d8',
    color: '#7d4f3b',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  // Footer styles
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default MyCourse;
