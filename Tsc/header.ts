const mobileMenuIcon = document.querySelector("#mobile-menu-icon");
const mainHeader = document.querySelector("#main-nav-header");
const navLinks = document.querySelectorAll("#main-nav-header nav a");
let lastScrollTop: number = 0;


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
 * @todo - undesired behavior for isWindowScrollPast()
 */
(function hideHeaderMenuClick(h: any, linkSelector: string): void {
    let viewportHeight: number = 100;
    if(h == null)
        return;
    let header: HTMLElement = h;
    let menuLinks = document.querySelectorAll(header.tagName + " " + linkSelector);
    menuLinks.forEach(link => link.addEventListener("click",evt => {
        if(/*unreliable check*/isWindowScrollPast(viewportHeight)){
            header.classList.add("hidden");
        }
    }))
})(mainHeader,"nav a");

/**
 * This utility function answers to the question
 * "has the window scrolled past a certain height in vh?"
 * @param {number} viewportHeight - the breakpoint height in vh
 * @returns {boolean} - the answer to the simple question
 */
function isWindowScrollPast(viewportHeight: number): boolean {
    let windowScrollWh: number = window.scrollY * 100 / window.innerHeight;
    if(windowScrollWh > viewportHeight)
        return true
    return false
}

/**
 * This function takes in the header HTMLElement, the scroll offset (negative if scrolling up) and an optional minimum offset.
 * It shows again the header (by removing the class .hidden) when the the user scrolls up by at least offsetMin pixels
 * or hides the header when the scroll is down.
 * @param {any} h headerHTMLElement
 * @param {number} offsetY new win.scrollY minus old win.scrollY
 * @param {number} offsetMinUp minimum scroll delta to show again header
 * @param {number} offsetMinDown minimum scroll delta to hide header
 * @returns {void}
 */
function toggleHeaderOnScroll(h: any, offsetY: number, offsetMinUp: number = 20, offsetMinDown: number = 75): void {
    if(h == null)
        throw "Header HTMLElement reference is null";
    let header: HTMLElement = h;

    if(offsetY > 0) {
        if(offsetY < offsetMinDown)
            return
        header.classList.add("hidden")
    }
    else {
        if(Math.abs(offsetY) < offsetMinUp)
            return
        header.classList.remove("hidden");
    }
}

let resetHeaderInit = (function(): void{
    window.addEventListener("scroll", evt =>{
        let delta: number;
        delta = window.scrollY - lastScrollTop;
        lastScrollTop = window.scrollY;
        toggleHeaderOnScroll(mainHeader,delta);
    })
})()

/**
 * This function handles the progress of the reading bar below the header on desktop
 * @param {string} barSelector is a CSS selector for the reading bar element
 */
function readingBarUpdate(barSelector: string): void {
    let barQuery = document.querySelector<HTMLElement>(barSelector)
    if(barQuery == null)
        throw "Reading bar selector returned null"
    let bar: HTMLElement = barQuery
    let bodyHeight: number = document.body.clientHeight

    let progressPercentage: number = window.scrollY * 100 / (bodyHeight - window.innerHeight)

    bar.style.transform = "translateX(-"+ (100 - progressPercentage) +"%)";
}

window.addEventListener("scroll",evt => {
    readingBarUpdate("header .progress-bar");
})