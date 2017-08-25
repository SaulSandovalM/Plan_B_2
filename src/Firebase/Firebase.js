import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCCNYQH7YIAoTgE1oW7M_2GmfK30oW8eUY",
  authDomain: "planb-cfb30.firebaseapp.com",
  databaseURL: "https://planb-cfb30.firebaseio.com",
  projectId: "planb-cfb30",
  storageBucket: "planb-cfb30.appspot.com",
  messagingSenderId: "859706632789"
};
firebase.initializeApp(config);
export const firebaseAuth = firebase.auth()
export default firebase;
