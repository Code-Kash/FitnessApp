// screens/WelcomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

const WelcomeScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [fitnessGoals, setFitnessGoals] = useState<string>('');
  const [trainingFrequency, setTrainingFrequency] = useState<string>('');

  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate('Home');
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('@userName');
        const storedGoals = await AsyncStorage.getItem('@fitnessGoals');
        const storedFrequency = await AsyncStorage.getItem('@trainingFrequency');

        if (storedName) setName(storedName);
        if (storedGoals) setFitnessGoals(storedGoals);
        if (storedFrequency) setTrainingFrequency(storedFrequency);
      } catch (e) {
        console.error('Failed to load user data.', e);
      }
    };

    fetchUserData();
  }, []);

  return (
    <LinearGradient
      colors={['#4CAF50', '#81C784']} // Green gradient
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')} // Ensure you have a logo.png in assets
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome, {name}!</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.subtitle}>
          Your Fitness Goals: {fitnessGoals}
        </Text>
        <Text style={styles.subtitle}>
          Training Frequency: {trainingFrequency} times/week
        </Text>
      </View>
      <TouchableOpacity style={styles.footer} onPress={handleGetStarted}>
        <Text style={styles.footerText}>Get Started </Text>
        <MaterialIcons name="arrow-forward" size={24} color="#4CAF50" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60, // Makes the image circular
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  body: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  footerText: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default WelcomeScreen;
