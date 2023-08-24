const modalBody = document.querySelector(".modal-body");

export const fetchSingleBookDataHandler = async (id) => {
  console.log("clicked", id);
  const response = await fetch(`http://localhost:8080/book/${id}`);

  const data = await response.json();

  console.log(data);

  const BookHtml = `
   
    <div class="modal-card">
    <div class="modalimage">
      <img class="modalbookImage" src=/images/books/${data.uploadedimage} alt="" />
    </div>
  
    <div class="modal-book-info">
      <div class="modal-text-group modal-book-name">
        <div class="modal-text">
          <h2 class="modal-book-heading">Book Name:</h2>
          <p>${data.name}</p>
        </div>
      </div>
      <div class="modal-text-group modal-book-publisher">
        <div class="modal-text">
          <h2 class="modal-book-heading">Author Name:</h2>
          <p>${data.author}</p>
        </div>
      </div>
      <div class="modal-text-group modal-book-publisher">
        <div class="modal-text">
          <h2 class="modal-book-heading">Publisher Name:</h2>
          <p>${data.publication}</p>
        </div>
      </div>
  
      <div class="modal-text-group modal-book-description">
        <div class="modal-text">
          <h2 class="modal-book-heading">About:</h2>
          <p>
          ${data.description}
          </p>
        </div>
      </div>
    </div>
  </div>
  
  
  
  
  `;

  modalBody.innerHTML = BookHtml;

  return data;
};

// const fetchSingleBookData = (id) => {
//   fetchSingleBookDataHandler(id);
//   openModal();
// };
