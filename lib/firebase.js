import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// 🔥 CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDEXz4MVmd0pznVCQs7q7SayiMrySVLnAg",
  authDomain: "linkbytezdatabank.firebaseapp.com",
  databaseURL: "https://linkbytezdatabank-default-rtdb.firebaseio.com",
  projectId: "linkbytezdatabank",
  storageBucket: "linkbytezdatabank.appspot.com",
  messagingSenderId: "939806897912",
  appId: "1:939806897912:web:13dc4bed2e42acfc3ded0d",
  measurementId: "G-BXT5BZH5X5"
};

// 🔥 INIT
const app = initializeApp(firebaseConfig);

// 🔥 FIRESTORE (ESTO ES LO QUE TE FALTA)
export const db = getFirestore(app);

// 🔥 ANALYTICS (solo browser)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export { analytics };