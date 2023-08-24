const wrapper = document.querySelector(".wrapper");
const fileName = document.querySelector(".file-name");
const uploadedimage = document.querySelector("#uploadedimage");
const customBtn = document.querySelector("#custom-btn");
const cancelBtn = document.querySelector("#cancel-btn i");
const img = document.querySelector("#preview-image");
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
function defaultBtnActive() {
  uploadedimage.click();
}
uploadedimage.addEventListener("change", function () {
  console.log("clicked");
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const result = reader.result;
      img.src = result;
    };

    reader.readAsDataURL(file);
  }
//   if (this.value) {
//     let valueStore = this.value.match(regExp);
//     fileName.textContent = valueStore;
//   }
});
