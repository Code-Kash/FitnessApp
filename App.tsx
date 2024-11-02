// App.tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import OnboardingScreen from './screens/Onboarding';
import Settings from './screens/Settings';
import Home from './screens/Home';
import Sources from './screens/Sources';
import Profile from './screens/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Define the tab navigator param list
type TabParamList = {
  HomeTab: undefined;
  Sources: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
  MainTabs: undefined;
  Home: undefined;
  Settings: undefined;
  Sources: undefined;
  Profile: undefined;
};

// Create a TabNavigator component
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
          paddingVertical: 5,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#666666',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Sources"
        component={Sources}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="science" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('@hasOnboarded');
        if (value !== null) {
          setHasOnboarded(true);
        }
      } catch (e) {
        console.error('Failed to load onboarding status.');
      } finally {
        setIsLoading(false);
      }
    };
    checkOnboarding();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={hasOnboarded ? 'MainTabs' : 'Onboarding'}>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;