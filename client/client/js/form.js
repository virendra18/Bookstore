const form = document.getElementById("addbookform");
const bimg = document.querySelector("#preview-image");

const bookName = document.getElementById("name");
const bookAuthor = document.getElementById("author");
const bookPublication = document.getElementById("publication");
const bookDescription = document.getElementById("description");
const bookCategory = document.getElementById("category");
const bookImage = document.getElementById("uploadedimage");

form.addEventListener("submit", async function handleSubmit(event) {
  const URL = "http://localhost:8080/book/";
  event.preventDefault();

  let bookImageURL = "";

  if (bookImage.files[0].name != "" || null) {
    bookImageURL = bookImage.files[0].name;
  }

  const bookData = {
    name: bookName.value,
    author: bookAuthor.value,
    publication: bookPublication.value,
    description: bookDescription.value,
    category: bookCategory.value,
    uploadedimage: bookImageURL,
  };

  console.log(bookData);

  // Sending data to golang
  const res = await fetch(URL, {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify(bookData),
  });

  console.log(res);

  // resetting form
  form.reset();
  bimg.src = "";
});
