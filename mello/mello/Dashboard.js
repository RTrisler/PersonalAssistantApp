import { StyleSheet, Text, View } from 'react-native'
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


const BGColor = "#003847";

export default function Dashboard() {

  const [fontsLoaded] = useFonts({
    'Elnath': require('/assets/fonts/ELNATH.ttf'),
  });

  function storeHighScore(userId, score) {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);
    set(reference, {
      highscore: score,
    });
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
          <Surface style={styles.second}></Surface>
          <Surface style={styles.third}>
            <TouchableOpacity
              title='Send Data'
              onPress={storeHighScore("user2", 500)}
              style={styles.button}
            > Send Data
            </TouchableOpacity>
          </Surface>
          <Surface style={styles.fourth}>
            <Character></Character>
          </Surface>
          <View style={styles.wrapper}></View>
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
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "space-between",
    borderRadius: "10px",
  },
 
})