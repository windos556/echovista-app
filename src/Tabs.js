import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from './screens/MapScreen';
import PlansScreen from './screens/PlansScreen';
import ProfileScreen from './screens/ProfileScreen';
import { colors } from './theme/theme';

const Tab = createBottomTabNavigator();

const ICONS = { Map: 'map', Plans: 'star', Profile: 'person' };

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.forestDeep,
        tabBarInactiveTintColor: colors.inkSoft,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: 'rgba(78,115,96,0.12)' },
        tabBarIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} size={size - 2} color={color} />,
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Plans" component={PlansScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
