import {
  setDoc,
  getDocs,
  doc,
  Timestamp,
  orderBy,
  collection,
  query,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

import { userName } from "./authStatus.js";

import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

import { bookId } from "./book.js";

const allComments = document.querySelector(".allcomments");

const commentsForm = document.getElementById("comments-forms");
console.log(commentsForm);
import { db } from "./firebase.js";

commentsForm.onsubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(commentsForm);

  const comment = formData.get("comment");
  console.log("comment --->", comment);
  handleComments(comment);
};

const handleComments = async (comment) => {
  const id = nanoid();
  try {
    await setDoc(doc(db, bookId, id), {
      commentarName: userName,
      comment: comment,
      createdAt: Timestamp.now(),
    });

    refetch();
  } catch (err) {
    console.log("Error", err);
  }

  console.log("inside handler");

  commentsForm.reset();
};

// get all comments
const getAllComments = async () => {
  const q = query(collection(db, bookId), orderBy("createdAt", "desc"));
  let commentsArray = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    commentsArray.push({ id: doc.id, ...doc.data() });
  });

  console.log("comments", commentsArray);
  return commentsArray;
};

// window.addEventListener("load", function () {
// if (bookId !== undefined) {
//   console.log("I ran");
//   getAllComments();
//   repopulate();
// }
// });

const repopulate = async () => {
  let comments = await getAllComments();

  console.log("in repopulate", comments);
  if (comments.length > 0) {
    console.log("okay");
    allComments.innerHTML = "";
    comments.map((comment) => {
      // const commentWrapper = document.createElement("div");
      const commentWrapper = document.createElement("div");

      const singleCommentWrapper = document.createElement("p");
      const commentarName = document.createElement("p");
      const commentPara = document.createElement("p");

      commentarName.textContent =
        (comment.commentarName || "Guest User") + " : ";
      commentPara.textContent = comment.comment;
      commentPara.classList = "text-3xl";

      commentarName.classList = "text-3xl font-bold";
      singleCommentWrapper.classList = "mt-5 flex items-center gap-3";
      allComments.classList = "my-20";
      singleCommentWrapper.append(commentarName, commentPara);
      commentWrapper.append(singleCommentWrapper);
      //   commentWrapper.append(commentarName, commentPara);
      allComments.append(commentWrapper);
    });
  }
};

// window.addEventListener("load", function () {
if (bookId !== undefined) {
  console.log("I ran");
  getAllComments();
  repopulate();
}
// });

const refetch = async () => {
  repopulate();
};
