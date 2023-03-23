

/* importamos get firestore */



import { getFirestore } from "firebase/firestore";


// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlH4aVrD0wYXwGZ6ikefo30Hium0Fo17E",
  authDomain: "sgpy-966ea.firebaseapp.com",
  projectId: "sgpy-966ea",
  storageBucket: "sgpy-966ea.appspot.com",
  messagingSenderId: "1088776124271",
  appId: "1:1088776124271:web:1661e4584642ac6ec59a9a"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);



/*iniciamos la database */


export const db = getFirestore(app)