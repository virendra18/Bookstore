import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";

console.log("initaliased");

const signUpForm = document.getElementById("signupform");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signUpForm);

  const userName = formData.get("name");
  const userEmail = formData.get("email");
  const userPassword = formData.get("password");

  handleSignup(userName, userEmail, userPassword);
  console.log(formData);
});

const handleSignup = async (userName, userEmail, userPassword) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: userName,
      email: userEmail,
      timeStamp: serverTimestamp(),
    });

    localStorage.setItem("user", JSON.stringify(userCredential.user));

    window.location.href = "/";
    signUpForm.reset();
  } catch (e) {
    console.log("Error from signup", e);
  }
};
