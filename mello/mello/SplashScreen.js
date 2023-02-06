import React, { useEffect, useRef } from 'react'
import { Dimensions, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animated } from 'react-native-web';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import AgendaView from './AgendaView';
import Settings from './Settings';
import TimeManagement from './TimeManagement';

const BGColor = "#004052"



export default function SplashScreen() {
  // Safe Area Value
  const edges = useSafeAreaInsets();

  // Animation Value
  const startAnimation = useRef(new Animated.Value(0)).current;

  // Scale Down titel
  const scaleTitle = useRef(new Animated.Value(1)).current;

  // Offset Animation
  const moveTitle = useRef(new Animated.ValueXY({x: 0,y:0})).current;

  useEffect(() => {

    // Starting Animation after 500ms
    setTimeout(()=> {

      // Parallel Animation
      Animated.parallel([
        Animated.timing(
          startAnimation,
          {
            toValue: Dimensions.get('window').height + (edges.top + 65),
            useNativeDriver: true
          }
        ),
        Animated.timing(
          scaleTitle,
          {
            toValue: 0.8,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          moveTitle,
          {
            toValue: {
              x: 0,
              y: (Dimensions.get('window').height / 2) - 35
            },
            useNativeDriver: true
          }
        )
      ])
      .start();

    }, 500)

  },[])

  return (
      <View style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}>
        <Animated.View style={{
          flex: 1,
          backgroundColor: BGColor,
          zIndex: 1,
          transform: [
            { translateY: startAnimation}
          ]
      }}>
        <Animated.View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Animated.Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
            transform: [
              { translateY: moveTitle.y },
              { scale: scaleTitle}
            ]
          }}>Mello</Animated.Text>

        </Animated.View>
        </Animated.View>

        <Animated.View style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.04)',
          zIndex: 0
        }}>

          <Home></Home>

        </Animated.View>
          
      </View>
  );
}