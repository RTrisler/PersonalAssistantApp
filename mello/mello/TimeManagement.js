import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Calendar } from 'react-native-calendars';
import { Text, Button, StyleSheet, View, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler'
import WeekView from './WeekView';



function Overview({ navigation }) {
  return(
    <View style={styles.container}>  
      <View style={styles.lable}> 
        <Text styles={styles.buttonText}>Todo List</Text>
      </View>
      <View style={styles.space2}/>
        <TouchableOpacity onPress={() => navigation.navigate('Mello')}>
          <View style={styles.button2}>
            <Text styles={styles.buttonText}>Reminders</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.space}/>
        <TouchableOpacity onPress={() => navigation.navigate('WeekView')}>
          <View style={styles.button}>
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
          <Calendar
            enableSwipeMonths={true}
            // Specify style for calendar container element
            style = {{
              height: 375,
              width: 420,
              marginTop: 40,
              paddingTop: 20,
              borderRadius: 10
            }}

            theme={{
              calendarBackground: '#002B36',
              textSectionTitleDisabledColor: '#d9e1e8',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5', elevation:2,
              selectedDayTextColor: '#ffffff',
              todayTextColor: 'white',
              todayBackgroundColor: '#2AA198', elevation:2,
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: '#2AA198',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: '#2AA198',
              indicatorColor: 'blue',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '200',
              textDayFontSize: 20,
              textMonthFontSize: 24,
              textDayHeaderFontSize: 14
            }}
          />
        <Stack.Screen name="WeekView" component={WeekView} />
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
  button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingVertical: 30,
      paddingHorizontal: 100,
      backgroundColor: '#F8C454',
      
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
  space: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 100,
      backgroundColor: 'white',
  },
  space2: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingVertical: 85,
      paddingHorizontal: 100,
      backgroundColor: 'white',
  },
  Label: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingVertical: 50,
      paddingHorizontal: 100,
      backgroundColor: '#f01d71',
  },
});