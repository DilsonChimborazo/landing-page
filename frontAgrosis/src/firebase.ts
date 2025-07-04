import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTFLZYjeKyxyBvXkn-3guerzhT37DMbRQ",
  authDomain: "landingpage-ladrillera.firebaseapp.com",
  projectId: "landingpage-ladrillera",
  storageBucket: "landingpage-ladrillera.firebasestorage.app",
  messagingSenderId: "908099164858",
  appId: "1:908099164858:web:d9cebc2c7474738efa0083",
  measurementId: "G-J81J3VRQ9X"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
