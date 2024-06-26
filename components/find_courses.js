import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { CourseContext } from './CourseContext';


const courseData = require('./courses.json');

const { width, height } = Dimensions.get('window');

const FindCourses = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const { addCourse } = useContext(CourseContext);

  useEffect(() => {
    
    setCourses(courseData.courses);
  }, []);

  const CourseCard = ({ title, duration, description, section }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Cours')}>
        <View style={styles.courseCard}>
          <View style={styles.courseHeader}>
            <Text style={styles.courseName}>{title}</Text>
            <View style={styles.courseHoursContainer}>
              <Text style={styles.courseHours}>{duration}</Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.courseDescription}>{description}</Text>
            <Ionicons
              name="add-outline"
              size={20}
              color="gray"
              onPress={() => addCourse({ name: title, hours: duration, description, level: section })}
            />
          </View>
          <View style={styles.courseFooter}>
            <Text style={[styles.courseLevel, section === 'Beginner Friendly' ? styles.beginner : styles.intermediate]}>
              {section}
            </Text>
            <View style={styles.icons}>
              <Ionicons name="book-outline" size={20} color="gray" />
              <Ionicons name="headset-outline" size={20} color="gray" />
              <Ionicons name="videocam-outline" size={20} color="gray" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Svg height="50%" width="130%" style={styles.svg}>
        <Path
          d="M100,300 Q100,250 300,100 T300,100 T800,300 T1000,100 T0,90"
          fill="#faf289"
          scale="1"
        />
      </Svg>
      <View style={styles.header}>
        <Ionicons name="arrow-back-outline" size={24} color="black" style={styles.backIcon} onPress={() => navigation.navigate('Home')} />
        <Text style={styles.headerText}>Find new courses</Text>
        <Ionicons name="arrow-forward-outline" size={24} color="black" style={styles.forwardIcon} onPress={() => navigation.navigate('MyCourse')} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for courses"
        placeholderTextColor="gray"
      />
      <ScrollView contentContainerStyle={styles.courseList}>
        {courses.map(course => (
          <CourseCard
            key={course.id}
            title={course.title}
            duration={course.duration}
            description={course.section}
            section={course.level}
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Ionicons name="settings-outline" size={24} color="gray" />
        <Ionicons name="home-outline" size={24} color="gray" />
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
  searchInput: {
    height: 40,
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f2f2f2',
  },
  courseList: {
    padding: 16,
    paddingBottom: 80, 
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
  courseHoursContainer: {
    alignItems: 'center',
    marginTop: 4,
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
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  plusSymbolDescription: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#666',
    marginLeft: 8,
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
    width: 80,
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

export default FindCourses;
