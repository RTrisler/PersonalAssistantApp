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
      <View style={styles.todoContainer}>
          <Text styles={styles.todoText}>Todo List</Text>
      </View>
        <TouchableOpacity onPress={() => navigation.navigate('Mello')}>
          <View style={styles.reminderButton} >
            <Text styles={styles.buttonText}>Reminders</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MonthView')}>
          <View style={styles.calendarButton}>
            <Text styles={styles.buttonText}>Go To Calendar</Text>
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
      borderRadius: 3,
      elevation: 3,
      paddingTop: 20
    },
    todoContainer: {
      height: 350,
      width: 375,
      marginBottom: 10,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'top',
      borderRadius: 10,
      elevation: 3,
    },
    todoText: {
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    calendarButton: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      width: 375,
      height: 50,
      backgroundColor: LGreen,
    },
    reminderButton: {
      height: 350,
      width: 375,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#F8C454',
    },
});