// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1pkVpcslw_2sBbdE2O3yZ-M-yrn1vjUA",
  authDomain: "mello-379002.firebaseapp.com",
  projectId: "mello-379002",
  databaseURL: "https://mello-379002-default-rtdb.firebaseio.com",
  storageBucket: "mello-379002.appspot.com",
  messagingSenderId: "370188749221",
  appId: "1:370188749221:web:dee623c3e9b836aae3004c",
  measurementId: "G-7D02Q8T2XN"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };