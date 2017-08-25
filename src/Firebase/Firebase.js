import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBH8MO4YDgkvQ28wQ4TVGMWZk0JkPCB8_k",
  authDomain: "reactfixter.firebaseapp.com",
  databaseURL: "https://reactfixter.firebaseio.com",
  projectId: "reactfixter",
  storageBucket: "reactfixter.appspot.com",
  messagingSenderId: "430923296727"
};
firebase.initializeApp(config);
export const firebaseAuth = firebase.auth()
export default firebase;
