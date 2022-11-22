
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA7iONDozK6eWPbjK1tRf5fYACd135rNVE",
  authDomain: "crwn-clothing-db-4ca1e.firebaseapp.com",
  projectId: "crwn-clothing-db-4ca1e",
  storageBucket: "crwn-clothing-db-4ca1e.appspot.com",
  messagingSenderId: "315431261816",
  appId: "1:315431261816:web:b3a1395b727a10baf6ff8d"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);