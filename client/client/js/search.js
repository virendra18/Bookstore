const searchBody = document.getElementById("search-result");
const query = window.location.search;

console.log(query);

const urlParams = new URLSearchParams(query);

// replaces the double quotes
const bookName = urlParams.get("query").replaceAll('"', "");

console.log(bookName);

const fetchSearchResult = async () => {
  const res = await fetch(`http://localhost:8080/searchbook/${bookName}`);

  console.log(`http://localhost:8080/searchbook/${bookName}`);
  const data = await res.json();

  if (data.length === 0) {
    const notFoundPara = document.createElement("p");
    notFoundPara.classList = "notFoundPara";
    notFoundPara.textContent = "Book Not Found";

    searchBody.append(notFoundPara);
  } else {
    const BookHtml = `
   
    <div class="modal-card modal-body ">
    <div class="modalimage">
      <img class="modalbookImage" src=/images/books/${data[0].uploadedimage} alt="" />
    </div>
  
    <div class="modal-book-info">
      <div class="modal-text-group modal-book-name">
        <div class="modal-text">
          <h2 class="modal-book-heading">Book Name:</h2>
          <p>${data[0].name}</p>
        </div>
      </div>
      <div class="modal-text-group modal-book-publisher">
        <div class="modal-text">
          <h2 class="modal-book-heading">Author Name:</h2>
          <p>${data[0].author}</p>
        </div>
      </div>
      <div class="modal-text-group modal-book-publisher">
        <div class="modal-text">
          <h2 class="modal-book-heading">Publisher Name:</h2>
          <p>${data[0].publication}</p>
        </div>
      </div>
  
      <div class="modal-text-group modal-book-description">
        <div class="modal-text">
          <h2 class="modal-book-heading">About:</h2>
          <p>
          ${data[0].description}
          </p>
        </div>
      </div>
    </div>
  </div>
  
  
  `;

    searchBody.innerHTML = BookHtml;
  }
};

fetchSearchResult();
