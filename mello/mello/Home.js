import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'

const BGColor = "#004052"


export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Mello Home</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BGColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});