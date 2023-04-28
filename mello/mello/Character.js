import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import { Button, Surface, IconButton, ProgressBar } from 'react-native-paper';

import robot from './assets/img/robot/robot2.png'
import robot1 from './assets/img/robot/robot3.gif'
import robot2 from './assets/img/robot/robot4.gif'
import { getDatabase, ref, set, get, onValue } from 'firebase/database';


const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"



export default function Character() {

const [incrementingValues,setIncrementingValues] = useState([1,3,3,3]);
const [valuesNeeded, setValuesNeeded] = useState([1,0,0,0]);

const icons = ['login','calendar-week','food','clock-outline']

function chooseObjective(){
  const objv1 = "Log into app " + incrementingValues[0] +" days";
  const objv2 = "Create " + incrementingValues[1] +" events";
  const objv3 = "Create " + incrementingValues[2] +" recipes";
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
  let nValuesNeeded = valuesNeeded;
  nValuesNeeded[selectedItem.id] = 0;
  let nIValues = incrementingValues
  nIValues[selectedItem.id]++;

  setIncrementingValues(nIValues);
  setValuesNeeded(nValuesNeeded);
const db = getDatabase();
const dbvaluesNeededRef = ref(db,'users/userID/valuesNeeded');
const dbIncrementingValues = ref(db,'users/userID/incrementingValues');
set(dbIncrementingValues, incrementingValues);
set(dbvaluesNeededRef, valuesNeeded);
}

const db = getDatabase();
const dbIncrementingValues = ref(db,'users/userID/incrementingValues');
const dbvaluesNeededRef = ref(db,'users/userID/valuesNeeded');
const dbXPRef = ref(db,'users/userID/xp');
const dbLVLRef = ref(db,'users/userID/level');
useEffect(() => {
  get(dbIncrementingValues).then((snapshot) => {
    if(snapshot.exists()) {
      setIncrementingValues(snapshot.val());
    }
    else {
      set(dbIncrementingValues, incrementingValues);
    }
  }, []);
  get(dbvaluesNeededRef).then((snapshot) => {
    if(snapshot.exists()) {
      setValuesNeeded(snapshot.val());
    }
    else {
      set(dbvaluesNeededRef, valuesNeeded);
    }
  }, []);
  get(dbXPRef).then((snapshot) => {
    if(snapshot.exists()) {
      setProgress(snapshot.val());
    }
    else {
      set(dbXPRef, progress);
    }
  }, []);
  get(dbLVLRef).then((snapshot) => {
    if(snapshot.exists()) {
      setLevel(snapshot.val());
    }
    else {
      set(dbLVLRef, level);
    }
  }, []);
}, []);

useEffect(() => {
  onValue(dbIncrementingValues, (snapshot) => {
    if(snapshot.exists()) {
      setIncrementingValues(snapshot.val());
    }
  });
  
  onValue(dbvaluesNeededRef, (snapshot) => {
    if(snapshot.exists()) {
      setValuesNeeded(snapshot.val());
    }
  });

  onValue(dbXPRef, (snapshot) => {
    if(snapshot.exists()) {
      setProgress(snapshot.val());
    }
  });

  onValue(dbLVLRef, (snapshot) => {
    if(snapshot.exists()) {
      setLevel(snapshot.val());
    }
  });
  
}, []);



  const [progress, setProgress] = React.useState(0);
  const [level, setLevel] = React.useState(0);
  const chosenObjectives = chooseObjective();
  const [img, setImg] = React.useState(robot);

  const levelUp = () => 
  {
    setProgress((oldProgress) => 
    {
      setProgress(oldProgress+34)   
      levelCheck()             
    });
  }

  const levelCheck = () =>
  {
    console.log("check1")
    if (progress >= 100)
      {
        setLevel(level+1)
        setProgress(progress-100) 
        if (level === 0)
          {
            setImg(robot1)
          }
        else if (level === 1)
        {
          setImg(robot2)
        }
      }
  }

  return (
    <View style={styles.container}>
      <View style={styles.charactercontainer}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <img src={img} style={styles.wheels}/>
        </View>
        <View className='div'>
          <ProgressBar progress={progress/100} style={{borderRadius: 20, height: 20}} color={LGreen}/>
          <Text style={{color: LGreen, fontSize: 20, fontWeight: 'bold'}}>Level {level}</Text>
          <Button onClick={levelUp}>Button</Button>
        </View>
      </View>
      <View style={styles.rightCharacterContainer}>
        <View style={styles.popupcontainer}>
         <Text style={styles.objectivesText}>Objectives</Text>
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
                            set(dbXPRef, 20 + progress)
                            setProgress(20 + progress)        
                              if (progress === 100){
                                set(dbLVLRef, level+1)
                                setLevel(level+1)
                                return 0; 
                              }        
                            }
                          )
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
              ))}
          </Surface>
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
    height: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DGreen,
    borderRadius: '10px',
    marginTop: '10px'
  },
  objectives: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '90%',
    height: '80%',
    backgroundColor: LGreen,
    borderRadius: '10px',
    alignSelf: 'center',
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px'
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
  objectivesText: {
    fontFamily: "Monospace",
    fontSize: 25,
    color: "white",
    alignSelf: "center",
  },
});