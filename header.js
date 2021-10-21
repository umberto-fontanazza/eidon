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
    toggleBodyScroll();
}

function mobileMenuClose() {
    mainHeader.classList.remove("mobile-nav-active");
    toggleBodyScroll();
}

mobileMenuIcon.addEventListener("click",mobileMenuToggle);
navLinks.forEach(elem => elem.addEventListener("click",mobileMenuClose));

function toggleBodyScroll() {
    if(mainHeader.classList.contains("mobile-nav-active"))
        document.querySelector("body").style.overflow = "hidden";
    else
        document.querySelector("body").style.overflow = "auto";
}