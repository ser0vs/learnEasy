import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Sample list of valid usernames and passwords
const validCredentials = [
  { username: 'Anna', password: '1234' },
  { username: 'Sofiia', password: '4321' },
  { username: 'Sergey', password: '1111' },
];

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const isValidUser = validCredentials.some(
      (cred) => cred.username === username && cred.password === password
    );

    if (isValidUser) {
      navigation.navigate('Home');
    } else {
      Alert.alert(
        'Oops  :(',
        'It seems the password or login was entered incorrectly. Do you want to recover your password or login?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Recover', onPress: () => navigation.navigate('Recovery') },
        ],
        { cancelable: false }
      );
    }
  };
  return (
    <View style={styles.container}>
    <Svg height="100%" width="100%" style={styles.svg}>
        <Path
          d="M0,300 Q400,250 300,100 T900,100 T800,300 T1000,100 T0,-20"
          fill="#d8b4fe"
          scale="1"
        />
      </Svg>
 
    <View style={styles.containerSecond}>
      {/* Purple Background Shape */}
      
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.subtitle}>Log in</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Your username"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Recovery')}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.signupOptionText}>
          Don’t have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('Registration')}>Sign up</Text>
        </Text>
      </View>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  containerSecond: {
    flex: 1,
    justifyContent: 'center',
    padding: 20, 
    zIndex: 2,
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: "80",
    height: "80",
    padding: 0, 
    zIndex: 1,
  },
  
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000000',
    position: 'relative',
    fontFamily: 'Poppins-Regular',
  },
  subtitle: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Comfortaa-Light',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'strong',
    marginBottom: 5,
    color: '#000000',
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    color: '#000000',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 15,
    borderColor: '#6513BD',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  forgotPassword: {
    marginBottom: 10,
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#3b5998',
    textAlign: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#faf289',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
	  padding: 5, 
	  zIndex: 2,
  },
  
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 50,
  },
  signupOptionText: {
    fontSize: 14,
    marginBottom: 50,
  },
  signupLink: {
    color: '#3b5998',
    textDecorationLine: 'underline',
    marginBottom: 50,
  },
});

export default Login;