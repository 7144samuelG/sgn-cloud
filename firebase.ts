// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getFunctions} from "firebase/functions"
import{getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyAxblsazPzUNtn2vWLzmZ7VafBuwJx6SGo",
  authDomain: "cloud-storage-daed7.firebaseapp.com",
  projectId: "cloud-storage-daed7",
  storageBucket: "cloud-storage-daed7.appspot.com",
  messagingSenderId: "413290331963",
  appId: "1:413290331963:web:6d2e2e0f4475b142f8c11e",
  measurementId: "G-3VLJ8QS4L2"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app=initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);
const functions=getFunctions(app);
export {functions,db,storage}