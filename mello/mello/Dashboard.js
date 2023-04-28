import { StyleSheet, Text, View} from 'react-native'
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


const BGColor = "#05586e";



export default function Dashboard() {

  
  const db = getDatabase();
  const dbToDo = ref(db, 'users/userID/todo');
  const [ toDoList, setToDoList ] = useState([]);

  useEffect(() => {
    get(dbToDo).then((snapshot) => {
      if(snapshot.exists()) {
        setToDoList(snapshot.val());
        console.log(snapshot.val());
      }
      else {
      }
    }, []);
  }, []);

  useEffect(() => {
    onValue(dbToDo, (snapshot) => {
      if(snapshot.exists()) {
        setToDoList(snapshot.val());
      }
    });
  }, []);

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



  const [initialized, setInitialized] = useState(false);
  useEffect(() => {

    if(!initialized) {
      setInitialized(true);
      console.log('initializing')
      console.log(initialized)
    }
    else {
      console.log('setting list')
      console.log(initialized)
      set(dbToDo, toDoList);
    }
  }, [toDoList]);

  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
    });
    setToDoList(mapped);
  }

  const handleFilter = () => {
    let filtered = toDoList.filter(task => {
      return !task.complete;
    });
    setToDoList(filtered);
  }

  const addTask = (userInput ) => {
    let copy = [...toDoList];
    copy = [...copy, { id: toDoList.length + 1, task: userInput, complete: false }];
    setToDoList(copy);
    const dbObjectivesRef = ref(db, 'users/userID/valuesNeeded');
        get(dbObjectivesRef).then((snapshot) => {
          if(snapshot.exists()) {
            let valuesNeeded = snapshot.val();
            valuesNeeded[3] += 1;
            set(dbObjectivesRef, valuesNeeded);
          }
        });
  }

  const [fontsLoaded] = useFonts({
    'Elnath': require('/assets/fonts/ELNATH.ttf'),
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
              <View style={styles.textContainer}>
                <Text style={styles.profileText}>Profile</Text>
              </View>
            </View>
          </View>
          <Surface style={styles.second}>
            <Text style={styles.todoTodayText}>Meal Plan for Today</Text>
            <BlurView intensity={100} style={styles.todoContainer}>
              
            </BlurView>
            
          </Surface>
          <Surface style={styles.third}>
            <Text style={styles.todoTodayText}>ToDo List for Today</Text>
            <BlurView intensity={100} style={styles.todoContainer}>
            <Divider style={styles.divider} />
              {
                <div className="App">
                  <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
                  <ToDoForm addTask={addTask}/>
                </div>
              }
              <Divider style={styles.divider}></Divider>
            </BlurView>
          </Surface>
          <Surface style={styles.fourth}>
          <Text style={styles.todoTodayText}> </Text>
            <BlurView intensity={50} style={styles.todoContainer}>
              <Character></Character>
            </BlurView>
          </Surface>
          <View style={styles.wrapper}>
            <Text style={{...styles.todoTodayText, marginTop:'5px',}}>Events for Today</Text>
            <BlurView intensity={100} style={{...styles.todoContainer, marginLeft: '2.5%', height: '90%'}}>
            <Divider style={styles.divider} />
              {eventList != [] &&
                (
                  eventList.filter(event => event.start.value.split('T')[0] == (new Date().toISOString().split('T')[0])).map((event) =>(
                    <Text>{event.text}</Text>
                  ))
                )
              }
              <Divider style={styles.divider}></Divider>
            </BlurView>
          </View>
        </SafeAreaView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: "space-around",
    justifyContent: "space-evenly",
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
    height: "35%",
    width: "45%",
    backgroundColor: BGColor,
    borderRadius: "10px",
  },
  button: {
    height: "100px",
    width: "100px",
    backgroundColor: 'red',
  },
  third: {
    height: "35%",
    width: "45%",
    backgroundColor: BGColor,
    borderRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  todoTodayText: {
    fontFamily: "Monospace",
    fontSize: 25,
    color: "white",
    alignSelf: "center",
  },
  todoTextContainer: {
    width: "100%",
    height: "100%",
  },
  todoTextContainer2: {
    width: "100%",
    height: "100%",
  },
  todoText: {
    fontFamily: "Monospace",
    fontSize: 25,
    alignSelf: "flex-start",
    width: "100%",
  },
  scrollView: {
    width: '95%',
    height: '85%',
},
  todoContainer: {
    width: "95%",
    height: "80%",
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: "5px"
  },
  fourth: {
    height: "50%",
    width: "56%",
    backgroundColor: BGColor,
    borderRadius: "10px",
  },
  wrapper: {
    height: "50%",
    width: "36%",
    backgroundColor: BGColor,
    justifyContent: "space-between",
    alignItems: "space-between",
    borderRadius: "10px",
  },
  divider: {
    width: "100%",
  }
 
})