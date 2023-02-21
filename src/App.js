
import './App.css';
import * as firebase from 'firebase/app';
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';
firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })
  const provider = new GoogleAuthProvider();
  const handleSignIn = ()=>{
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then(res => {
      console.log(res)
      const {displayName,  email, photoURL} = res.user;
      const signedInUser ={
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser)
    })
    .catch(err =>{
      console.log(err);
      console.log(err.message);
    })
  }
  return (
    <div className='App'>
      <button onClick={handleSignIn}>Sign in</button>
      {
        
        user.isSignedIn && <div>
          <img src={user.photo} alt=""/>
        <p>Welcome, {user.name}</p>
        </div>
        
      }
     
    </div>
  );
}

export default App;
