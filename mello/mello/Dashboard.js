import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import Character from './Character'
import SignoutButton from './Signout';


const BGColor = "#003847";

export default function Dashboard() {
  return (
    <LinearGradient
        // Background Linear Gradient
        colors={[ BGColor, 'white']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Character>
        </Character>
        <SignoutButton></SignoutButton>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    rowGap: '20px',
  },
})