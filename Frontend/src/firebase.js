import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuGjSiot4z5ZMIQFJhGCUrt2rjYXuVlo8",
  authDomain: "mindlink-89f70.firebaseapp.com",
  projectId: "mindlink-89f70",
  storageBucket: "mindlink-89f70.appspot.com",
  messagingSenderId: "637124568873",
  appId: "1:637124568873:web:0babf224bcb2ebffecf938",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = app.auth();
const firestore = app.firestore();
const analytics = app.analytics();
const storage = firebase.storage();

export { auth, firestore, analytics, storage };
