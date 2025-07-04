import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


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

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 🔥 Asegúrate de exportarlos así
export { auth, db, storage, onAuthStateChanged, signOut };
