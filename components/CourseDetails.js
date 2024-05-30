import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking, Dimensions, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import Svg, { Path } from 'react-native-svg';
import { ProgressContext } from './ProgressContext';

const { width } = Dimensions.get('window');

// Component for displaying course details (main screen of the course)
const CourseDetails = ({ route, navigation }) => {
  const { course } = route.params;
  const { progress, setProgress } = useContext(ProgressContext);
  
  const courseProgress = progress[course.id] || { articleRead: false, videoWatched: false };

  const [articleRead, setArticleRead] = useState(courseProgress.articleRead);
  const [videoWatched, setVideoWatched] = useState(courseProgress.videoWatched);

  // Update progress when articleRead or videoWatched changes
  useEffect(() => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [course.id]: { articleRead, videoWatched }
    }));
  }, [articleRead, videoWatched]);

  // Function to open URL in a browser
  const openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  // Function to mark section as complete
  const markSectionComplete = (section) => {
    if (section === 'articleRead') {
      setArticleRead(true);
    } else if (section === 'videoWatched') {
      setVideoWatched(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* SVG background */}
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
        
        {/* Display course events */}
        {course.events.map((event, index) => (
          <View key={index} style={styles.eventContainer}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventContent}>{event.content}</Text>
          </View>
        ))}

        {/* Button to mark article as read */}
        <TouchableOpacity
          style={articleRead ? styles.completedButton : styles.progressButton}
          onPress={() => markSectionComplete('articleRead')}
        >
          <Text style={styles.progressButtonText}>
            {articleRead ? "Article Read ✔️" : "I read the article"}
          </Text>
        </TouchableOpacity>

        {/* Embedded video */}
        <WebView
          style={styles.video}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: course.video }}
        />
        
        {/* Button to mark video as watched */}
        <TouchableOpacity
          style={videoWatched ? styles.completedButton : styles.progressButton}
          onPress={() => markSectionComplete('videoWatched')}
        >
          <Text style={styles.progressButtonText}>
            {videoWatched ? "Video Watched ✔️" : "I watched the video"}
          </Text>
        </TouchableOpacity>

        {/* Additional resources */}
        <View style={styles.linkSection}>
          <Text style={styles.additionalText}>You might find these additional resources interesting:</Text>
          {course.resources.map((resource, index) => (
            <TouchableOpacity key={index} onPress={() => openURL(resource.url)}>
              <Text style={styles.link}>{resource.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Button to navigate to the test page */}
        <TouchableOpacity
          onPress={() => {
            if (articleRead && videoWatched) {
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
            !(articleRead && videoWatched) && styles.disabledButton
          ]}
        >
          <Text style={styles.testButtonText}>Go to Test Page 📝</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles for the component
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
