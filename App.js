import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CourseProvider } from './components/CourseContext';
import FindCourses from './components/find_courses';
import MyCourse from './components/my_courses';
import Home from './components/Home';
import Registration from './components/RegistrationScreen';
import Recovery from './components/Recovery';
import Login from './components/Login';
import Cours from './components/Cours';


import WelcomeScreen from './components/WelcomeScreen';
const Stack = createStackNavigator();
const RootStack = createStackNavigator();



const AuthStack = () => (
  <Stack.Navigator initialRouteName="WelcomeScreen" headerMode="none">
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="Registration" component={Registration} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Recovery" component={Recovery} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator initialRouteName="Home" headerMode="none">
    <Stack.Screen name="FindCourses" component={FindCourses} />
    <Stack.Screen name="MyCourse" component={MyCourse} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Cours" component={Cours} />
    <Stack.Screen name="Registration" component={Registration} />
  </Stack.Navigator>
);

const App = () => (
  <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Recovery" component={Recovery} />
        <Stack.Screen name="FindCourses" component={FindCourses} />
        <Stack.Screen name="MyCourse" component={MyCourse} />
        <Stack.Screen name="Cours" component={Cours} />
      </Stack.Navigator>
    </NavigationContainer>
);

export default App;

