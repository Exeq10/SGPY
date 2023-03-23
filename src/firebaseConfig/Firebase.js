

/* importamos get firestore */



import { getFirestore } from "firebase/firestore";


// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYTItgOa4tI4OgnJDPvBriH1sPZgM0-60",
  authDomain: "crud-2bcb7.firebaseapp.com",
  projectId: "crud-2bcb7",
  storageBucket: "crud-2bcb7.appspot.com",
  messagingSenderId: "478715777203",
  appId: "1:478715777203:web:42a60cb8b34973b0d2e0c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



/*iniciamos la database */


export const db = getFirestore(app)