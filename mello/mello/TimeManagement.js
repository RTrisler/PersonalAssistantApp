import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, Button, StyleSheet, View, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler'
import AgendaView from './AgendaView';
import { LinearGradient } from 'expo-linear-gradient';

// 2AA198, #003847, 002B36
const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

const Stack = createNativeStackNavigator();

function Overview({ navigation }) {
  return(
      <LinearGradient
          // Background Linear Gradient
          colors={[ BGColor, 'white']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.dayContainer}>

          </View>
          <View style={styles.calendarContainer}>
            <AgendaView></AgendaView>
          </View>
        </LinearGradient>
      
      

  )
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
    justifyContent: 'space-between',
  },
  dayContainer: {
    width: '40%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: '10px',
    marginLeft: '50px'
  },
  calendarContainer: {
    width: '40%',
    height: '90%',
    backgroundColor: 'black',
    borderRadius: '10px',
    marginRight: '50px'
  }
    
});