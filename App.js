import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { AppStateProvider } from './src/data/AppState';
import SplashScreen from './src/screens/SplashScreen';
import AuthScreen from './src/screens/AuthScreen';
import QuizScreen from './src/screens/QuizScreen';
import DetailScreen from './src/screens/DetailScreen';
import PaywallScreen from './src/screens/PaywallScreen';
import ReviewsScreen from './src/screens/ReviewsScreen';
import SearchScreen from './src/screens/SearchScreen';
import PlansScreen from './src/screens/PlansScreen';
import Tabs from './src/Tabs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppStateProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Main" component={Tabs} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Paywall" component={PaywallScreen} />
          <Stack.Screen name="Reviews" component={ReviewsScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Plans" component={PlansScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppStateProvider>
  );
}
