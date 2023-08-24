import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

export const currentUserInfo = JSON.parse(localStorage.getItem("user"));

// console.log(currentUserId);
// console.log(JSON.parse(currentUser));
console.log("currentUserInfo", currentUserInfo);
// const currentUserId = currentUserInfo.uid;

// console.log(currentUserId);

const fetchUserName = async () => {
  if (currentUserInfo) {
    const docRef = doc(db, "users", currentUserInfo.uid);
    const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log("data", docSnap.data());
    // }
    return docSnap.data().name;
  }
  return null;
};

export let userName = (await fetchUserName()) || "Guest User";

console.log("username", userName);
