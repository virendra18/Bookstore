import { signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { auth } from "./firebase.js";

const searchForm = document.getElementById("searchform");
const searchBarInput = document.querySelector(".searchbar");
searchForm.addEventListener("submit", function handleSearchSubmit(event) {
  event.preventDefault();

  console.log("submitted");

  const searchBarValue = searchBarInput.value;
  const hostName = window.location.hostname;

  //   window.location.href = `http://${hostName}:5500/search.html/?query=${searchBarValue}`;
  window.location.href = `/search.html?query=${searchBarValue}`;
});

const authStatus = document.querySelector(".auth-status");
import { userName } from "./authStatus.js";
const headerATag = document.createElement("a");
headerATag.classList = "main-nav-link main-nav-link nav-cta";
headerATag.id = "login-btn";
if (userName !== "Guest User") {
  headerATag.textContent = "Logout";
  // headerATag.href = "./signup.html";

  headerATag.onclick = async () => {
    await signOut(auth);
    localStorage.clear("user");
    location.reload();
  };
  authStatus.append(headerATag);
} else {
  headerATag.href = "./signup.html";
  headerATag.textContent = "Signup";

  authStatus.append(headerATag);
}

console.log("username is", userName);
