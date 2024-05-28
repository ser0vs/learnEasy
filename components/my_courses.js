import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { CourseContext } from './CourseContext.js';
import * as FileSystem from 'expo-file-system';

const CourseCard = ({ name, hours, description, level, onRemoveCourse, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.courseCard}>
      <View style={styles.courseHeader}>
        <Text style={styles.courseName}>{name}</Text>
        <Text style={styles.courseHours}>{hours}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.courseDescription}>{description}</Text>
        <TouchableOpacity onPress={() => onRemoveCourse(name)}>
          <Ionicons name="remove-outline" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.courseFooter}>
        <Text style={[styles.courseLevel, level === 'Beginner Friendly' ? styles.beginner : styles.intermediate]}>
          {level}
        </Text>
        <View style={styles.icons}>
          <Ionicons name="book-outline" size={20} color="gray" />
          <Ionicons name="headset-outline" size={20} color="gray" />
          <Ionicons name="videocam-outline" size={20} color="gray" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MyCourse = ({ navigation }) => {
  const { myCourses, removeCourse } = useContext(CourseContext);

  const handleCoursePress = async (courseName) => {
    try {
        
        const data = require('./courses.json');
       
        const courses = data.courses;

        if (!Array.isArray(courses)) {
            throw new Error('courses.json does not contain an array');
        }

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
      <Svg height="50%" width="130%" style={styles.svg}>
        <Path
          d="M100,300 Q100,250 300,100 T300,100 T800,300 T1000,100 T0,90"
          fill="#d8b4fe"
          scale="1"
        />
      </Svg>
      <View style={styles.header}>
        <Ionicons name="arrow-back-outline" size={24} color="black" style={styles.backIcon} onPress={() => navigation.navigate('FindCourses')} /> 
        <Text style={styles.headerText}>My Course</Text>
        <Ionicons name="arrow-forward-outline" size={24} color="black" style={styles.forwardIcon} />
      </View>
      <ScrollView contentContainerStyle={styles.courseList}>
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
      <View style={styles.footer}>
        <Ionicons name="settings-outline" size={24} color="gray" />
        <Ionicons name="home-outline" size={24} color="gray" onPress={() => navigation.navigate('Home')} />
        <Ionicons name="person-outline" size={24} color="gray" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
};

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
