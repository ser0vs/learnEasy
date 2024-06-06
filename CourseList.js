import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import coursesData from './components/courses.json';  // Adjust the path if necessary

const CourseList = () => {
  const navigation = useNavigation();
  const courses = coursesData.courses;  // Access courses from the imported JSON

  if (!Array.isArray(courses)) {
    console.error("Expected an array of courses");
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {courses.map((course) => (
        <TouchableOpacity
          key={course.id}
          style={styles.courseContainer}
          onPress={() => navigation.navigate('CourseDetails', { course })}
        >
          
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseSection}>{course.section}</Text>
            <Text style={styles.courseDuration}>{course.duration}</Text>
          </View>
          <Image source={{ uri: course.image }} style={styles.courseImage} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  courseContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 200,
  },
  courseInfo: {
    padding: 10,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  courseSection: {
    fontSize: 16,
    color: '#666',
  },
  courseDuration: {
    fontSize: 14,
    color: '#999',
  },
});

export default CourseList;
