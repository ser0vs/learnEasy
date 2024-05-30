import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CourseProvider } from './components/CourseContext';
import { ProgressProvider } from './components/ProgressContext';
import FindCourses from './components/FindCourses';
import MyCourse from './components/MyCourses';
import Home from './components/Home';
import Registration from './components/RegistrationScreen';
import Login from './components/Login';
import Recovery from './components/Recovery';
import WelcomeScreen from './components/WelcomeScreen';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import TestPage from './components/TestPage';
import CustomModal from './components/CustomModal';



const Stack = createStackNavigator();

// Main manager of the app pages
const App = () => {
  return (
    <ProgressProvider>
      <CourseProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="WelcomeScreen"
            screenOptions={{
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#000',
              },
            }}>
            <Stack.Screen name="FindCourses" component={FindCourses} options={{ title: 'Find new courses', headerLeft: null }} />
            <Stack.Screen name="MyCourse" component={MyCourse} options={{ title: 'My courses', headerLeft: null }}/>
            <Stack.Screen name="Home" component={Home} options={{ headerLeft: null }}/>
            <Stack.Screen name="Login" component={Login} options={{ title: 'Log in' }}/>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen } options={{ headerShown: false }}/>
            <Stack.Screen name="Registration" component={Registration} options={{ title: 'Sign up' }}/>
            <Stack.Screen name="Recovery" component={Recovery} />
            <Stack.Screen name="CourseList" component={CourseList} />
            <Stack.Screen name="CourseDetails" component={CourseDetails} options={{ title: 'Course' }}/>
            <Stack.Screen name="TestPage" component={TestPage} options={{ title: 'Test' }}/>
            <Stack.Screen name="CustomModal" component={CustomModal} />
          </Stack.Navigator>
        </NavigationContainer>
      </CourseProvider>
      </ProgressProvider>
  );
};

export default App;

