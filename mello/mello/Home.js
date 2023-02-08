import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler'

import AgendaView from './AgendaView';
import Settings from './Settings';
import Character from './Character';
import GroceryAndDiet from './GroceryAndDiet'


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
      <TabNav.Screen name='Home' component={Character}/>
      <TabNav.Screen name="Manage Time" component={AgendaView}/>
      <TabNav.Screen name="Groceries and Diet" component={GroceryAndDiet}/>
      <TabNav.Screen name='Settings' component={Settings}/>
    </TabNav.Navigator>
  );
}

export default function Home() {
  return (
    <NavigationContainer>
      <TheTabs />
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});