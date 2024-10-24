// screens/OnboardingScreen.tsx

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type OnboardingStep = 1 | 2 | 3;

const OnboardingScreen: React.FC = () => {
  const [step, setStep] = useState<OnboardingStep>(1);
  const [name, setName] = useState<string>('');
  const [fitnessGoals, setFitnessGoals] = useState<string>('');
  const [trainingFrequency, setTrainingFrequency] = useState<string>('');

  const handleNext = () => {
    if (step === 1 && name.trim() === '') {
      Alert.alert('Validation Error', 'Please enter your name.');
      return;
    }
    if (step === 2 && fitnessGoals.trim() === '') {
      Alert.alert('Validation Error', 'Please enter your fitness goals.');
      return;
    }
    if (step === 3 && trainingFrequency.trim() === '') {
      Alert.alert('Validation Error', 'Please enter your training frequency.');
      return;
    }
    setStep((prev) => (prev < 3 ? (prev + 1) as OnboardingStep : prev));
  };

  const handleBack = () => {
    setStep((prev) => (prev > 1 ? (prev - 1) as OnboardingStep : prev));
  };

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleFinish = async () => {
    if (trainingFrequency.trim() === '') {
      Alert.alert('Validation Error', 'Please enter your training frequency.');
      return;
    }

    // Save onboarding completion and user data
    try {
      await AsyncStorage.setItem('@hasOnboarded', 'true');
      await AsyncStorage.setItem('@userName', name);
      await AsyncStorage.setItem('@fitnessGoals', fitnessGoals);
      await AsyncStorage.setItem('@trainingFrequency', trainingFrequency);
    } catch (e) {
      console.error('Failed to save onboarding data.', e);
      Alert.alert('Error', 'An error occurred while saving your data. Please try again.');
      return;
    }

    navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Animatable.View animation="fadeInRight" style={styles.stepContainer}>
            <Text style={styles.question}>What's your name?</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </Animatable.View>
        );
      case 2:
        return (
          <Animatable.View animation="fadeInRight" style={styles.stepContainer}>
            <Text style={styles.question}>What are your fitness goals?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Build muscle, Lose weight"
              value={fitnessGoals}
              onChangeText={setFitnessGoals}
            />
          </Animatable.View>
        );
      case 3:
        return (
          <Animatable.View animation="fadeInRight" style={styles.stepContainer}>
            <Text style={styles.question}>How many times a week do you train?</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter frequency (e.g., 3)"
              value={trainingFrequency}
              onChangeText={setTrainingFrequency}
              keyboardType="numeric"
            />
          </Animatable.View>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {renderStep()}
      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        {step < 3 && (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
        {step === 3 && (
          <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50', // Green background
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  stepContainer: {
    marginBottom: 50,
  },
  question: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#81C784',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
