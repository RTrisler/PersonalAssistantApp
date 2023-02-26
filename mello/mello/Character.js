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

  const [shouldShowObjectives, setShouldShowObjectives] = useState(false);
  const [shouldShowShop, setShouldShowShop] = useState(false);
  const [shouldShowEditBot, setShouldShowEditBot] = useState(false);

  return (
    <LinearGradient
          // Background Linear Gradient
          colors={[ BGColor, 'white']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.charactercontainer}>
            <ImageBackground source={r1head} style={styles.head}></ImageBackground>
            <ImageBackground source={r1body} style={styles.body}></ImageBackground>  
            <ImageBackground source={r1wheels} style={styles.wheels}></ImageBackground>
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
                  <Text>Objectives</Text>
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
    height: '400px',
    backgroundColor: DGreen,
    borderRadius: '10px',
    marginBottom:'100px',
    marginLeft: '50px',
    paddingTop: '5px',
    justifyContent: 'space-between',
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
});