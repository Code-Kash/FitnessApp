import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type SettingsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;

const Settings: React.FC = () => {
  const navigation = useNavigation<SettingsNavigationProp>();;

  const renderSettingItem = (label: string, value: string, subtitle?: string) => (
    <View style={styles.settingItem}>
      <View>
        <Text style={styles.settingLabel}>{label}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <Text style={styles.settingValue}>{value}</Text>
    </View>
  );

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <MaterialIcons name="arrow-back" size={24} color="black" />
          <Text style={styles.headerTitle}>SETTINGS</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Personal Information Section */}
        <Text style={styles.sectionTitle}>YOU</Text>
        {renderSettingItem('Name', 'NULL')}
        {renderSettingItem('Gender', 'NULL')}
        {renderSettingItem('Weight', 'NULL')}
        {renderSettingItem('Units', 'NULL')}

        {/* Workout Settings Section */}
        <Text style={styles.sectionTitle}>WORKOUT SETTINGS</Text>
        {renderSettingItem(
          'Play sound on rest time over',
          'NULL',
          "Doesn't play on silent, app must be open"
        )}
        {renderSettingItem(
          'Keep keypad open between sets',
          'NULL',
          'Allows faster editing of sets'
        )}

        {/* Notifications Section */}
        <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Enable Notifications</Text>
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        {/* Apple Health Section */}
        <Text style={styles.sectionTitle}>APPLE HEALTH</Text>

      <TouchableOpacity style={styles.resetButton} onPress={handleResetOnboarding}>
        <Text style={styles.resetButtonText}>Reset Onboarding</Text>
        <MaterialIcons name="restart-alt" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  settingLabel: {
    fontSize: 16,
    color: '#000000',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  settingValue: {
    fontSize: 16,
    color: '#666666',
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

export default Settings;