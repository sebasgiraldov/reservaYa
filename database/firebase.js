import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDqdHxvK5fH_Ril9kliVxgqCDuMiVSE2Fo",
    authDomain: "reservaya-9645e.firebaseapp.com",
    projectId: "reservaya-9645e",
    storageBucket: "reservaya-9645e.appspot.com",
    messagingSenderId: "764855227385",
    appId: "1:764855227385:web:10f880d2348cbc671a6328"
  };
  
  // Initialize Base de datos
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()

  export default{
      firebase,
      db,
  };