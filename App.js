import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CourseProvider } from './components/CourseContext';
import { ProgressProvider } from './ProgressContext';
import FindCourses from './components/find_courses';
import MyCourse from './components/my_courses';
import Home from './components/Home';
import Registration from './components/RegistrationScreaen';
import Login from './components/Login';
import Cours from './components/Cours';
import Recovery from './components/Recovery';
import WelcomeScreen from './components/WelcomeScreen';
import CourseList from './CourseList';
import CourseDetails from './CourseDetails';
import TestPage from './TestPage';
import CustomModal from './CustomModal';



const Stack = createStackNavigator();

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
            <Stack.Screen name="Cours" component={Cours} />
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

