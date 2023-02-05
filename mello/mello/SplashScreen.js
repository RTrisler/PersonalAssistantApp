import React, { useEffect } from 'react'
import { Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';




const BGColor = "#004052"


export default function SplashScreen() {
  // Safe Area Value
  const edges = useSafeAreaInsets();



  return (
    <View style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: BGColor,
    }}>
      <Animated.View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{
          fontSize: 25,
          fontWeight: 'bold',
          color: 'white'
        }}>Mello</Text>

      </Animated.View>
    </View>
  );
}