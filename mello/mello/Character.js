import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Surface } from 'react-native-paper';
import { ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigation } from '@react-navigation/native'
import { auth } from "./firebase"

const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

const r1head = require('./assets/img/head/robot1headbitmap.png')
const r1body = require('./assets/img/body/robot1bodybitmap.png')
const r1wheels = require('./assets/img/wheels/robot1wheelsbitmap.png')

const incrementingValues = [1,1,1,1];
let Cash = 0;

function chooseObjective(){
  const objv1 = "Log into app " + incrementingValues[0] +" days";
  const objv2 = "Create " + incrementingValues[1] +" new weekly tasks";
  const objv3 = "Complete " + incrementingValues[2] +" weekly tasks";
  const objv4 = "Complete " + incrementingValues[3] +" daily tasks";
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
  incrementingValues[selectedItem.id] += 1;
  Cash += (parseInt(selectedItem.id, 10)+1)*25;
}

export default function Character() {

  const [shouldShowObjectives, setShouldShowObjectives] = useState(false);
  const [shouldShowShop, setShouldShowShop] = useState(false);
  const [shouldShowEditBot, setShouldShowEditBot] = useState(false);
  const [progress, setProgress] = React.useState(0);
  const [level, setLevel] = React.useState(0);
  //const doneObjectives = [];
  const chosenObjectives = chooseObjective();

  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
        navigation.replace("Login")
    })
    .catch(error => alert(error.message))
  }

  return (
    <LinearGradient
          // Background Linear Gradient
          colors={[ BGColor, 'white']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View>
            <Text style={styles.cashContainer}>${Cash}</Text>
          </View>
          <TouchableOpacity
              onPress={handleSignOut}
              style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
          
          <View style={styles.charactercontainer}>
            <ImageBackground source={r1head} style={styles.head}></ImageBackground>
            <ImageBackground source={r1body} style={styles.body}></ImageBackground>  
            <ImageBackground source={r1wheels} style={styles.wheels}></ImageBackground>
            <div className='div'>
          
          <LinearProgress variant="determinate" value={progress} color='success' 
          sx={{
            width: 300,
          }}/>

          <button 
            onClick={()=>{ 
              setProgress((oldProgress) => {
                  if (oldProgress === 100){
                    setLevel(level+1)
                    return 0; 
                  }
                  setProgress(oldProgress+10)                
              });
          }}>add</button> <text>Level: {level}</text>
        
        </div>
          </View>
          <View style={styles.iconcontainer}>
            <Button style={styles.iconbackground}  onPress={() => {setShouldShowObjectives(!shouldShowObjectives); setShouldShowShop(false); setShouldShowEditBot(false)}}>
              <FontAwesome5 name="clipboard-list" size={50} color="white" />
            </Button>
            <Button style={styles.iconbackground}  onPress={() => {setShouldShowShop(!shouldShowShop); setShouldShowObjectives(false); setShouldShowEditBot(false)}}>
              <FontAwesome5 name="shopping-cart" size={50} color="white" />
            </Button>
            <Button style={styles.iconbackground} onPress={() => {setShouldShowEditBot(!shouldShowEditBot); setShouldShowShop(false); setShouldShowObjectives(false)}}>
              <FontAwesome5 name="robot" size={50} color="white" style={styles.icon} />
            </Button>
          </View>
          <View style={styles.popupcontainer}>
            {shouldShowObjectives ?
              (
                <Surface style={styles.objectives}>

                  <BouncyCheckboxGroup
                    data={chosenObjectives}
                    style={{ flexDirection:"column" }}
                    onChange={(selectedItem) => {updateObjective(selectedItem); setProgress(() => {
                      if (progress === 100){
                        setLevel(level+1)
                        return 0; 
                      }
                      setProgress(20 + progress)                
                  } );}}
                  />
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    rowGap: '20px',
  },
  cashContainer:{
    fontSize: "400%",
    backgroundColor: DGreen,
    borderRadius: 10,
    padding: "5px"
  },
  charactercontainer: {
    display: 'flex',
    width: '480px',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  head: {
    width: '430px',
    height: '608px',
    marginBottom: '-608px',
  },
  body: {
    width: '430px',
    height: '608px',
    zIndex: 1
  },
  wheels: {
    width: '430px',
    height: '608px',
    marginTop: '-608px',
    zIndex: 0
  },
  iconcontainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '110px',
    rowGap: '50px',
    marginBottom:'100px',
    alignSelf: 'center',
  },
  iconbackground: {
    display: 'flex',
    width: '100px',
    height: '100px',
    backgroundColor: DGreen,
    justifyContent: 'center',
  },
  icon: {
    flex: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupcontainer: {
    display: 'flex',
    width: '480px',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  objectives: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    height: '450px',
    backgroundColor: DGreen,
    borderRadius: '10px',
    marginBottom:'100px',
    marginLeft: '50px',
    paddingTop: '5px',
    justifyContent: 'space-between',
  },
  unfinishedObjective: {
    margin:"10px",
    flexDirection:"row",
    backgroundColor:"grey",
    borderRadius:5,
    color:"black",
    padding:10,

  },
  shop: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    height: '400px',
    backgroundColor: DGreen,
    borderRadius: '10px',
    marginBottom:'100px',
    marginLeft: '50px',
    paddingTop: '5px',
    justifyContent: 'space-between',
  },
  editbot: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    height: '400px',
    backgroundColor: DGreen,
    borderRadius: '10px',
    marginBottom:'100px',
    marginLeft: '50px',
    paddingTop: '5px',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '20%',
    height: '50px',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'right',
    marginTop: 40,
  },
  buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
  },
});