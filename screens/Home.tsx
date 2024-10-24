// screens/Home.tsx

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Workout {
  id: number;
  name: string;
  description: string;
}

const strengthExercises: Workout[] = [
  { id: 1, name: 'Bench Press', description: '3 sets of 8 reps' },
  { id: 2, name: 'Squats', description: '4 sets of 10 reps' },
  { id: 3, name: 'Deadlift', description: '3 sets of 5 reps' },
  { id: 4, name: 'Overhead Press', description: '3 sets of 8 reps' },
  { id: 5, name: 'Pull-Ups', description: '4 sets of 6 reps' },
  { id: 6, name: 'Lunges', description: '3 sets of 12 reps each leg' },
  { id: 7, name: 'Barbell Rows', description: '3 sets of 8 reps' },
  { id: 8, name: 'Leg Press', description: '4 sets of 10 reps' },
  { id: 9, name: 'Dumbbell Curls', description: '3 sets of 12 reps' },
  { id: 10, name: 'Tricep Dips', description: '3 sets of 10 reps' },
];

const getRandomWorkout = (): Workout => {
  const randomIndex = Math.floor(Math.random() * strengthExercises.length);
  return strengthExercises[randomIndex];
};

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [name, setName] = useState<string>('');
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('@userName');
        if (storedName) {
          setName(storedName);
        } else {
          setName('User');
        }

        // Retrieve today's workout
        const today = new Date();
        const dateKey = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const workoutData = await AsyncStorage.getItem(`@workout_${dateKey}`);
        if (workoutData) {
          setCurrentWorkout(JSON.parse(workoutData));
        } else {
          const newWorkout = getRandomWorkout();
          setCurrentWorkout(newWorkout);
          await AsyncStorage.setItem(`@workout_${dateKey}`, JSON.stringify(newWorkout));
        }
      } catch (e) {
        console.error('Failed to load user data or workout.', e);
      }
    };

    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.greeting}>Hello, {name}!</Text>

        <View style={styles.workoutContainer}>
          <Text style={styles.workoutTitle}>Today's Workout</Text>
          {currentWorkout ? (
            <View style={styles.workoutDetails}>
              <Text style={styles.workoutName}>{currentWorkout.name}</Text>
              <Text style={styles.workoutDescription}>{currentWorkout.description}</Text>
            </View>
          ) : (
            <Text style={styles.noWorkout}>No workout scheduled for today.</Text>
          )}
        </View>

        <View style={styles.emptySpace}>
          {/* Future content can be added here */}
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={24} color="#4CAF50" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => Alert.alert('Coming Soon', 'Science page will be available soon.')}>
          <MaterialIcons name="science" size={24} color="#757575" />
          <Text style={[styles.navText, styles.placeholderText]}>Science</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => Alert.alert('Coming Soon', 'Profile page will be available soon.')}>
          <MaterialIcons name="person" size={24} color="#757575" />
          <Text style={[styles.navText, styles.placeholderText]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginVertical: 20,
  },
  workoutContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  workoutTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 10,
  },
  workoutDetails: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#2E7D32',
  },
  workoutDescription: {
    fontSize: 16,
    color: '#388E3C',
    marginTop: 5,
  },
  noWorkout: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginTop: 10,
  },
  emptySpace: {
    flex: 1,
    // Half the screen empty; adjust as needed
    height: '50%',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
  },
  placeholderText: {
    color: '#757575',
  },
});

export default Home;
