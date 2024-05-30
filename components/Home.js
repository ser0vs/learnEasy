import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
import { Ionicons } from '@expo/vector-icons';
import { CourseContext } from './CourseContext.js';
import { ProgressContext } from './ProgressContext.js';

const Home = ({ navigation }) => {
  // Contexts used in the component
  const { myCourses } = useContext(CourseContext); // Course context
  const { progress, countTrueFields, myUsername } = useContext(ProgressContext); // Progress context

  // State for username input
  const [username, setUsername] = useState('');

  // Arrays to hold task completion information
  let completedTasks = [];
  let totalTasks = [];
  let taskNames = [];
  let chosenCourses = [];

  try {
    const data = require('./courses.json'); // Import course data from JSON file
    const courses = data.courses;

    // Check if the courses data is an array
    if (!Array.isArray(courses)) {
      throw new Error('courses.json does not contain an array');
    }

    // Iterate through user's courses and calculate completion
    for (let i = 0; i < (myCourses.length <= 3 ? myCourses.length : 3); i++) {
      const courseName = myCourses[i].name;
      const course = courses.find(course => course.title === courseName);

      if (course) {
        const cnt = countTrueFields(course.id);
        completedTasks.push(cnt);
        totalTasks.push(3);
        taskNames.push(course.title);
        // chosenCourses.push(course);
      } else {
        console.error('Not found');
      }
    }
  } catch (error) {
    console.error('Can not read courses.json:', error);
  }

  // If no tasks are chosen, indicate it with a flag
  if (completedTasks.length === 0) {
    completedTasks.push(-1); // Indicate that no tasks are chosen
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.row}>
          <Text style={styles.headerTextBig}>
            Hey,
            <Text style={styles.headerTextBigPink}>{` ${myUsername}!🙂`}</Text>
          </Text>
        </View>
        <Text style={styles.headerTextSmall}>What would you like to learn today?</Text>
      </View>

      {/* Learning Plan Section */}
      <View style={styles.containerSecond}>
        <Text style={styles.text}>Learning Plan</Text>
      </View>

      {/* Task Completion Section */}
      <View style={styles.containerThird}>
        {completedTasks.map((completed, index) => {
          const percent = (completed / totalTasks[index]) * 100;
          const courseInfo = chosenCourses[index];
          if (completed === -1) {
            // Render message if no tasks are chosen
            return (
              <View style={styles.row} key={index}>
                <Text>   </Text>
                <Text style={styles.noTasksText}>Choose your first task!</Text>
              </View>
            );
          } else {
            return (
              <View style={styles.row} key={index}>
                {/* Render progress circle */}
                <PercentageCircle radius={10} percent={percent} color="#000000" borderWidth={3}>
                  <Text style={styles.progressText}></Text>
                </PercentageCircle>
                <Text>   </Text>
                <Text style={styles.tasksText}>{`${taskNames[index]}`.slice(0, 20)}</Text>
                {/* Display completed tasks */}
                <Text style={styles.completedTasksText}>
                  {`${completed}`}
                  <Text style={styles.completedTasksTextGrey}>{`/${totalTasks[index]}`}</Text>
                </Text>
              </View>
            );
          }
        })}
      </View>

      {/* Navigation Buttons Section */}
      <View style={styles.containerButtons}>
        {/* My Courses Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyCourse')}>
          <Text style={styles.buttonText}>My Courses</Text>
        </TouchableOpacity>
        {/* Find New Courses Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FindCourses')}>
          <Text style={styles.buttonText}>Find New Courses</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        {/* Home Button */}
        <Ionicons name="home" size={24} color="#6513BD" onPress={() => navigation.navigate('Home')} />
        {/* Search Button */}
        <Ionicons name="search-outline" size={24} color="gray" onPress={() => navigation.navigate('FindCourses')} />
        {/* Profile Button */}
        <Ionicons name="person-outline" size={24} color="gray" onPress={() => navigation.navigate('MyCourse')} />
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  // Header styles
  headerContainer: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'flex-start',
  },
  headerTextBig: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  headerTextBigPink: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'left',
    color: "#918ffd",
  },
  headerTextSmall: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  buttonsGroup: {
    marginBottom: 15,
  },
  // Learning Plan styles
  containerSecond: {
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 50,
    paddingBottom: 10,
    alignItems: 'flex-start',
  },
  // Task Completion styles
  containerThird: {
    width: 300,
    height: 110,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Navigation Buttons styles
  containerButtons: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    marginBottom: 80,
  },
  button: {
    backgroundColor: '#faf289',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    padding: 5,
    zIndex: 2,
  },
  // Other styles
  row: {
    flexDirection: 'row',
    alignItems: 'left',
    marginTop: 0, // Add margin between text components
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  tasksText: {
    fontSize: 16,
    height: 20,
    width: 200,
  },
  noTasksText: {
    fontSize: 14,
    height: 20,
    width: 200,
    color: "grey",
  },
  completedTasksText: {
    fontSize: 14,
    height: 20,
    width: 40,
  },
  completedTasksTextGrey: {
    fontSize: 14,
    height: 20,
    width: 40,
    color: 'grey',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
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

export default Home;
