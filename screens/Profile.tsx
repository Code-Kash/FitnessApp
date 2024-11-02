import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../App';

type ProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

const Profile: React.FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>PROFILE</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
            <MaterialIcons name="settings" size={20} color="#007AFF" />
            <Text style={styles.settingsText}>SETTINGS</Text>
          </TouchableOpacity>
        </View>

        {/* Current Program Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CURRENT PROGRAM</Text>
          <View style={styles.programCard}>
            <View style={styles.programHeader}>
              <Text style={styles.programTitle}>4 DAY PROGRAM</Text>
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareText}>SHARE PROGRAM</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.link}>
              <Text style={styles.linkText}>View your program</Text>
              <MaterialIcons name="chevron-right" size={24} color="#007AFF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.link}>
              <Text style={styles.linkText}>Generate new program</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* History Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>HISTORY</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>VIEW ALL HISTORY</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.noWorkouts}>No previous workouts yet</Text>
        </View>

        {/* Exercises Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXERCISES</Text>
          <Text style={styles.exerciseDescription}>
            You can view, add or edit exercises here.
          </Text>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>View all exercises</Text>
            <MaterialIcons name="chevron-right" size={24} color="#007AFF" />
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  settingsText: {
    color: '#007AFF',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAllText: {
    color: '#007AFF',
    fontSize: 14,
  },
  programCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  shareButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  shareText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
  },
  noWorkouts: {
    color: '#666',
    fontSize: 16,
  },
  exerciseDescription: {
    fontSize: 16,
    marginBottom: 15,
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

export default Profile;