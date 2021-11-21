"use strict";
var mobileMenuIcon = document.querySelector("#mobile-menu-icon");
var mainHeader = document.querySelector("#main-nav-header");
var navLinks = document.querySelectorAll("#main-nav-header nav a");
window.addEventListener('scroll', function () {
    var header = document.querySelector("header");
    if (header == null)
        return;
    var breakpoint = +header.style.marginTop;
    var className = "sticky";
    if (window.scrollY > breakpoint)
        header.classList.add(className);
    else
        header.classList.remove(className);
});
/**
 * On mobile devices this function opens
 * a full screen menu by adding a css class
 */
function mobileMenuToggle() {
    if (mainHeader == null)
        return;
    mainHeader.classList.toggle("mobile-nav-active");
    toggleBodyScroll();
}
function mobileMenuClose() {
    if (mainHeader == null)
        return;
    mainHeader.classList.remove("mobile-nav-active");
    toggleBodyScroll();
}
if (mobileMenuIcon != null)
    mobileMenuIcon.addEventListener("click", mobileMenuToggle);
navLinks.forEach(function (elem) { return elem.addEventListener("click", mobileMenuClose); });
/**
 * If the header contains the class
 * "mobile-nav-active"
 * locks the vertical scroll.
 */
function toggleBodyScroll() {
    var body = document.querySelector("body");
    if (body == null)
        return;
    if (mainHeader != null && mainHeader.classList.contains("mobile-nav-active"))
        body.style.overflow = "hidden";
    else
        body.style.overflow = "auto";
}
/**
 * This function hides the header anytime
 * a link from the main nav menu in the header
 * is clicked
 * @param {HTMLElement} header - takes in the header element
 * @param {string} linkSelector - main nav menu links inside the header
 *
 * @return {void} -nothing is returned
 * @todo - to be completed
 */
(function hideHeaderMenuClick(h, linkSelector) {
    if (h == null)
        return;
    var header = h;
    var menuLinks = document.querySelectorAll(header.tagName + " " + linkSelector);
    menuLinks.forEach(function (link) { return link.addEventListener("click", function (evt) {
        header.style.transform = "translateY(-100%)";
    }); });
})(mainHeader, "nav a");
