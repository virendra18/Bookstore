import { fetchBookDataHandler } from "./editBook.js";
import { fetchSingleBookDataHandler } from "./singleBookDetails.js";

import { openModal } from "./modal.js";

const allBooksSection = document.getElementById("allbooks");

const modal = document.querySelector(".edit-modal");
const overlay = document.querySelector(".edit-overlay");
const btnCloseModal = document.querySelector(".edit-close-modal");
const modalBody = document.querySelector(".edit-modal-body");

const adminHtml = document.querySelector(".admin-html");
const openEditModal = function () {
  console.log(`Button clicked`);
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  if (adminHtml !== null) {
    adminHtml.style.overflow = "hidden";
  }
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");

  if (adminHtml !== null) {
    adminHtml.style.overflow = "scroll";
  }

  modalBody.innerHTML = "";
};
btnCloseModal.addEventListener(`click`, closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener(`keydown`, function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const fetchSingleBookData = (id) => {
  fetchSingleBookDataHandler(id);
  openModal();
};

const deleteBookHandler = async (id) => {
  console.log(id);

  try {
    const res = await fetch(`http://localhost:8080/deletebook/${id}`, {
      method: "DELETE",
      "Content-Type": "application/json",
    });

    const data = await res.json();

    console.log(res, data);

    window.location.reload();
  } catch (error) {
    console.log("Error form delete book");
    throw new Error(error);
  }

  console.log("deleted successfully");
};

const editBook = (book) => {
  fetchBookDataHandler(book.ID);
  openEditModal();
};

const deleteBook = (id) => {
  deleteBookHandler(id);
};

const fetchData = async () => {
  const response = await fetch("http://localhost:8080/book/");

  const data = await response.json();

  console.log(data);

  data.map((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList = "book-card";

    const bookCardImageContainer = document.createElement("div");

    const bookCardImageDiv = document.createElement("div");
    bookCardImageDiv.classList = "image";

    const bookCardImage = document.createElement("img");
    bookCardImage.classList = "bookImage";
    bookCardImage.src = `/images/books/${book.uploadedimage}`;

    const bookCardInfo = document.createElement("div");
    bookCardInfo.classList = "book-info";

    const bookTitle = document.createElement("h2");
    bookTitle.classList = "bookTitle";
    bookTitle.textContent = `${book.name}`;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList = "bookAuthor";
    bookAuthor.textContent = `By ${book.author}`;

    const mBtn = document.createElement("div");
    mBtn.classList = "m-btn";

    const adminCta = document.createElement("div");
    adminCta.classList = "admin__cta";

    const btn = document.createElement("button");
    btn.classList = "btn__knowmore";
    // btn.onclick = () => fetchSingleBookData(book.ID);

    const btnLink = document.createElement("a");
    // btnLink.classList = "btn--3";
    btnLink.textContent = "Know More";
    btnLink.href = `/book.html?id=${book.ID}`;

    const editBtn = document.createElement("button");
    editBtn.classList = "btn__edit";
    editBtn.textContent = "Edit Book";
    editBtn.onclick = () => editBook(book);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList = "btn__delete";
    deleteBtn.textContent = "Delete Book";
    deleteBtn.onclick = () => deleteBook(book.ID);

    // image section
    bookCardImageDiv.append(bookCardImage);

    // book-info section

    bookCardInfo.append(bookTitle, bookAuthor);
    bookCardImageContainer.append(bookCardImageDiv, bookCardInfo);

    // btn section
    btn.append(btnLink);

    adminCta.append(editBtn, deleteBtn);
    mBtn.append(btn, adminCta);

    bookCard.append(bookCardImageContainer, mBtn);
    allBooksSection.append(bookCard);
  });

  return data;
};
fetchData();
