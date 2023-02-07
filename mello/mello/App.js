import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './SplashScreen';
import AgendaView from './AgendaView';

const TabNav = createBottomTabNavigator();
function TheTabs(){
  return(
    <TabNav.Navigator screenOptions={{
         tabBarActiveTintColor: '#467599',
         tabBarInactiveTintColor: '#fcf7ff', 
         tabBarActiveBackgroundColor: '#92828d',
         tabBarInactiveBackgroundColor:'#022b3a',
         headerShown: false
         }}>
      <TabNav.Screen name="Home" component={Home}/>
      <TabNav.Screen name="Manage Time" component={AgendaView}/>
      <TabNav.Screen name='Settings' component={Settings}/>
    </TabNav.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SplashScreen></SplashScreen>
    </SafeAreaProvider>
  );
}

