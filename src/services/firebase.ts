import * as firebase from 'firebase';

// TODO: fill in your firebase config
export const firebaseConfig = {
    apiKey: "AIzaSyCkS4IrAmiwrVv-Pmyf79am3I8xG3t2ywU",
    authDomain: "remo-challenge-bf8e6.firebaseapp.com",
    databaseURL: "https://remo-challenge-bf8e6.firebaseio.com",
    projectId: "remo-challenge-bf8e6",
    storageBucket: "remo-challenge-bf8e6.appspot.com",
    messagingSenderId: "741978558575",
    appId: "1:741978558575:web:10f59fddf6ce4c0bf23d9a"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;