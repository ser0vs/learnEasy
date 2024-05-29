import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
import { Ionicons } from '@expo/vector-icons';
import { CourseContext } from './CourseContext.js';
import { ProgressContext } from '../ProgressContext';


const Home = ({ navigation }) => {
  const { myCourses } = useContext(CourseContext);
  const { progress, countTrueFields } = useContext(ProgressContext);

  const [username, setUsername] = useState('');
  console.log(username);

  let completedTasks = [];
  let totalTasks = [];
  let taskNames = [];
  let chosenCourses = [];

  try {
          
      const data = require('./courses.json');
    
      const courses = data.courses;

      if (!Array.isArray(courses)) {
          throw new Error('courses.json does not contain an array');
      }

      for (let i = 0; i < (myCourses.length <= 3 ? myCourses.length : 3); i++) {
        const courseName = myCourses[i].name;
        console.log(courseName)
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

  if (completedTasks.length === 0) {
    completedTasks.push(-1);     // there are no tasks chosen
  }

  // let completedTasks = [4, 4, 4];
  // let totalTasks = [10, 10, 10];
  // let taskNames = ["Topology", "Biology", "Technology"]


  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
        <View style={styles.row}>
          <Text style={styles.headerTextBig}>Hey!</Text>
        </View>
        
        <Text style={styles.headerTextSmall}>What would you like to learn today?</Text>
      </View>

      <View style={styles.containerSecond}>
        <Text style={styles.text}>Learning Plan</Text>
      </View>

      
      <View style={styles.containerThird}>
         {completedTasks.map((completed, index) => {
          const percent = (completed / totalTasks[index]) * 100;
          const courseInfo = chosenCourses[index];
          if (completed === -1) {      // if there are no tasks chosen
            return (
              <View style={styles.row} key={index}>
                <Text>   </Text>
                <Text style={styles.noTasksText}>Choose your thirst task!</Text>
              </View>
            );
          } else {
            return (
//              <TouchableOpacity onPress={() => navigation.navigate('CourseDetails', { courseInfo })}>
                <View style={styles.row} key={index}>
                  <PercentageCircle radius={10} percent={percent} color="#000000" borderWidth={3}>
                    <Text style={styles.progressText}></Text>
                  </PercentageCircle>
                  <Text>   </Text>
                  <Text style={styles.tasksText}>{`${taskNames[index]}`.slice(0, 20)}</Text>
                  <Text style={styles.completedTasksText}>
                    {`${completed}`}
                    <Text style={styles.completedTasksTextGrey}>{`/${totalTasks[index]}`}</Text>
                  </Text>
                </View>
//              </TouchableOpacity>
            );
          }
        })}
        
      </View>

      <View style={styles.containerButtons}>
      {/* Purple Background Shape */}
      
      
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Open the Last Topic</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={() => navigation.navigate('MyCourse')}>My Courses</Text>
        {/* <Text style={styles.buttonText} onPress={() => navigation.navigate('CourseList')}>My Courses</Text> */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={() => navigation.navigate('FindCourses')}>Find New Courses</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Ionicons name="home" size={24} color="#6513BD" onPress={() => navigation.navigate('Home')} />
        <Ionicons name="search-outline" size={24} color="gray" onPress={() => navigation.navigate('FindCourses')} />
        <Ionicons name="person-outline" size={24} color="gray"onPress={() => navigation.navigate('MyCourse')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
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
  headerTextSmall: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  buttonsGroup: {
    marginBottom: 15,
  },
  containerSecond: {
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 50,
    paddingBottom: 10,
    alignItems: 'flex-start', // Left align the text
  },
  containerThird: {
    width: 300, 
    height: 110,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Android shadow
  },
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