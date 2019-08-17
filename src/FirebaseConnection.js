import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "AIzaSyC_72K6Md5Co2lVZR7LbwG4UHEMfCJOp4I",
  authDomain: "nicky-transcribe.firebaseapp.com",
  databaseURL: "https://nicky-transcribe.firebaseio.com",
  projectId: "nicky-transcribe",
  storageBucket: "nicky-transcribe.appspot.com",
  messagingSenderId: "521153355498",
  appId: "1:521153355498:web:aedcd003c4dc955f"
});

export const dbContext = React.createContext({
  db: null
});

export const useFirestore = () => {
  const [db, setDb] = useState(null);
  useEffect(() => {
    const firestore = app.firestore();
    setDb(firestore);
  }, []);
  return { db };
};
