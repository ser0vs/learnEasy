import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CourseProvider } from './components/CourseContext';
import FindCourses from './components/find_courses';
import MyCourse from './components/my_courses';
import Home from './components/Home';
import Registration from './components/RegistrationScreaen';
import Login from './components/Login';
import Cours from './components/Cours';
import Recovery from './components/Recovery';
import WelcomeScreen from './components/WelcomeScreen';



const Stack = createStackNavigator();

const App = () => {
  return (
    <CourseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="FindCourses" component={FindCourses} />
          <Stack.Screen name="MyCourse" component={MyCourse} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="Cours" component={Cours} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Recovery" component={Recovery} />
        </Stack.Navigator>
      </NavigationContainer>
    </CourseProvider>
  );
};

export default App;

