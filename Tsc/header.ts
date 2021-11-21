const mobileMenuIcon = document.querySelector("#mobile-menu-icon");
const mainHeader = document.querySelector("#main-nav-header");
const navLinks = document.querySelectorAll("#main-nav-header nav a");


window.addEventListener('scroll', function (): void {
    let header = document.querySelector("header");
    if (header == null)
        return;
    let breakpoint: number = +header.style.marginTop;
    let className: string = "sticky";
    if (window.scrollY > breakpoint)
        header.classList.add(className);
    else
        header.classList.remove(className);
});

/**
 * On mobile devices this function opens
 * a full screen menu by adding a css class
 */
function mobileMenuToggle(): void {
    if (mainHeader == null) return;
    mainHeader.classList.toggle("mobile-nav-active");
    toggleBodyScroll();
}

function mobileMenuClose() {
    if (mainHeader == null) return;
    mainHeader.classList.remove("mobile-nav-active");
    toggleBodyScroll();
}

if (mobileMenuIcon != null)
    mobileMenuIcon.addEventListener("click", mobileMenuToggle);
navLinks.forEach(elem => elem.addEventListener("click", mobileMenuClose));

/**
 * If the header contains the class
 * "mobile-nav-active"
 * locks the vertical scroll.
 */
function toggleBodyScroll() {
    let body = document.querySelector("body");
    if (body == null) return;
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
(function hideHeaderMenuClick(h: any, linkSelector: string): void {
    if(h == null)
        return;
    let header: HTMLElement = h;
    let menuLinks = document.querySelectorAll(header.tagName + " " + linkSelector);
    menuLinks.forEach(link => link.addEventListener("click",evt => {
        header.style.transform = "translateY(-100%)";
    }))
})(mainHeader,"nav a");