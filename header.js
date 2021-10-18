const mobileMenuIcon = document.querySelector("#mobile-menu-icon");
const mainHeader = document.querySelector("#main-nav-header");
const navLinks = document.querySelectorAll("#main-nav-header nav a");


window.addEventListener('scroll',function(){
    let breakpoint = document.querySelector("header").style.marginTop;
    let className = "sticky";
    if (window.scrollY > breakpoint)
        document.querySelector("header").classList.add(className);
    else
        document.querySelector("header").classList.remove(className);
});


function mobileMenuToggle() {
    mainHeader.classList.toggle("mobile-nav-active");
}

function mobileMenuClose() {
    mainHeader.classList.remove("mobile-nav-active");
}

mobileMenuIcon.addEventListener("click",mobileMenuToggle);
navLinks.forEach(elem => elem.addEventListener("click",mobileMenuClose));