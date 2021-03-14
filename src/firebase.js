import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrwfRXPOsyfTf8Itzfg2kQV6-9wNtvOXw",
    authDomain: "bt3103-week-6-1a5aa.firebaseapp.com",
    projectId: "bt3103-week-6-1a5aa",
    storageBucket: "bt3103-week-6-1a5aa.appspot.com",
    messagingSenderId: "420120166098",
    appId: "1:420120166098:web:d7d31da22497353c65370b",
    measurementId: "G-LN59S69Y2G"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;