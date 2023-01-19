import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, Button, StyleSheet, View, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler'
import WeekView from './WeekView';
import MonthView from './MonthView';



function Overview({ navigation }) {
  return(
    <View style={styles.container}>  
        <Text styles={styles.buttonText}>Todo List</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Mello')}>
          <View style={styles.button2} text="To Do">
            <Text styles={styles.buttonText}>Reminders</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MonthView')}>
          <View style={styles.calendarButton}>
            <Text styles={styles.buttonText}>Calender</Text>
          </View>
        </TouchableOpacity>
    </View>
  )
}

const Stack = createNativeStackNavigator();

// 2AA198, #003847, 002B36
const BGColor = "#003847"
const LGreen = "#839496"


export default function TimeManagement() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="WeekView" component={WeekView} />
        <Stack.Screen name="MonthView" component={MonthView} />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: BGColor,
      alignItems: 'center',
      justifyContent: 'top',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 3,
      elevation: 3,
    },
  calendarButton: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingVertical: 30,
      paddingHorizontal: 100,
      backgroundColor: '',
      
  },
  button2: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingVertical: 30,
      paddingHorizontal: 93,
      backgroundColor: '#F8C454',
      
  },
  buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 20,
      textAlign: 'center',
  },
  Label: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingVertical: 50,
      paddingHorizontal: 100,
      backgroundColor: 'white',
  },
});