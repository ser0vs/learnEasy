import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const { width, height } = Dimensions.get('window');

// Path to the users.json file in the app's document directory
const usersFilePath = FileSystem.documentDirectory + 'users.json';

const Registration = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Initialize the users file when the component mounts
  useEffect(() => {
    initializeUsersFile();
  }, []);

  // Function to initialize the users file
  const initializeUsersFile = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(usersFilePath);
      if (!fileInfo.exists) {
        // If the file doesn't exist, download it from the assets and copy it to the document directory
        const asset = Asset.fromModule(require('./users.json'));
        await asset.downloadAsync();
        await FileSystem.copyAsync({
          from: asset.localUri,
          to: usersFilePath,
        });
      }
    } catch (error) {
      console.log('Error initializing users file:', error);
    }
  };

  // Handle the sign-up process
  const handleSignUp = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      // Read the contents of the users file
      const fileContents = await FileSystem.readAsStringAsync(usersFilePath);
      const usersData = JSON.parse(fileContents);

      // Check if the email already exists
      const emailExists = usersData.some(user => user.email === email);
      if (emailExists) {
        Alert.alert('Error', 'Email already exists');
        navigation.navigate('Login'); // Navigate to the Login screen
        return;
      }

      // Add the new user to the users data
      const newUser = {
        username,
        email,
        password,
      };
      usersData.push(newUser);

      // Save the updated users data back to the file
      await FileSystem.writeAsStringAsync(usersFilePath, JSON.stringify(usersData));
      
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('Home'); // Navigate to the Home screen
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  return (
    <View style={styles.container}>
      {/* Background SVG for styling */}
      <Svg height="50%" width="130%" style={styles.svg}>
        <Path
          d="M0,300 Q400,250 300,100 T900,100 T800,300 T1000,100 T0,-20"
          fill="#faf289"
          scale="1"
        />
      </Svg>
      <View style={styles.containerSecond}>
        <Text style={styles.title}>Create account</Text>
        <TextInput
          style={styles.input}
          placeholder="Your username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.loginOptionText}>
            Already have an account? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Log in</Text>
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
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Poppins-Regular',
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
  },
  signUpButton: {
    backgroundColor: '#d8b4fe',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  signUpButtonText: {
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
  loginOptionText: {
    fontSize: 14,
    marginBottom: 50,
  },
  loginLink: {
    color: '#3b5998',
    textDecorationLine: 'underline',
  },
});

export default Registration;
