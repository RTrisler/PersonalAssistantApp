import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image,  Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from "../firebase"
import { useNavigation } from '@react-navigation/native'
import { BlurView } from 'expo-blur';
import { ImageBackground } from 'react-native-web';
import { useFonts } from 'expo-font';
import { Checkbox, FormGroup, FormControlLabel, Box  } from '@material-ui/core';

const wave = require('/assets/img/wave/wave.png')
const r1head = require('/assets/img/head/robot1headbitmap.png')
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const BGColor = "#003847";

const LoginScreen = () => {
    const [fontsLoaded] = useFonts({
        'Elnath': require('/assets/fonts/ELNATH.ttf'),
    });
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            navigation.replace("Home")
        }
    })
    // unsubscribe from listener
    return unsubscribe
  }, [])

    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered with: ',user.email)
        })
        .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with: ',user.email)
        })
        .catch(error => alert(error.message))
    }

  return (
    <View
        style={styles.container}
    >
        <ImageBackground source={wave} style={[styles.wave, StyleSheet.absoluteFill]} />
            <ScrollView contentContainerStyle={{
                flex: 1,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <BlurView intensity={100}>
                <View style={styles.login}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Mello</Text>
                    </View>
                    <View>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleLogin} 
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleSignUp} 
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    
                </View>
            </BlurView>
        </ScrollView>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BGColor,
    },
    wave: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    login: {
        width: 650,
        height: 550,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',   
    },
    titleContainer: {
        width: 200,
        height: 100,
        marginVertical: 30,
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Elnath',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 100,
        color: '#fff',
    },
    input: {
        backgroundColor: 'white',
        width: 450,
        height: 40,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff90',
        marginBottom: 20
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: BGColor,
        width: 450,
        height: 40,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#fff',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
})