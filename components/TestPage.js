import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomModal from './CustomModal';
import testsData from './tests.json';  // Adjust the path if necessary
import { ProgressContext } from './ProgressContext';

// TestPage component renders a test for a specific course
const TestPage = ({ route, navigation }) => {
  const { progress, updateProgress } = useContext(ProgressContext);
  const { course } = route.params;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [score, setScore] = useState(0);
  const courseProgress = progress[course.id] || { articleRead: false, videoWatched: false };

  useEffect(() => {
    const courseTest = testsData.tests.find(test => test.courseId === course.id);
    if (courseTest) {
      setQuestions(courseTest.questions);
      setAnswers(Array(courseTest.questions.length).fill(null));
    }
  }, [course.id]);

  // Function to handle option selection
  const handleOptionPress = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    let newScore = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
    if (newScore >= 9) {
      updateProgress(course.id, { articleRead: true, videoWatched: true, testTaken: true });
    }
    setModalVisible(true);
  };

  // Function to reset the test and try again
  const handleRetry = () => {
    setAnswers(Array(questions.length).fill(null));
    setModalVisible(false);
    navigation.navigate('CourseDetails', { course });
  };

  // Function to go back to the course details without retrying
  const handleGoBack = () => {
    setModalVisible(false);
    navigation.navigate('CourseDetails', { course });
  };

  // Function to retake the quiz without resetting progress
  const handleRetakeQuiz = () => {
    setAnswers(Array(questions.length).fill(null));
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          {question.options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={[
                styles.optionButton,
                answers[index] === option && styles.selectedOptionButton,
              ]}
              onPress={() => handleOptionPress(index, option)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  answers[index] === option && styles.selectedOptionButtonText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <CustomModal
        visible={isModalVisible}
        score={score}
        totalQuestions={questions.length}
        onRetry={handleRetry}
        onGoBack={handleGoBack}
        onRetakeQuiz={handleRetakeQuiz}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  questionContainer: {
    marginBottom: 20,
    width: '100%',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000000',
  },
  optionButton: {
    backgroundColor: '#faf289',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedOptionButton: {
    backgroundColor: '#a1e5a1',
  },
  optionButtonText: {
    fontSize: 16,
    color: '#000000',
  },
  selectedOptionButtonText: {
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#6513BD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default TestPage;
