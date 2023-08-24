const bookContent = document.querySelector(".book-content");
// const commentsSection = document.querySelector(".comments");
const windowUrl = window.location.href;
const queryParam = windowUrl.split("?")[1];
export const bookId = windowUrl.split("=")[1];
const commentsSection = document.querySelector(".comments");

import { userName } from "./authStatus.js";
console.log("url param", windowUrl);
console.log("book id", bookId);
console.log("userName is", userName);

async function fetchBook() {
  const res = await fetch(`http://localhost:8080/book/${bookId}`);
  const data = await res.json();
  return data;
}
let bookData;

function createNotFound(message) {
  const notFoundSection = document.createElement("div");
  const notFoundPara = document.createElement("p");
  const backbtn = document.createElement("button");
  const backLink = document.createElement("a");

  notFoundSection.classList =
    "flex flex-col justify-center items-center h-full mt-20";
  notFoundPara.classList = "font-bold text-2xl";

  backLink.textContent = "Back to Home";
  backLink.href = `./`;

  backbtn.className = "px-5 py-2 rounded-lg text-white bg-main mt-5";
  backbtn.append(backLink);

  // notFoundPara.textContent = "Sorry Book Not Found";
  notFoundPara.textContent = message || "Sorry Book Not Found";

  notFoundSection.append(notFoundPara, backbtn);

  bookContent.append(notFoundSection);
}

async function checkBookId() {
  console.log("object", bookId);
  if (bookId === undefined) {
    console.log("okay");
    createNotFound("Please Pass the Bookid");
    return;
  } else if (bookId !== undefined) {
    bookData = await fetchBook();

    // if book is not found this will run
    if (bookData.ID === 0 && bookData.name.length === 0) {
      createNotFound();
    }

    if (bookData.ID !== 0 && bookData.name.length > 0) {
      const sectionBookPage = document.createElement("div");
      sectionBookPage.classList = "section-book-page";
      const bookContainer = document.createElement("div");
      bookContainer.classList = "container";

      const contentArea = document.createElement("div");
      contentArea.classList = "content-area";

      const bookPageImage = document.createElement("img");
      bookPageImage.classList = "book-page_img";
      bookPageImage.src = `./images/books/${bookData.uploadedimage}`;

      const contentAreaText = document.createElement("div");
      contentAreaText.classList = "content-area_text";
      const contentAreaContent = document.createElement("div");
      contentAreaContent.classList = "content-area_content";
      const bookName = document.createElement("p");
      bookName.classList = "content-area-bookname";
      const bookDescription = document.createElement("p");
      bookDescription.classList = "content-area-bookdescription";

      const checkOutButton = document.createElement("a");
      checkOutButton.classList = "btn btn--card btn--book btn-checkout";
      checkOutButton.textContent = "Check Out";
      checkOutButton.href = "#";

      contentAreaContent.append(bookName, bookDescription);
      contentAreaText.append(contentAreaContent, checkOutButton);
      contentArea.append(bookPageImage, contentAreaText);

      bookName.textContent = bookData.name;
      bookDescription.textContent = bookData.description;

      bookContainer.append(contentArea);
      //   bookContainer.append(bookName, bookDescription);

      sectionBookPage.append(bookContainer);

      bookContent.append(sectionBookPage);
      commentsSection.classList.remove("hidden");

      //   commentsSection.classList.remove("hidden");
    }
  }
}

checkBookId();
