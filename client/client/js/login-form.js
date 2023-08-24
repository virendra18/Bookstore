let loginForm = document.querySelector('.login-form-container');


const loginFormHandeler = function () {
    loginForm.classList.toggle('active');
    loginForm.classList.toggle('hidden');
}

document.querySelector('#login-btn').addEventListener('click',loginFormHandeler);
// document.querySelector('#login-btn2').addEventListener('click',loginFormHandeler);

document.querySelector('#close-login-btn').onclick = () => {
    loginForm.classList.remove('active');
    loginForm.classList.toggle('hidden');

}
