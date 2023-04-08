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
import Character from './Dashboard';
import GroceryAndDiet from './GroceryAndDiet'
import TimeManagement from './TimeManagement';
import TodoAppScreen from './ToDoAppScreen';
import Dashboard from './Dashboard';


const BGColor = "#004052"
const TabNav = createBottomTabNavigator();

export default function Home({navigation, route}) {
  const {name} = route.params;
  console.log(name);
  return (
    <TabNav.Navigator  screenOptions={{
      tabBarActiveTintColor: '#467599',
      tabBarInactiveTintColor: '#fcf7ff', 
      tabBarActiveBackgroundColor: '#92828d',
      tabBarInactiveBackgroundColor:'#022b3a',
      headerShown: false,
      showIcon: true,
      }}>
    <TabNav.Screen name='Home' component={() => <Dashboard name={route.params.name}/>} options={{ tabBarIcon:(tabInfo) => (<MaterialCommunityIcons name="home-account" size={24} color="black" />)}}/>
    <TabNav.Screen name="Schedule" component={TimeManagement} options={{ tabBarIcon:(tabInfo) => (<AntDesign name="book" size={24} color="black" />)}}/>
    <TabNav.Screen name="Groceries and Diet" component={GroceryAndDiet} options={{ tabBarIcon:(tabInfo) => (<MaterialCommunityIcons name="food-variant" size={24} color="black" />)}}/>
    <TabNav.Screen name='Settings' component={Settings} options={{ tabBarIcon:(tabInfo) => (<Fontisto name="player-settings" size={24} color="black" />)}}/>
  </TabNav.Navigator>
    
  );
}
