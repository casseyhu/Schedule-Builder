import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB8wTJ-slB0QdPo-Y2wUTf56JHJFhQxbUY",
    authDomain: "schedulebuilder-4382d.firebaseapp.com",
    databaseURL: "https://schedulebuilder-4382d.firebaseio.com",
    projectId: "schedulebuilder-4382d",
    storageBucket: "schedulebuilder-4382d.appspot.com",
    messagingSenderId: "623968118832",
    appId: "1:623968118832:web:4007445732eaea791a25f5",
    measurementId: "G-JMHV4RMXY9"
  };


firebase.initializeApp(firebaseConfig);

export default firebase;