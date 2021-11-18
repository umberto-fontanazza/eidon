"use strict";
var mobileMenuIcon = document.querySelector("#mobile-menu-icon");
var mainHeader = document.querySelector("#main-nav-header");
var navLinks = document.querySelectorAll("#main-nav-header nav a");
window.addEventListener('scroll', function () {
    var breakpoint = document.querySelector("header").style.marginTop;
    var className = "sticky";
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
mobileMenuIcon.addEventListener("click", mobileMenuToggle);
navLinks.forEach(function (elem) { return elem.addEventListener("click", mobileMenuClose); });
function toggleBodyScroll() {
    if (mainHeader.classList.contains("mobile-nav-active"))
        document.querySelector("body").style.overflow = "hidden";
    else
        document.querySelector("body").style.overflow = "auto";
}
