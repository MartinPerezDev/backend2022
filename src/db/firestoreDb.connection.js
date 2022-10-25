import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import * as dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY ,
  authDomain: "proyecto-final-c3023.firebaseapp.com",
  projectId: "proyecto-final-c3023",
  storageBucket: "proyecto-final-c3023.appspot.com",
  messagingSenderId: "705613201616",
  appId: "1:705613201616:web:633fe96534fa1d0cac1ed5"
};

export const firestoreDbConnection = getFirestore(initializeApp(firebaseConfig))