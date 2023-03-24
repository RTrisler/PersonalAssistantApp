import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { Button, Surface, IconButton } from 'react-native-paper';
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

const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

const r1head = require('./assets/img/head/robot1headbitmap.png')
const r1body = require('./assets/img/body/robot1bodybitmap.png')
const r1wheels = require('./assets/img/wheels/robot1wheelsbitmap.png')

const incrementingValues = [1,1,1,1];
const valuesNeeded = [1,0,0,0];
const icons = ['login','calendar-week','food','clock-outline']
let Cash = 0;

function chooseObjective(){
  const objv1 = "Log into app " + incrementingValues[0] +" days";
  const objv2 = "Create " + incrementingValues[1] +" new weekly tasks";
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
  Cash += (parseInt(selectedItem.id, 10)+1)*25;
}



export default function Character() {

  const [shouldShowObjectives, setShouldShowObjectives] = useState(false);
  const [shouldShowShop, setShouldShowShop] = useState(false);
  const [shouldShowEditBot, setShouldShowEditBot] = useState(false);
  const [progress, setProgress] = React.useState(0);
  const [level, setLevel] = React.useState(0);
  const chosenObjectives = chooseObjective();
  const [obj1, setObj1] = React.useState(false);
  const [obj2, setObj2] = React.useState(true);

  const check = () =>
  {
    if (obj2 == true){
      setObj2(false)
    }
    else{
      setObj2(true)
      levelUp()
    }
  }

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
      <View>
        <Text style={styles.cashContainer}>${Cash}</Text>
      </View>
      <View style={styles.charactercontainer}>
        <ImageBackground source={r1head} style={styles.head}></ImageBackground>
        <ImageBackground source={r1body} style={styles.body}></ImageBackground>  
        <ImageBackground source={r1wheels} style={styles.wheels}></ImageBackground>
        <div className='div'>
          
          <LinearProgress variant="determinate" value={progress} color='success' 
          sx={{
            width: 300,
          }}/>

          <button onClick={levelUp}>add</button> <text>Level: {level}</text>
        
        </div>
      </View>
      <View style={styles.rightCharacterContainer}>
        <View style={styles.iconcontainer}>
          <Button style={styles.iconbackground}  onPress={() => {setShouldShowObjectives(!shouldShowObjectives); setShouldShowShop(false); setShouldShowEditBot(false)}}>
            <FontAwesome5 name="clipboard-list" size={25} color="white" />
          </Button>
          <Button style={styles.iconbackground}  onPress={() => {setShouldShowShop(!shouldShowShop); setShouldShowObjectives(false); setShouldShowEditBot(false)}}>
            <FontAwesome5 name="shopping-cart" size={25} color="white" />
          </Button>
          <Button style={styles.iconbackground} onPress={() => {setShouldShowEditBot(!shouldShowEditBot); setShouldShowShop(false); setShouldShowObjectives(false)}}>
            <FontAwesome5 name="robot" size={25} color="white" style={styles.icon} />
          </Button>
        </View>
        <View style={styles.popupcontainer}>
          {shouldShowObjectives ?
            (
              <Surface style={{...styles.objectives, justifyContent: 'space-between'}}>
              {chosenObjectives.map((objective, objectiveId) => (
                <Surface key={objectiveId} style={{backgroundColor: DGreen, borderRadius: 20}}>
                  <View style={{flexDirection: 'row'}}>
                  
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
                  </View>
                </Surface>
              ))};
          </Surface>
            ) : null}
            {shouldShowShop ?
            (
              <Surface style={styles.shop}>
                <Text>Shop</Text>
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
    marginTop: '-304px',
    zIndex: 0
  },
  iconcontainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
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