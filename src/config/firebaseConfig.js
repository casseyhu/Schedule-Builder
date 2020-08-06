import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
  apiKey: "AIzaSyBWajLPborfkMPrrcXbKktrzodEROl1h3w",
  authDomain: "wireframer-project-4ea6c.firebaseapp.com",
  databaseURL: "https://wireframer-project-4ea6c.firebaseio.com",
  projectId: "wireframer-project-4ea6c",
  storageBucket: "wireframer-project-4ea6c.appspot.com",
  messagingSenderId: "1074105843099",
  appId: "1:1074105843099:web:f3b1e0661ce2130f9ab53e",
  measurementId: "G-WWSSM1WYNH"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;