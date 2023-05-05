import { ScrollView, StyleSheet, Text, View} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import Character from './Character'
import SignoutButton from './Signout';
import { Divider, Card, Button, Modal, TextInput, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-web';
import { useFonts } from 'expo-font';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import { useEffect, useState } from 'react';
import { BlurView } from 'expo-blur';
import ToDoList from "./ToDoList";
import ToDoForm from './ToDoForm';
import './index.css';
import ToDo from './ToDo';
import TodoAppScreen from './ToDoAppScreen';


const BGColor = "#003847";
const SurfaceColor = "#00181f";
const DGreen = "#002B36";



export default function Dashboard() {

  const db = getDatabase();
  const [eventList, setEventList] = useState([]);
  const dbEvents = ref(db, 'users/userID/events');

  useEffect(() => {
    get(dbEvents).then((snapshot) => {
      if(snapshot.exists()) {
        setEventList(snapshot.val());
        console.log(snapshot.val());
      }
      else {
      }
    }, []);
  }, []);

  useEffect(() => {
    onValue(dbEvents, (snapshot) => {
      if(snapshot.exists()) {
        setEventList(snapshot.val());
        console.log(snapshot.val()[0].start.value.split('T')[0])
        console.log(new Date().toISOString());
      }
    });
  }, []);

  const [fontsLoaded] = useFonts({
    'Elnath': require('/assets/fonts/ELNATH.ttf'),
    'GothamBold': require('/assets/fonts/GothamBold.ttf'),
    'GothamBook': require('/assets/fonts/GothamBook.ttf'),
    'GothamLight': require('/assets/fonts/GothamLight.ttf'),
    'GothamMedium': require('/assets/fonts/GothamMedium.ttf'),
  });

  const [todoData, setTodoData] = useState([])
  


  


  const getFormattedTime = (date) => {
  let fCDateHour = date.getHours()+ '';
  if(fCDateHour.length <2) {
    fCDateHour = '0' + fCDateHour;
  }
  let fCDateMinute = date.getMinutes() + '';
  if(fCDateMinute.length <2) {
    fCDateMinute = '0' + fCDateMinute;
  }
  const fCDateStr = fCDateHour + ':' + fCDateMinute;
  return fCDateStr;
  };

  const returnTimes = (startTime, endTime) => {
    const times = getFormattedTime(new Date(startTime)) + '-' + getFormattedTime(new Date(endTime))
    if (!isNaN(+times[0])) return times;
    else return '';
  }
  return (
    <LinearGradient
        // Background Linear Gradient
        colors={[ 'black', 'black']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.first}>
            <View style={styles.firstcontainer}>
              <View style={styles.textContainer}>
                <SignoutButton></SignoutButton>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Mello</Text>
              </View>
            </View>
          </View>
            <Surface style={styles.fourth}>
            <Text style={styles.todoTodayText}> </Text>
                <Character></Character>
            </Surface>
            
            <View style={styles.wrapper}>
              <Surface style={styles.topBar}>
                <Text style={{...styles.todoTodayText, marginTop:'5px',}}>Today's Events</Text>
              </Surface>
              <ScrollView>
                  {eventList != [] &&
                    (
                      eventList.filter(event => event.start.value.split('T')[0] == (new Date().toISOString().split('T')[0])).map((event) =>(
                        <Surface style={{width:'100%', height:'50px', backgroundColor:DGreen,marginBottom: '5px', marginTop: '5px'}}>
                          <Text style={{fontSize: 40, fontFamily: 'GothamBook', color: 'white', }}>{event.text}</Text>
                        </Surface>
                      ))
                    )
                  }
              </ScrollView>
            </View>
            

          <Surface style={styles.third}>
            <TodoAppScreen></TodoAppScreen>
          </Surface>
        </SafeAreaView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gradient: {
    flex: 1,
  },
  first: {
    height: "5%",
    width: "95%",
    alignContent: "center",
    justifyContent: "center",
  },
  firstcontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
  },
  textContainer: {
    width:"33.3%",
    alignItems: "center",
  },
  dashboardText: {
    fontFamily: 'Elnath',
    color: '#fff',
    fontSize: 20,
    alignSelf: 'flex-start'
  },
  titleText: {
    fontFamily: 'Elnath',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#fff',
  },
  profileText: {
    fontFamily: 'Elnath',
    color: '#fff',
    fontSize: 20,
    alignSelf: 'flex-end'
  },
  second: {
    position: 'absolute',
    top: 0,
    marginTop: '50px',
    left: 0,
    height: "35%",
    width: "60%",
    backgroundColor: BGColor,
    borderRadius: "10px",
  },
  button: {
    height: "100px",
    width: "100px",
    backgroundColor: 'red',
  },
  third: {
    position: "absolute",
    right: "0",
    height: "94%",
    width: "38%",
    backgroundColor: BGColor,
    borderRadius: "10px",
    marginRight: "10px",
    marginTop: "50px",
    alignContent: "center",
    padding: "10px",
  },
  todoTodayText: {
    fontFamily: "GothamBook",
    fontSize: 25,
    color: "white",
    alignSelf: "center",
  },
  todoTextContainer: {
    width: "100%",
    height: "100%",
    marginLeft: "10px"
  },
  todoTextContainer2: {
    width: "100%",
    height: "100%",
  },
  todoText: {
    fontFamily: "GothamBook",
    fontSize: 25,
    alignSelf: "flex-start",
    width: "100%",
  },
  scrollView: {
    width: '95%',
    height: '85%',
},
  todoContainer: {
    width: "100%",
    height: "95%",
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: "5px"
  },
  fourth: {
    position: 'absolute',
    top: 0,
    marginTop: '50px',
    left: 0,
    marginLeft: '10px',
    height: "46%",
    width: "60%",
    backgroundColor: BGColor,
    borderRadius: "10px",
  },
  wrapper: {
    position: "absolute",
    bottom: "0",
    marginLeft: "10px",
    marginBottom: "10px",
    height: "46%",
    width: "60%",
    backgroundColor: BGColor,
    justifyContent: "space-between",
    alignItems: "space-between",
    borderRadius: "10px",
  },
  divider: {
    width: "100%",
  },
  dayCard: {
    width: "10%",
    height: 100,
    backgroundColor: DGreen,
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    borderRadius: '15px',
    flexDirection: 'row',
  },
  topBar: {
    height: '25%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BGColor,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
 
})