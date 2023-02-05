import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { useAssets } from 'expo-asset';

// 2AA198, #003847, 002B36
const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

const TellerHTML = require('./assets/teller.html');


export default function FinanceManagement() {
  const doThing = () => {
    console.log('thing');
  }

  const [html, error] = useAssets(TellerHTML);

  return (
      <WebView originWhitelist={['*']} source={TellerHTML} style={{flex: 1}} javaScriptEnabled={true} />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BGColor,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
