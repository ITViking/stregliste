import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCYBpJzwbCK-5GIDr4yqDA59bu0At21HlQ",
    authDomain: "stregliste-79a6d.firebaseapp.com",
    databaseURL: "https://stregliste-79a6d.firebaseio.com",
    projectId: "stregliste-79a6d",
    storageBucket: "stregliste-79a6d.appspot.com",
    messagingSenderId: "80381517482",
    appId: "1:80381517482:web:68eddeabaf5504a740fad3",
    measurementId: "G-SLEYEZV7Q8"
  };
  
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();