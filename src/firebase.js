import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCabLZ1Ae-2rMaK3jQkb4u4kDQlrlx2eMg",
    authDomain: "online-chess-4c6c4.firebaseapp.com",
    databaseURL: "https://online-chess-4c6c4.firebaseio.com",
    projectId: "online-chess-4c6c4",
    storageBucket: "online-chess-4c6c4.appspot.com",
    messagingSenderId: "40391976214",
    appId: "1:40391976214:web:69c6a6c8746de6dc921c37",
    measurementId: "G-J4KWF67KGJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export const auth = firebase.auth()
  export const firestore = firebase.firestore();
