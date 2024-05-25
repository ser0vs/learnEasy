import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Home from './components/Home';
import Recovery from './components/Recovery';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import TestPage from './components/TestPage';
import { ProgressProvider } from './ProgressContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ProgressProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Recovery" component={Recovery} options={{ title: 'Account Recovery' }} />
          <Stack.Screen name="CourseList" component={CourseList} options={{ title: 'Courses' }} />
          <Stack.Screen name="CourseDetails" component={CourseDetails} options={{ title: 'Course Details' }} />
          <Stack.Screen name="TestPage" component={TestPage} options={{ title: 'Test Page' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProgressProvider>
  );
};

export default App;
