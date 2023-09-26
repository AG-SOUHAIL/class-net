import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_KEY,
  apiKey : "AIzaSyB4oeWeqwZbTrTcI_l7E8VAaLjX-Sk_t2k",
  authDomain: "class-net-0.firebaseapp.com",
  databaseURL: "https://class-net-0-default-rtdb.firebaseio.com",
  projectId: "class-net-0",
  storageBucket: "class-net-0.appspot.com",
  messagingSenderId: "263745241605",
  appId: "1:263745241605:web:83678ba638a6dae1abd26c",
  measurementId: "G-RS57EF1Z97"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase();
export const auth = getAuth();
export const storage = getStorage();
