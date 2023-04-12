import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { Button, Surface, IconButton, ProgressBar } from 'react-native-paper';
import { ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigation } from '@react-navigation/native'
import { auth } from "./firebase"
import { Checkbox, FormGroup, FormControlLabel, Box  } from '@material-ui/core';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SetMealIcon from '@mui/icons-material/SetMeal';
import robot from './assets/img/robot/robot2.png'
import { getDatabase, ref, set, get, onValue } from 'firebase/database';
const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

const r1head = require('./assets/img/head/robot1headbitmap.png')
const r1body = require('./assets/img/body/robot1bodybitmap.png')
const r1wheels = require('./assets/img/robot/robot2.png')

let incrementingValues = [1,3,3,3];
let valuesNeeded = [1,0,0,0];

const icons = ['login','calendar-week','food','clock-outline']

function chooseObjective(){
  const objv1 = "Log into app " + incrementingValues[0] +" days";
  const objv2 = "Create " + incrementingValues[1] +" events";
  const objv3 = "Set " + incrementingValues[2] +" meal plans";
  const objv4 = "Create " + incrementingValues[3] +" daily tasks";
  const allObjectivesLists = [
    {id:0, text:objv1, style:styles.unfinishedObjective, fillColor:'black',
  unfillColor:"white",
  innerIconStyle:{ borderColor: LGreen, borderWidth:5}, size:70, textStyle:{ color:"black"}},
    {id:1, text:objv2, style:styles.unfinishedObjective, fillColor:'black',
  unfillColor:"white",
  innerIconStyle:{ borderColor: LGreen, borderWidth:5},size:70, textStyle:{ color:"black"}},
    {id:2, text:objv3, style:styles.unfinishedObjective, fillColor:'black',
  unfillColor:"white",
  innerIconStyle:{ borderColor: LGreen, borderWidth:5},size:70, textStyle:{ color:"black"}},
    {id:3, text:objv4, style:styles.unfinishedObjective, fillColor:'black',
  unfillColor:"white",
  innerIconStyle:{ borderColor: LGreen, borderWidth:5},size:70, textStyle:{ color:"black"}}]
  
  return(allObjectivesLists)
}

const updateObjective = (selectedItem) =>{
  valuesNeeded[selectedItem.id] = 0;
  incrementingValues[selectedItem.id]++;
const db = getDatabase();
const dbvaluesNeededRef = ref(db,'users/userID/valuesNeeded');
const dbIncrementingValues = ref(db,'users/userID/incrementingValues');
set(dbIncrementingValues, incrementingValues);
set(dbvaluesNeededRef, valuesNeeded);
}



