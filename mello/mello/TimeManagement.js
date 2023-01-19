import { StatusBar } from 'expo-status-bar';
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

export default function TimeManagement() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="WeekView" component={WeekView} />
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
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