import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import Character from './Character'
import SignoutButton from './Signout';
import { Checkbox, FormGroup, FormControlLabel, Box  } from '@material-ui/core';
import { Divider, Card, Button, Modal, TextInput, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-web';
import { useFonts } from 'expo-font';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import {db} from './firebase'
import { BlurView } from 'expo-blur';


const BGColor = "#003847";

export default function Dashboard() {

  const [fontsLoaded] = useFonts({
    'Elnath': require('/assets/fonts/ELNATH.ttf'),
  });

  const [todoData, setTodoData] = useState([])

  useEffect (() => {
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      console.log(newPosts);
      setTodoData(newPosts);
  });
}, [])


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
        colors={[ BGColor, 'white']}
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
          </Surface>
          <Surface style={styles.third}>
            <Text style={styles.todoTodayText}>ToDo List for Today</Text>
            <BlurView intensity={100} style={styles.todoContainer}>
            <Divider style={styles.divider} />
              {
                todoData.map((item, index) => {
                  return(
                    <View key={index} >
                      <View style={styles.todoTextContainer}>
                        <Text style={styles.todoText}>{item.todo}</Text>
                      </View>
                    </View>
                  )
                })
              }
              <Divider style={styles.divider}></Divider>
            </BlurView>
          </Surface>
          <Surface style={styles.fourth}>
            <Character></Character>
          </Surface>
          <View style={styles.wrapper}>
            <Text style={styles.todoTodayText}>Events for Today</Text>
            <BlurView intensity={100} style={{...styles.todoContainer, marginLeft: '2.5%'}}>
            <Divider style={styles.divider} />
              {
                todoData.map((item, index) => {
                  return(
                    <View key={index} >
                      <View style={styles.todoTextContainer}>
                      {index < 1 ? <Text style={styles.todoText}>{item.name}</Text> : <Text>{''}</Text>}
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.todoText}>{item.startTime}</Text>
                          <Text style={styles.todoText}>{item.endTime}</Text>
                        </View>
                      </View>
                    </View>
                  )
                })
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
  todoText: {
    fontFamily: "Monospace",
    fontSize: 20,
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