import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'

import './ProgressBar.css'

export default function Character() {
  state = {
    percent:0
  }

  updateProgress = (field, val) => {
    this.setState({[field]:val});
  }

  //render() {
   // return(
    //  <div className='app'>
    //    <div className='div'>
    //      <progressbar width={400} percent = {this.state.percent}/>
    //      <button 
    //        onClick={()=>
    //        this.updateProgress('percent', this.state.percent + .1)
    //      }>add</button>
   //     </div>
   //   </div>
  //  );
//  }
}
