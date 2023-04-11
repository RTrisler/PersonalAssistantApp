import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler'
import AgendaView from './AgendaView';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Divider, Card, Button, Modal, TextInput, Surface } from 'react-native-paper';
import MonthView from './MonthView';
import TodoAppScreen from './ToDoAppScreen';

// 2AA198, #003847, 002B36
const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

const Stack = createNativeStackNavigator();

function Overview({ navigation }) {
  const [fontsLoaded] = useFonts({
    'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
  });

  const [daytext, setDayText] = useState(null);
  const [monthday, setMonthDay] = useState('');
  const [monthtext, setMonthText] = useState(null);
  const [currenttime, setCurrentTime] = useState(null);


  
  useEffect(() => {
    let today = new Date();
    let daytext = today.toLocaleString('default', { weekday: 'long'});
    let monthday = (today.getMonth() + 1) + '-' + today.getDate();
    let monthtext = today.toLocaleString('default', { month: 'short'});
    setDayText(daytext);
    setMonthDay(monthday);
    setMonthText(monthtext);
  }, []);

  useEffect(() => {
    let today = new Date();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let secTimer = setInterval(() =>{
      setCurrentTime(time)
    }, 1000) 
  
    return () => clearInterval(secTimer);
  }, []);
  

  return(
      <LinearGradient
          // Background Linear Gradient
          colors={[ BGColor, 'white']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Surface style={styles.calendarContainer} elevation={5}>
            <AgendaView></AgendaView>
          </Surface>
        </LinearGradient>
      );
}

export default function TimeManagement() {
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false
        }}>
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="AgendaView" component={AgendaView} />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '40%',
    height: '90%',
    backgroundColor: DGreen,
    borderRadius: '10px',
    marginLeft: '50px',
    paddingTop: '5px',
    justifyContent: 'space-between',
  },
  dayDisplay: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: '20%',
    marginBottom: '10px',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 30,
    fontFamily: 'BebasNeue-Regular',
    color: 'white',
    paddingLeft: '30px',
    alignSelf: 'center',
  },
  timeText: {
    fontSize: 30,
    alignSelf: 'center',
    fontFamily: 'BebasNeue-Regular',
    color: 'white',
    paddingLeft: '20px',
    paddingTop: '20px',
  },
  cityText: {
    fontSize: 30,
    fontFamily: 'BebasNeue-Regular',
    color: 'white',
    paddingLeft: '20px',
    alignSelf: 'center',
  },
  dayText: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 15,
    color: 'white',
    paddingLeft: '10px',
  },
  monthText: {
    fontFamily: 'BebasNeue-Regular',
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
    paddingLeft: '30px',
  },
  dayEvents: {
    height: '75%',
    backgroundColor: 'green',
    borderRadius: '5px',
    
  },
  calendarContainer: {
    flex: 1,
    width: '90%',
    height: '90%',
    backgroundColor: 'black',
    borderRadius: '10px',
    marginRight: '50px',
    marginLeft: '50px',
    alignSelf: 'center',
  }
    
});