import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Surface } from 'react-native-paper';
import { ImageBackground } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

const r1head = require('./assets/img/head/robot1headbitmap.png')
const r1body = require('./assets/img/body/robot1bodybitmap.png')
const r1wheels = require('./assets/img/wheels/robot1wheelsbitmap.png')

export default function Character() {

  const [shouldShow, setShouldShow] = useState(false);

  return (
    <LinearGradient
          // Background Linear Gradient
          colors={[ BGColor, 'white']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ImageBackground source={r1head} style={styles.head}></ImageBackground>  
          <ImageBackground source={r1body} style={styles.body}></ImageBackground>  
          <ImageBackground source={r1wheels} style={styles.body}></ImageBackground>
          <View style={styles.iconcontainer}>
            <Surface style={styles.iconbackground}>
              <FontAwesome5 name="clipboard-list" size={50} color="white" />
            </Surface>
            <Surface style={styles.iconbackground}>
              <FontAwesome5 name="shopping-cart" size={50} color="white" />
            </Surface>
            <Button style={styles.iconbackground} onPress={() => setShouldShow(!shouldShow)}>
              <FontAwesome5 name="robot" size={50} color="white"  />
              {shouldShow ?
              (
                <Surface style={styles.objective}></Surface>
              ) : null}
            </Button>
          </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
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
  iconcontainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginLeft: '550px',
    marginBottom: '50px',
    rowGap: '25px',
  },
  iconbackground: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '75px',
    height: '75px',
    backgroundColor: DGreen,
    justifyContent: 'center',
    alignItems: 'center',
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
    zIndex: 1
  },
  wheels: {
    position: 'absolute',
    width: '430px',
    height: '608px',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  },
});