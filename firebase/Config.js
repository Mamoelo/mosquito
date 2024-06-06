
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCmEE0JC9pQv0kQkXCU_KOU0h0avdr-eCQ",
  authDomain: "mobiledevice-c0122.firebaseapp.com",
  projectId: "mobiledevice-c0122",
  storageBucket: "mobiledevice-c0122.appspot.com",
  messagingSenderId: "958124865679",
  appId: "1:958124865679:android:3030e039b066c9b31d98fa",
  measurementId: "G-measurement-id"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; 
  } catch (error) {
    throw error; 
  }
};

export { db, app, auth, loginUserWithEmailAndPassword };

