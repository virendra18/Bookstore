import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKnbUQY-aSD55hByL4jHWRMmN74H7n5ZA",
  authDomain: "books-fb664.firebaseapp.com",
  projectId: "books-fb664",
  storageBucket: "books-fb664.appspot.com",
  messagingSenderId: "372531117943",
  appId: "1:372531117943:web:f014a7b679822de2992b72",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
