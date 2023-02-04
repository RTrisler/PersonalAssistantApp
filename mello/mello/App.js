import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from 'react-native-vector-icons/Ionicons';

import Home from './Home'
import Settings from './Settings';
import TimeManagement from './TimeManagement';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FinanceManagement from './FinanceManagement';

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
      <TabNav.Screen name='Home' component={Home}/>
      <TabNav.Screen name='Manage Time' component={TimeManagement}/>
      <TabNav.Screen name='Settings' component={Settings}/>
      <TabNav.Screen name='Manage Finances' component={FinanceManagement}/>
    </TabNav.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <TheTabs/>
    </NavigationContainer>
  );
}

