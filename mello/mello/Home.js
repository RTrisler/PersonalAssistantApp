import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons';

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
         headerShown: false,
         showIcon: true
         }}>
      <TabNav.Screen name='Home' component={Character} options={{ tabBarIcon:(tabInfo) => (<MaterialCommunityIcons name="home-account" size={24} color="black" />)}}/>
      <TabNav.Screen name="Manage Time" component={AgendaView} options={{ tabBarIcon:(tabInfo) => (<AntDesign name="book" size={24} color="black" />)}}/>
      <TabNav.Screen name="Groceries and Diet" component={GroceryAndDiet} options={{ tabBarIcon:(tabInfo) => (<MaterialCommunityIcons name="food-variant" size={24} color="black" />)}}/>
      <TabNav.Screen name='Settings' component={Settings} options={{ tabBarIcon:(tabInfo) => (<Fontisto name="player-settings" size={24} color="black" />)}}/>
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