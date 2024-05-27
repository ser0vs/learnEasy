import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking, Dimensions, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import Svg, { Path } from 'react-native-svg';
import { ProgressContext } from './ProgressContext';

const { width } = Dimensions.get('window');

const CourseDetails = ({ route, navigation }) => {
  const { course } = route.params;
  const { progress, setProgress } = uset(ProgressContext);

  const openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  const markSectionComplete = (section) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [section]: true,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Svg height="100%" width="100%" style={styles.svg}>
        <Path
          d="M0,300 Q400,250 300,100 T900,100 T800,300 T1000,100 T0,-20"
          fill="#faf289"
          scale="1"
        />
      </Svg>
      <View style={styles.containerSecond}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.section}>{course.section}</Text>
      <Text style={styles.duration}>{course.duration}</Text>
      <Image
        source={{ uri: course.image }}
        style={styles.image}
      />
      <Text style={styles.description}>{course.description}</Text>
      
      {course.events.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventContent}>{event.content}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={progress.articleRead ? styles.completedButton : styles.progressButton}
        onPress={() => markSectionComplete('articleRead')}
      >
        <Text style={styles.progressButtonText}>
          {progress.articleRead ? "Article Read ✔️" : "I read the article"}
        </Text>
      </TouchableOpacity>

      <WebView
        style={styles.video}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: course.video }}
      />
      
      <TouchableOpacity
        style={progress.videoWatched ? styles.completedButton : styles.progressButton}
        onPress={() => markSectionComplete('videoWatched')}
      >
        <Text style={styles.progressButtonText}>
          {progress.videoWatched ? "Video Watched ✔️" : "I watched the video"}
        </Text>
      </TouchableOpacity>

      <View style={styles.linkSection}>
        <Text style={styles.additionalText}>You might find these additional resources interesting:</Text>
        {course.resources.map((resource, index) => (
          <TouchableOpacity key={index} onPress={() => openURL(resource.url)}>
            <Text style={styles.link}>{resource.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => {
          if (progress.articleRead && progress.videoWatched) {
            navigation.navigate('TestPage', { course });
          } else {
            Alert.alert(
              "Complete All Sections",
              "Please complete all sections before taking the quiz.",
              [{ text: "OK" }],
              { cancelable: false }
            );
          }
        }}
        style={[
          styles.testButton,
          !(progress.articleRead && progress.videoWatched) && styles.disabledButton
        ]}
      >
        <Text style={styles.testButtonText}>Go to Test Page 📝</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '50%',
    padding: 0, 
    zIndex: 1,
  },
  container: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  containerSecond: {
    flex: 1,
    justifyContent: 'center',
    padding: 20, 
    zIndex: 2,
  },
  image: {
    width: width * 0.9,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#6513BD',
    fontFamily: 'Poppins-Regular',
  },
  section: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 5,
  },
  duration: {
    fontSize: 16,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  eventContainer: {
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  eventContent: {
    fontSize: 16,
    color: '#000000',
  },
  progressButton: {
    backgroundColor: '#dfe2ec',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  completedButton: {
    backgroundColor: '#a1e5a1',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  progressButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  video: {
    width: width * 0.9,
    height: 200,
    marginBottom: 20,
  },
  testButton: {
    backgroundColor: '#faf289',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  testButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  linkSection: {
    width: '100%',
    padding: 10,
    backgroundColor: '#E6E6FA',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  additionalText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  link: {
    fontSize: 16,
    color: '#6513BD',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default CourseDetails;
