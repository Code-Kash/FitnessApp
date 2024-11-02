import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type HomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Exercise {
  name: string;
  type: 'BACK' | 'CHEST' | 'SHOULDERS' | 'CORE';
}

const workoutPlan: Exercise[] = [
  { name: 'Pull-Up (Overhand Grip)', type: 'BACK' },
  { name: 'Barbell Bench Press', type: 'CHEST' },
  { name: 'Cable Straight Arm Pulldown', type: 'BACK' },
  { name: 'Cable Lateral Raise', type: 'SHOULDERS' },
  { name: 'Reverse Incline Crunch', type: 'CORE' },
];

const Home: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>HEY LIFTER,</Text>
          <Text style={styles.subtitle}>
            Looks like a good day to make some gains - with science 💪
          </Text>
        </View>

        {/* Workout Section */}
        <View style={styles.workoutCard}>
          <View style={styles.workoutHeader}>
            <Text style={styles.workoutDay}>DAY 1/5</Text>
            <Text style={styles.estimatedTime}>ESTIMATED 59 MINS.</Text>
          </View>

          {/* Workout Type Pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillContainer}>
            <TouchableOpacity style={[styles.pill, styles.pillActive]}>
              <Text style={styles.pillText}>BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill}>
              <Text style={styles.pillText}>CHEST</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill}>
              <Text style={styles.pillText}>SHOULDERS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill}>
              <Text style={styles.pillText}>CORE</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Exercise List */}
          <View style={styles.exerciseList}>
            {workoutPlan.map((exercise, index) => (
              <View key={index} style={styles.exerciseItem}>
                <Text style={styles.exerciseText}>
                  <Text style={styles.bulletPoint}>• </Text>
                  {exercise.name}
                </Text>
              </View>
            ))}
          </View>

          {/* Start Button */}
          <TouchableOpacity style={styles.startButton}>
            <View style={styles.startButtonInner} />
          </TouchableOpacity>
        </View>

        {/* Insights Section */}
        <View style={styles.insightsSection}>
          <Text style={styles.insightsTitle}>INSIGHTS</Text>
          <Text style={styles.insightsSubtitle}>BASED ON THE LAST 7 DAYS</Text>

          {/* Insights Card */}
          <View style={styles.insightCard}>
            <MaterialIcons name="fitness-center" size={24} color="#000" />
            <View style={styles.insightContent}>
              <View style={styles.insightHeader}>
                <MaterialIcons name="local-fire-department" size={16} color="#ff4d4d" />
                <Text style={styles.insightHeaderText}>VERY LIKELY GROWING</Text>
              </View>
              <Text style={styles.insightText}>PECS</Text>
            </View>
            <MaterialIcons name="search" size={24} color="#000" />
          </View>

          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View 10 more</Text>
          </TouchableOpacity>

          <View style={styles.referenceCard}>
            <MaterialIcons name="science" size={24} color="#000" />
            <Text style={styles.referenceText}>
              How to know if muscles are growing{'\n'}(5 references)
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  workoutCard: {
    backgroundColor: '#1A1A1A',
    margin: 20,
    borderRadius: 15,
    padding: 20,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  workoutDay: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  estimatedTime: {
    color: '#3498db',
    fontSize: 12,
  },
  pillContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  pill: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: '#333',
    marginRight: 10,
  },
  pillActive: {
    backgroundColor: '#FFFFFF',
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  exerciseList: {
    marginBottom: 20,
  },
  exerciseItem: {
    marginBottom: 10,
  },
  exerciseText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  bulletPoint: {
    color: '#3498db',
    fontSize: 16,
  },
  startButton: {
    alignItems: 'center',
  },
  startButtonInner: {
    width: 40,
    height: 40,
    backgroundColor: '#FFD700',
    borderRadius: 20,
  },
  insightsSection: {
    padding: 20,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  insightsSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    marginBottom: 15,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  insightContent: {
    flex: 1,
    marginLeft: 10,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightHeaderText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  insightText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  viewMoreButton: {
    alignItems: 'center',
    marginBottom: 15,
  },
  viewMoreText: {
    color: '#007AFF',
    fontSize: 14,
  },
  referenceCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  referenceText: {
    marginLeft: 10,
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  activeNavText: {
    color: '#007AFF',
  },
});

export default Home;