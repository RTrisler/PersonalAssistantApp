import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Settings from './Settings';
import TimeManagement from './TimeManagement';

const BGColor = "#004052"


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
      <TabNav.Screen name="Manage Time" component={TimeManagement}/>
      <TabNav.Screen name='Settings' component={Settings}/>
    </TabNav.Navigator>
  );
}


export default function Home() {
  return (
    <NavigationContainer>
      <TheTabs></TheTabs>
    </NavigationContainer>
  );
}

