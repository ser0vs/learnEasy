import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { CourseContext } from './CourseContext';

const courseData = require('./courses.json');
const { width, height } = Dimensions.get('window');

// Component for finding and displaying courses
const FindCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { addCourse } = useContext(CourseContext);
  const navigation = useNavigation();

  useEffect(() => {
    setCourses(courseData.courses);
  }, []);

  // Filter courses based on search query
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Component for displaying each course card
  const CourseCard = ({ title, duration, description, section, course }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('CourseDetails', { course })}>
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
              name="add"
              size={20}
              color="#6513BD"
              onPress={() => addCourse({ name: title, hours: duration, description, level: section })}
            />
          </View>
          <View style={styles.courseFooter}>
            <Text style={[styles.courseLevel, section === 'Beginner Friendly' ? styles.beginner : styles.intermediate]}>
              {section}
            </Text>
            <View style={styles.icons}>
              <Ionicons name="book-outline" size={20} color="gray" />
              <Ionicons name="document-text-outline" size={20} color="gray" />
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
      <TextInput
        style={styles.searchInput}
        placeholder="Search for courses"
        placeholderTextColor="gray"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <ScrollView contentContainerStyle={styles.courseList}>
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            title={course.title}
            duration={course.duration}
            description={course.section}
            section={course.level}
            course={course}
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Ionicons name="home-outline" size={24} color="gray" onPress={() => navigation.navigate('Home')} />
        <Ionicons name="search" size={24} color="#6513BD" onPress={() => navigation.navigate('FindCourses')} />
        <Ionicons name="person-outline" size={24} color="gray" onPress={() => navigation.navigate('MyCourse')} />
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
