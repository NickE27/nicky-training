import React, { useEffect, useState } from "react";
import firebase from "firebase";

export const dbContext = React.createContext({
  db: null,
  addDocument: null,
  deleteDocument: null
});

const app = firebase.initializeApp({
  apiKey: "AIzaSyC_72K6Md5Co2lVZR7LbwG4UHEMfCJOp4I",
  authDomain: "nicky-transcribe.firebaseapp.com",
  databaseURL: "https://nicky-transcribe.firebaseio.com",
  projectId: "nicky-transcribe",
  storageBucket: "nicky-transcribe.appspot.com",
  messagingSenderId: "521153355498",
  appId: "1:521153355498:web:aedcd003c4dc955f"
});

export const useFirestore = () => {
  const [db, setDb] = useState(null);
  const addDocument = ({ path, name, data }) =>
    name
      ? db
          .collection(path)
          .doc(name)
          .set(data)
      : db.collection(path).add(data);

  const deleteDocument = (path, name) =>
    db
      .collection(path)
      .doc(name)
      .delete();

  useEffect(() => {
    firebase
      .auth()
      .signInWithEmailAndPassword("nick.evesham@gmail.com", "NickyPassword123")
      .catch(() => {
        console.error("Failed to log in. Oh well.");
      });
    // console.log("HERE");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log(user);
        const firestore = app.firestore();
        setDb(firestore);
        // ...
      } else {
        console.log("no user");
        // User is signed out.
        // ...
      }
    });
    const firestore = app.firestore();
    setDb(firestore);
  }, []);

  return { db, addDocument, deleteDocument };
};
