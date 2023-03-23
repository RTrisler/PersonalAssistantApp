import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { auth } from "./firebase"
import { useNavigation } from '@react-navigation/native'

export default function SignoutButton() {

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
        backgroundColor: '#0782F9',
        width: '20%',
        height: '50px',
        padding: 15,
        borderRadius: 10,
        alignSelf: 'right',
        marginTop: 40,
        },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})