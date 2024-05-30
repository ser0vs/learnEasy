import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomModal = ({ visible, score, totalQuestions, onRetry, onGoBack, onRetakeQuiz }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onGoBack}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Results</Text>
          <Text style={styles.modalMessage}>
            {score <= 5 
              ? `You scored ${score} out of ${totalQuestions} 😔. Maybe you want to take the course again?`
              : score > 5 && score <= 8
              ? `You scored ${score} out of ${totalQuestions} 😊.`
              : `Well done 🎉! You scored ${score} out of ${totalQuestions}.`}
          </Text>
          <View style={styles.buttonContainer}>
            {score <= 5 && (
              <TouchableOpacity onPress={onRetry} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Yes, I would be glad to take it again</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onGoBack} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>{score <= 5 ? "Maybe later" : "Go back"}</Text>
            </TouchableOpacity>
            {(score <= 5 || (score > 5 && score <= 8)) && (
              <TouchableOpacity onPress={onRetakeQuiz} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Retake quiz</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6513BD',
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#E6E6FA',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CustomModal;
