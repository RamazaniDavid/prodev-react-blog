import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import firebaseConfig from "./firebaseConfig.json";


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();

export { projectStorage };
