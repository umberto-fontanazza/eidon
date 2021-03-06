const mobileMenuIcon = document.querySelector("#mobile-menu-icon");
const mainHeader = document.querySelector("#main-nav-header");
const navLinks = document.querySelectorAll("#main-nav-header nav a");
let lastScrollTop: number = 0;
let colorAccent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent')
let cookieSnippetPath = "/Snippets/cookie-bar.html"


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
    document.querySelector("#mobile-menu-icon")?.classList.toggle("active")
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
    let linearGradient: string = "linear-gradient(90deg, "+colorAccent+" 0%, "+colorAccent+" "+progressPercentage+"%, transparent "+(progressPercentage+5)+"%, transparent)"
    bar.style.setProperty("background",linearGradient)
}

window.addEventListener("scroll",evt => {
    readingBarUpdate("header .progress-bar");
})

/**
 * This function fetches the cookie-bar snippet
 * located at the path specified by the first param
 * and appends the node to the document.body
 * @param {string} cookieSnippetPath Location of the html snippet
 * @param {string} cookieBarId CSS id given to the outer div containing the cookie bar
 */
function cookieInit(cookieSnippetPath: string, cookieBarId: string): void {
    let fetchedHTML: string;
    let dummyDiv = document.createElement("div");

    fetch(cookieSnippetPath)
        .then((response: Response) => response.text())
        .then((data) => {
            fetchedHTML = data
            dummyDiv.innerHTML = fetchedHTML!
            let cookieContainer = dummyDiv.querySelector("#"+cookieBarId);
            if(cookieContainer == null)
                throw "Cookie container is null"
            document.body.appendChild(cookieContainer)
        })
        .then(evt => {
            cookieBar("#"+cookieBarId)
        })
}

/**
 * This function takes a key, value pair and a
 * number of days and created a new cookie
 * @param {string} cname cookie key
 * @param {string} cvalue cookie value
 * @param {number} exdays cookie validity time (in days)
 */
function setCookie(cname: string, cvalue: string, exdays: number): void {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

/**
 * The function takes in a cookie key
 * and returns the cookie value or an empty string
 * @param {string} cname the cookie key
 * @returns {string} the cookie value or an empty string
 */
function getCookie(cname: string): string {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


/*Cookies*/
enum CookieConsentStatus {
    granted = "GRANTED",
    denied = "DENIED"
}

/**
 * This utility functions tells if cookie consent has been granted
 * @returns {boolean} the consent status of cookie
 */
function getCookieConsent(): boolean {
    if(getCookie("cookieConsent") == CookieConsentStatus.granted)
        return true
    return false
}

/**
 * This utility function updates
 * the cookie consent status
 * @param {CookieConsentStatus} status possible values are granted or denied
 */
function setCookieConsent(status: CookieConsentStatus): void {
    setCookie("cookieConsent", status, 365)
}

function cookieBar(selector: string){
    if(getCookieConsent())
        return
    let cookieBar = document.querySelector<HTMLElement>(selector)
    if(cookieBar == null)
        throw "Couldn't find HTMLElement cookie bar"
    cookieBar.classList.add("active")
    let acceptButton = cookieBar.querySelector("#accept-all")
    if(acceptButton == null)
        throw "Couldn't find accept cookies button HTMLElement"
    acceptButton.addEventListener("click",evt => {
        setCookieConsent(CookieConsentStatus.granted)
        cookieBar?.classList.remove("active")
    })
}

cookieInit(cookieSnippetPath, "cookie-bar")