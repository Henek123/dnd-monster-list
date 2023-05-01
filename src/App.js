import './App.css';
import React from 'react';
import './components/styles/MonsterCard.css'
import Header from './components/Header';
import Main from './components/Main';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

function App() {
  const firebaseConfig = {
    
    apiKey: process.env.REACT_APP_API_KEY,
    
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    
    projectId: process.env.REACT_APP_PROJECT_ID,
    
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    
    appId: process.env.REACT_APP_APP_ID,
    
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
    
  };
  const [userUID, setUserUID] = React.useState('')
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore(app);

  //loading data from firestore
  React.useEffect(() =>{
    (async () => {
      if(userUID){
        const docRefSaved = doc(db, userUID, "saved-spells");
        const docRefPrepared = doc(db, userUID, "prepared-spells" );
        const docSnapSaved = await getDoc(docRefSaved);
        const docSnapPrepared = await getDoc(docRefPrepared);
      if (docSnapSaved.exists()) {
        // setSavedSpells(docSnapSaved.data().spells)
      }
      if(docSnapPrepared.exists()){
        // setPreparedSpells(docSnapPrepared.data().prepared)
      }
      }
    }) ();
  }, [userUID]);

  //saving data to firestore
  // React.useEffect(() =>{
  //   if(userUID){
  //     const docRef = doc(db, userUID, "saved-spells");
  //     const data = {spells: savedSpells};
  //     setDoc(docRef, data)
  //   }

  // }, [savedSpells]);

  // React.useEffect(() =>{
  //   if(userUID){
  //     const docRef = doc(db, userUID, "prepared-spells");
  //     const data = {prepared: preparedSpells};
  //     setDoc(docRef, data)
  //   }

  // }, [preparedSpells]);

  return (
    <div className="App">
      <Header
        auth={auth}
        setUserUID={setUserUID} 
        userUID={userUID}
      />
      <Main />
    </div>
  );
}

export default App;