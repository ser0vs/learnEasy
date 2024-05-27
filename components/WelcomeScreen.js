import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Svg, { Path } from 'react-native-svg';

const WelcomeScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/home_picture.png')} // Replace './path/to/your/image.png' with the actual path to your image
        style={styles.image}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 310, // Adjust width according to your design
    height: 400, // Adjust height according to your design
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 40, 
    zIndex: 2,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  menuButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
	  padding: 5, 
	  zIndex: 2,
  },
});


export default WelcomeScreen;