import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Recovery = ({ navigation }) => {
  const [contactInfo, setContactInfo] = useState('');

  const handleRecovery = () => {
    // Implement the recovery logic here (e.g., send the contact info to your server for processing)
    Alert.alert('Recovery Requested', 'We have sent instructions to recover your account.');
  };

  return (
	<View style={styles.container}>
    <Svg height="100%" width="100%" style={styles.svg}>
        <Path
          d="M1,300 Q200,400 300,200 T700,100 T800,300 T1000,100 T0,-20"
          fill="#faf289"
          scale="1"
        />
      </Svg>
	  <View style={styles.containerSecond}>
      {/* Purple Background Shape */}
      
      <Text style={styles.title}>Recover Account</Text>
      <Text style={styles.instructions}>
        If you have forgotten your password or login and want to restore access to your page, enter your phone number or email address to confirm your identity.
      </Text>
	  <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          value={contactInfo}
          onChangeText={setContactInfo}
          placeholder="Phone number or email address"
          autoCapitalize="none"
        />
      </View>
      
      <TouchableOpacity onPress={handleRecovery} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkContainer}>
        <Text style={styles.linkText}>Go back</Text>
      </TouchableOpacity>
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
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000000',
    position: 'relative',
    fontFamily: 'Poppins-Regular',
  },
  instructions: {
    fontSize: 18,
	fontWeight: 'strong',
    textAlign: 'center',
    marginBottom: 20,
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
  },
  button: {
    backgroundColor: '#d8b4fe',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
	color: '#000000',
	padding: 5, 
	zIndex: 2,
  },
  linkContainer: {
    marginTop: 10,
	alignItems: 'center',
  },
  linkText: {
    color: '#3b5998',
    textDecorationLine: 'underline',

  },
});

export default Recovery;