import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { auth } from "./firebase"
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font';

export default function SignoutButton() {

    const [fontsLoaded] = useFonts({
        'Elnath': require('/assets/fonts/ELNATH.ttf'),
      });

    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }
  return (
    <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
    >
        <Text style={styles.buttonText}>Sign Out</Text>
    </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
    button: {
        flex: 1,
        width: '60%',
        height: '50px',
        borderRadius: 10,
        alignSelf: 'right',
        },
    buttonText: {
        color: 'white',
        fontFamily: 'Elnath',
        fontSize: 20,
        alignSelf: 'flex-start'
    },
})