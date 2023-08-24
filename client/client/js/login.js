import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { auth } from "./firebase.js";

const loginForm = document.getElementById("loginform");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const userEmail = formData.get("email");
  const userPassword = formData.get("password");

  handleLogin(userEmail, userPassword);
});

const handleLogin = async (userEmail, userPassword) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );

    localStorage.setItem("user", JSON.stringify(userCredential.user));

    window.location.href = "/";
    loginForm.reset();
  } catch (e) {
    console.log("Error from signup", e);
  }
};
