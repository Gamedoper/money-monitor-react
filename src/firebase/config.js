import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyDSY-r1ec_6U20U05f6rif1pG5bDqIZbfI",
    authDomain: "money-count-85571.firebaseapp.com",
    projectId: "money-count-85571",
    storageBucket: "money-count-85571.appspot.com",
    messagingSenderId: "794626398189",
    appId: "1:794626398189:web:852ae32de090ac165ef9e4"
};


//  initialise firebase

firebase.initializeApp(firebaseConfig);

// initliazise auth

const projectFirestore = firebase.firestore();

const projectAuth = firebase.auth();

// timestamp

const timestamp = firebase.firestore.Timestamp;


export { projectFirestore, projectAuth, timestamp };
