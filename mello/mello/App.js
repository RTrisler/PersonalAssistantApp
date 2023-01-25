import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home'
import Settings from './Settings';
import TimeManagement from './TimeManagement';
import WeekView from './WeekView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const TabNav = createBottomTabNavigator();
function TheTabs(){
  return(
    <TabNav.Navigator>
      <TabNav.Screen name="Home" component={Home}/>
      <TabNav.Screen name="Manage Time" component={TimeManagement}/>
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

