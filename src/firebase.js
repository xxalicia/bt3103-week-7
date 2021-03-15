import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0Bgnwc2aMV3EdG_z-htBuYSTACn5lbVY",
    authDomain: "bt3103-week-6-b88ac.firebaseapp.com",
    projectId: "bt3103-week-6-b88ac",
    storageBucket: "bt3103-week-6-b88ac.appspot.com",
    messagingSenderId: "742344276789",
    appId: "1:742344276789:web:6828d14ff41e0a5b50aa7c",
    measurementId: "G-PBP63FS1Y5"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;