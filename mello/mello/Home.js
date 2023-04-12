import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import Card from './Card';
import CardContainer from './CardContianer';
import Calendar from './month'
import MealPlan from './MealPlan';


const BGColor = "#05586e"
const TabNav = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="MoreRecipes" component={MealPlan} />
    </Stack.Navigator>
  );
}

export default function Home() {
  return (
    <TabNav.Navigator  screenOptions={{
      tabBarActiveTintColor: '#467599',
      tabBarInactiveTintColor: '#fcf7ff', 
      tabBarActiveBackgroundColor: '#92828d',
      tabBarInactiveBackgroundColor:'#05586e',
      headerShown: false,
      showIcon: true,
      }}>
    <TabNav.Screen name='Home' component={Dashboard} options={{ tabBarIcon:(tabInfo) => (<MaterialCommunityIcons name="home-account" size={24} color="black" />)}}/>
    <TabNav.Screen name="Schedule" component={Calendar} options={{ tabBarIcon:(tabInfo) => (<AntDesign name="book" size={24} color="black" />)}}/>
    <TabNav.Screen name="Groceries and Diet" component={GroceryAndDiet} options={{ tabBarIcon:(tabInfo) => (<MaterialCommunityIcons name="food-variant" size={24} color="black" />)}}/>
    <TabNav.Screen name='MoreRecipes' component={HomeStack}  options={{tabBarButton: () => null,tabBarVisible: false,}} />
    <TabNav.Screen name='Settings' component={Settings} options={{ tabBarIcon:(tabInfo) => (<Fontisto name="player-settings" size={24} color="black" />)}}/>
    
  </TabNav.Navigator>
    
  );
}
