const allBooks = document.getElementById("allbooks");
const allBooksSection = document.querySelector(".book-page__allbooks");
import { fetchSingleBookDataHandler } from "./singleBookDetails.js";
import { openModal } from "./modal.js";

const fetchSingleBookData = (id) => {
  fetchSingleBookDataHandler(id);
  openModal();
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

    const btn = document.createElement("button");
    btn.classList = "btn--3";
    // btn.onclick = () => fetchSingleBookData(book.ID);

    const btnLink = document.createElement("a");
    btnLink.classList = "btn--3";
    btnLink.textContent = "Know More";
    btnLink.href = `/book.html?id=${book.ID}`;

    // image section
    bookCardImageDiv.append(bookCardImage);

    // book-info section

    bookCardInfo.append(bookTitle, bookAuthor);
    bookCardImageContainer.append(bookCardImageDiv, bookCardInfo);

    // btn section
    btn.append(btnLink);
    mBtn.append(btn);

    bookCard.append(bookCardImageContainer, mBtn);
    allBooksSection.append(bookCard);
  });

  return data;
};
fetchData();
