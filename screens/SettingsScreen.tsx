// screens/SettingsScreen.tsx

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const [name, setName] = useState<string>('');
  const [fitnessGoals, setFitnessGoals] = useState<string>('');
  const [trainingFrequency, setTrainingFrequency] = useState<string>('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedName = await AsyncStorage.getItem('@userName');
        const storedGoals = await AsyncStorage.getItem('@fitnessGoals');
        const storedFrequency = await AsyncStorage.getItem('@trainingFrequency');

        if (storedName) setName(storedName);
        if (storedGoals) setFitnessGoals(storedGoals);
        if (storedFrequency) setTrainingFrequency(storedFrequency);
      } catch (e) {
        console.error('Failed to load settings.', e);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    if (name.trim() === '') {
      Alert.alert('Validation Error', 'Please enter your name.');
      return;
    }
    if (fitnessGoals.trim() === '') {
      Alert.alert('Validation Error', 'Please enter your fitness goals.');
      return;
    }
    const freq = parseInt(trainingFrequency);
    if (isNaN(freq) || freq < 1 || freq > 7) {
      Alert.alert('Validation Error', 'Training frequency must be a number between 1 and 7.');
      return;
    }

    try {
      await AsyncStorage.setItem('@userName', name);
      await AsyncStorage.setItem('@fitnessGoals', fitnessGoals);
      await AsyncStorage.setItem('@trainingFrequency', trainingFrequency);

      Alert.alert('Success', 'Settings updated successfully!');
      navigation.goBack();
    } catch (e) {
      console.error('Failed to save settings.', e);
      Alert.alert('Error', 'An error occurred while saving your settings.');
    }
  };

  const handleResetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@hasOnboarded');
      await AsyncStorage.removeItem('@userName');
      await AsyncStorage.removeItem('@fitnessGoals');
      await AsyncStorage.removeItem('@trainingFrequency');

      Alert.alert('Success', 'Onboarding has been reset. Restart the app to start again.');
      navigation.navigate('Onboarding');
    } catch (e) {
      console.error('Failed to reset onboarding.', e);
      Alert.alert('Error', 'An error occurred while resetting onboarding.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Fitness Goals</Text>
        <TextInput
          style={styles.input}
          value={fitnessGoals}
          onChangeText={setFitnessGoals}
          placeholder="e.g., Build muscle, Lose weight"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Training Frequency (times/week)</Text>
        <TextInput
          style={styles.input}
          value={trainingFrequency}
          onChangeText={setTrainingFrequency}
          placeholder="Enter frequency (e.g., 3)"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
        <MaterialIcons name="save" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={handleResetOnboarding}>
        <Text style={styles.resetButtonText}>Reset Onboarding</Text>
        <MaterialIcons name="restart-alt" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  resetButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F44336',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default SettingsScreen;