export default function Character() {

const db = getDatabase();
const dbIncrementingValues = ref(db,'users/userID/incrementingValues');
const dbvaluesNeededRef = ref(db,'users/userID/valuesNeeded');

useEffect(() => {
  get(dbIncrementingValues).then((snapshot) => {
    if(snapshot.exists()) {
      incrementingValues = snapshot.val();
    }
    else {
      set(dbIncrementingValues, incrementingValues);
    }
  }, []);
  get(dbvaluesNeededRef).then((snapshot) => {
    if(snapshot.exists()) {
      valuesNeeded = snapshot.val();
    }
    else {
      set(dbvaluesNeededRef, valuesNeeded);
    }
  }, []);
}, []);

useEffect(() => {
  onValue(dbIncrementingValues, (snapshot) => {
    if(snapshot.exists()) {
      incrementingValues = snapshot.val();
    }
  });
  
  onValue(dbvaluesNeededRef, (snapshot) => {
    if(snapshot.exists()) {
      valuesNeeded = snapshot.val();
    }
  });
  
}, []);





  const [shouldShowObjectives, setShouldShowObjectives] = useState(false);
  const [shouldShowShop, setShouldShowShop] = useState(false);
  const [shouldShowEditBot, setShouldShowEditBot] = useState(false);
  const [progress, setProgress] = React.useState(0);
  const [level, setLevel] = React.useState(0);
  const chosenObjectives = chooseObjective();
  const [obj1, setObj1] = React.useState(false);
  const [obj2, setObj2] = React.useState(true);

  const levelUp = () => 
  {
    setProgress((oldProgress) => 
    {
      if (oldProgress === 100)
      {
        setLevel(level+1)
        return 0; 
      }
      setProgress(oldProgress+10)                
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.charactercontainer}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <img src={robot} style={styles.wheels}/>
        </View>
        <View className='div'>
          <ProgressBar progress={progress/100} style={{borderRadius: 20, height: 20}} color={LGreen}/>
          <Text style={{color: LGreen, fontSize: 20, fontWeight: 'bold'}}>Level {level}</Text>
        
        </View>
      </View>
      <View style={styles.rightCharacterContainer}>
        <View style={styles.iconcontainer}>
          <Button style={styles.iconbackground}  onPress={() => {setShouldShowObjectives(!shouldShowObjectives); setShouldShowShop(false); setShouldShowEditBot(false)}}>
            <FontAwesome5 name="clipboard-list" size={25} color="white" />
          </Button>
          <Button style={styles.iconbackground} onPress={() => {setShouldShowEditBot(!shouldShowEditBot); setShouldShowShop(false); setShouldShowObjectives(false)}}>
            <FontAwesome5 name="robot" size={25} color="white" style={styles.icon} />
          </Button>
        </View>
        <View style={styles.popupcontainer}>
          {shouldShowObjectives ?
            (
              <Surface style={{...styles.objectives, justifyContent: 'space-around', paddingHorizontal: '1%'}}>
              {chosenObjectives.map((objective, objectiveId) => (
                <Surface key={objectiveId} style={{backgroundColor: DGreen, borderRadius: 20}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  
                      <IconButton 
                        icon={icons[objective.id]} 
                        iconColor={valuesNeeded[objective.id] >= incrementingValues[objective.id] ? LGreen : BGColor} 
                        size={30} 
                        onPress={() => {
                          if (valuesNeeded[objective.id] >= incrementingValues[objective.id]) {
                          updateObjective(objective);
                          setProgress(() => {
                            setProgress(20 + progress)        
                              if (progress === 100){
                                setLevel(level+1)
                                return 0; 
                              }        
                            }
                          );
                        }
                      }}
                      >
                     </IconButton>
                    <View style={{justifyContent: 'center'}}>
                      <Text style={{color: LGreen, fontSize: 20, alignContent: 'center', justifyContent: 'center', textAlignVertical: 'center', textAlign: 'center'}}>{objective.text}</Text>
                    </View>
                    <Button 
                    style={{backgroundColor: (valuesNeeded[objective.id] >= incrementingValues[objective.id] ? LGreen : BGColor), justifyContent: 'center', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, width: '20%'}}
                    onPress={() => {
                      if (valuesNeeded[objective.id] >= incrementingValues[objective.id]) {
                      updateObjective(objective);
                      setProgress(() => {
                        setProgress(20 + progress)        
                          if (progress === 100){
                            setLevel(level+1)
                            return 0; 
                          }        
                        }
                      );
                    }
                  }}
                    >
                      <Text style={{color: (valuesNeeded[objective.id] >= incrementingValues[objective.id] ? BGColor : LGreen), fontWeight:'bold'}}> {valuesNeeded[objective.id] >= incrementingValues[objective.id] ? "Claim!" : "Locked"}</Text>
                    </Button>
                  </View>
                </Surface>
              ))};
          </Surface>
            ) : null}
            {shouldShowEditBot ?
            (
              <Surface style={styles.editbot}>
                <Text>Edit Appearance</Text>
              </Surface>
            ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    rowGap: '20px',
    justifyContent: 'space-around'
  },
  cashContainer:{
    fontSize: "200%",
    backgroundColor: DGreen,
    borderRadius: 10,
    padding: "5px"
  },
  charactercontainer: {
    display: 'flex',
    width: '45%',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  rightCharacterContainer: {
    width: "45%",
    height: "100%",
  },
  head: {
    width: '215px',
    height: '304px',
    marginBottom: '-304px',
  },
  body: {
    width: '215px',
    height: '304px',
    zIndex: 1
  },
  wheels: {
    width: '215px',
    height: '304px',
    marginTop: '-65px',
    zIndex: 0
  },
  iconcontainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: DGreen,
    marginTop: '10px'
  },
  iconbackground: {
    display: 'flex',
    width: '75px',
    height: '50px',
    backgroundColor: DGreen,
    justifyContent: 'center',
  },
  icon: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupcontainer: {
    display: 'flex',
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  objectives: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    backgroundColor: LGreen,
  },
  unfinishedObjective: {
    margin:"10px",
    flexDirection:"row",
    backgroundColor:"grey",
    color:"black",
    padding:10,

  },
  shop: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    backgroundColor: DGreen,
    justifyContent: 'space-between',
  },
  editbot: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    backgroundColor: DGreen,
    justifyContent: 'space-between',
  },
});