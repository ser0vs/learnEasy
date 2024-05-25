import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';


const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to the Home Page!</Text>

      <View style={styles.containerSecond}>
        {/* Left column with progress circles */}
        <View style={styles.column}>
          <PercentageCircle radius={25} percent={10} color="#ff0000" borderWidth={4}>
            <Text style={styles.progressText}>10%</Text>
          </PercentageCircle>
          <PercentageCircle radius={25} percent={20} color="#ff0000" borderWidth={4}>
            <Text style={styles.progressText}>20%</Text>
          </PercentageCircle>
          <PercentageCircle radius={25} percent={80} color="#ff0000" borderWidth={4}>
            <Text style={styles.progressText}>80%</Text>
          </PercentageCircle>
        </View>

        {/* Central column with course names */}
        <View style={styles.column}>
          <Text>Topology</Text>
          <Text>Biology</Text>
          <Text>Geography</Text>
        </View>

        {/* Right column with progress representation */}
        <View style={styles.column}>
          <Text>1/10</Text>
          <Text>2/10</Text>
          <Text>8/10</Text>
        </View>
      </View>



      <View style={styles.containerThird}>
      {/* Purple Background Shape */}
      
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Open the last topic</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>My courses</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
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
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonsGroup: {
    marginBottom: 15,
  },
  containerSecond: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20, 
    zIndex: 2,
  },
  containerThird: {
    flex: 1,
    justifyContent: 'center',
    padding: 20, 
    zIndex: 2,
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
  leftColumn: {
    alignItems: 'center',
  },
  centralColumn: {
    flex: 1,
    alignItems: 'center',
  },
  rightColumn: {
    alignItems: 'center',
  },
});

export default Home;