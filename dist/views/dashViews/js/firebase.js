"use strict";

//Configuración de firebase
var firebaseConfig = {
  apiKey: "AIzaSyALJKR35EG30on83uQap3Q7Dfv0T3vbK1E",
  authDomain: "paperros-41ac7.firebaseapp.com",
  databaseURL: "https://paperros-41ac7-default-rtdb.firebaseio.com",
  projectId: "paperros-41ac7",
  storageBucket: "paperros-41ac7.appspot.com",
  messagingSenderId: "909088774674",
  appId: "1:909088774674:web:a63a0e3a8f709c5c8716cb",
  measurementId: "G-TX82FTKS5R"
};

//Inicializar Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();