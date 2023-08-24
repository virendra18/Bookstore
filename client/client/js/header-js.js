const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".main_nav");
const html = document.querySelector("html")
const headerNavLink = document.querySelectorAll(".header-link")

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navbar.classList.toggle("active")
    html.classList.toggle("h-no-overflow")

})


for (i = 0; i < headerNavLink.length; i++) {
    headerNavLink[i].addEventListener("click", () => {
        console.log("clicked")
        hamburger.classList.remove("active")
        navbar.classList.remove("active")
        html.classList.remove("h-no-overflow")
    })
}


