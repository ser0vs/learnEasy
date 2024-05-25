import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomModal from './CustomModal';
import testsData from '../tests.json';  // Adjust the path if necessary
import { ProgressContext } from '../ProgressContext';

const TestPage = ({ route, navigation }) => {
  const { course } = route.params;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { resetProgress } = useContext(ProgressContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const courseTest = testsData.tests.find(test => test.courseId === course.id);
    if (courseTest) {
      setQuestions(courseTest.questions);
      setAnswers(Array(courseTest.questions.length).fill(null));
    }
  }, [course.id]);

  const handleOptionPress = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let newScore = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
    setModalVisible(true);
  };

  const handleRetry = () => {
    setAnswers(Array(questions.length).fill(null));
    setModalVisible(false);
    resetProgress();
    navigation.navigate('CourseDetails', { course });
  };

  const handleGoBack = () => {
    setModalVisible(false);
    navigation.navigate('CourseDetails', { course });
  };

  const handleRetakeQuiz = () => {
    setAnswers(Array(questions.length).fill(null));
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Test Page</Text>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6513BD',
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
