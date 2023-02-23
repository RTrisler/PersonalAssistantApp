import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Surface } from 'react-native-paper';
import { ImageBackground } from 'react-native'

const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

const r1head = require('./assets/img/head/robot1headbitmap.png')
const r1body = require('./assets/img/body/robot1bodybitmap.png')
const r1wheels = require('./assets/img/wheels/robot1wheelsbitmap.png')

export default function Character() {
  return (
    <LinearGradient
          // Background Linear Gradient
          colors={[ BGColor, 'white']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.leftcontainer}>
          </View>
          <View style={styles.middlecontainer}>
            <ImageBackground source={r1head} style={styles.head}></ImageBackground>  
            <ImageBackground source={r1body} style={styles.body}></ImageBackground>  
            <ImageBackground source={r1wheels} style={styles.body}></ImageBackground>  
          </View>
          <View style={styles.rightcontainer}>
            <Surface style={styles.objective}></Surface>
          </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftcontainer: {
    flex: 1,
    width: '30%',
    height: '100%',
    justifyContent: 'center',
  },
  middlecontainer: {
    flex: 1,
    width: '30%',
    height: '100%',
    justifyContent: 'center',
  },
  rightcontainer: {
    flex: 1,
    width: '30%',
    height: '100%',
    justifyContent: 'center',
  },
  objective: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '80%',
    height: '40%',
    backgroundColor: DGreen,
    borderRadius: '10px',
    marginLeft: '50px',
    paddingTop: '5px',
    justifyContent: 'space-between',
  },
  head: {
    position: 'absolute',
    width: '430px',
    height: '608px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    position: 'absolute',
    width: '430px',
    height: '608px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    position: 'absolute',
    width: '430px',
    height: '608px',
    alignItems: 'center',
    justifyContent: 'center',
  },
});