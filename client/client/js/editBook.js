const modalBody = document.querySelector(".modal-body");

const form = document.getElementById("addbookform");
const bimg = document.querySelector("#preview-image");

const bookName = document.getElementById("name");
const bookAuthor = document.getElementById("author");
const bookPublication = document.getElementById("publication");
const bookDescription = document.getElementById("description");
const bookCategory = document.getElementById("category");
const bookImage = document.getElementById("uploadedimage");
const bookFeatured = document.getElementById("featured");

// const handleFormSubmit = async (id, data) => {
//   console.log("submitted");

//   console.log(data);

//   const bookData = {
//     name: bookName.value,
//     author: bookAuthor.value,
//     publication: bookPublication.value,
//     description: bookDescription.value,
//     category: bookCategory.value,
//   };

//   const updatedData = { ...data, bookData };
// };

form.addEventListener("submit", async function handleSubmit(event) {
  event.preventDefault();

  if (ID === null) {
    return;
  }
  // const URL = "http://localhost:8080/book/";
  console.log("currently editing", ID);

  let bookFeaturedValue = bookFeatured.value === "true" ? true : false;

  console.log(bookFeaturedValue);

  const bookData = {
    name: bookName.value,
    author: bookAuthor.value,
    publication: bookPublication.value,
    description: bookDescription.value,
    category: bookCategory.value,
    featured: bookFeaturedValue,
  };

  const previousData = await fetchBookDataHandler(ID);

  console.log("prev", previousData);

  const updatedData = { ...previousData, ...bookData };

  console.log(updatedData);

  const URL = `http://localhost:8080/updatebook/${ID}`;
  // Sending data to golang
  const res = await fetch(URL, {
    method: "PUT",
    "Content-Type": "application/json",
    body: JSON.stringify(updatedData),
  });

  const data = await res.json();
  console.log(data);

  console.log(res);

  // resetting form
  // form.reset();
  // bimg.src = "";

  console.log("Updated");
  window.location.reload();
});

let ID = null;

// set the input value with previous value
export const fetchBookDataHandler = async (id) => {
  ID = id;
  console.log("opened modal", id);
  const response = await fetch(`http://localhost:8080/book/${id}`);

  const data = await response.json();

  bookName.value = data.name;
  bookAuthor.value = data.author;
  bookPublication.value = data.publication;
  bookDescription.value = data.description;
  bookCategory.value = data.category;
  bookFeatured.value = data.featured;

  // handleFormSubmit(id, data);
  console.log(data);
  return data;
};

// fetchSingleBookDataHandler(11);
