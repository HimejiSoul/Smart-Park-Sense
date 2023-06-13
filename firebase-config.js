// Import the functions you need from the SDKs you need
// import firestore from '@react-native-firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu7Cm5pklYmSYgXbI1YgRkTjv55b-LRfE",
  authDomain: "projectiot-b2f13.firebaseapp.com",
  databaseURL: "https://projectiot-b2f13-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projectiot-b2f13",
  storageBucket: "projectiot-b2f13.appspot.com",
  messagingSenderId: "905860904609",
  appId: "1:905860904609:web:7f54b11644552ef55ae2e0",
  measurementId: "G-3Q58Y9L52M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
export default getDatabase(app);
