const URL = "http://localhost:8080/book/";

const booksData = document.getElementById("books-data");

console.log("running main");
const fetchData = async () => {
  const response = await fetch("http://localhost:8080/book/");

  const data = await response.json();

  console.log(data);

  //   data.map((book) => (

  //     const bookCard = document.createElement("p")
  //     p.innertext = book.title
  //   ));

  //   const bookCard = document.createElement("p");
  data.map((book) => {
    const bookCard = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const bookImage = document.createElement("img");
    bookCard.classList = "book-card";
    author.classList = "book-item book-author";
    title.classList = "book-item title-author";
    bookImage.classList = "book-item book-image";
    bookImage.height = 200;

    title.innerText = book.author;
    author.innerText = book.author;
    bookImage.src = `/images/books/${book.uploadedimage}`;

    bookCard.append(bookImage);
    bookCard.append(title);
    bookCard.append(author);
    booksData.append(bookCard);



    
  });

  return data;
};
fetchData();

// console.log(bookData);
