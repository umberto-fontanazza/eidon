const mobileMenuIcon = document.querySelector("#mobile-menu-icon");
const mainHeader = document.querySelector("#main-nav-header");
const navLinks = document.querySelectorAll("#main-nav-header nav a");


window.addEventListener('scroll',function(){
    let header = document.querySelector("header");
    if(header == null)
        return;
    let breakpoint: number = +header.style.marginTop;
    let className: string = "sticky";
    if (window.scrollY > breakpoint)
        header.classList.add(className);
    else
        header.classList.remove(className);
});


function mobileMenuToggle() {
    if(mainHeader == null) return;
    mainHeader.classList.toggle("mobile-nav-active");
    toggleBodyScroll();
}

function mobileMenuClose() {
    if(mainHeader == null) return;
    mainHeader.classList.remove("mobile-nav-active");
    toggleBodyScroll();
}

if(mobileMenuIcon != null)
    mobileMenuIcon.addEventListener("click",mobileMenuToggle);
navLinks.forEach(elem => elem.addEventListener("click",mobileMenuClose));

function toggleBodyScroll() {
    let body = document.querySelector("body");
    if(body == null) return;
    if(mainHeader != null && mainHeader.classList.contains("mobile-nav-active"))
        body.style.overflow = "hidden";
    else
        body.style.overflow = "auto";
}