import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAk9WO8ADXyJ9d3-fvY_TvNWiN0vrnJ_fs",
  authDomain: "vector-dc0a4.firebaseapp.com",
  databaseURL: "https://vector-dc0a4-default-rtdb.firebaseio.com",
  projectId: "vector-dc0a4",
  storageBucket: "vector-dc0a4.firebasestorage.app",
  messagingSenderId: "1021803703613",
  appId: "1:1021803703613:web:aacf1cdf1637d1e6bbe954",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { auth, db, storage };
export default app;