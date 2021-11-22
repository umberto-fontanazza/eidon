var form: any = document.getElementById("contact-form");

/**
 * This function replaces the content of a div
 * identified by the first parameter which is a CSS selector
 * with the content from an html file identified by the path
 * given by the second parameter string
 * @param {string} selector - CSS selector used to identify the div to be replaced
 * @param {string} path - path of the html file
 * @returns {void}
 *
 * @todo develop function
 */
function replaceNode(selector: string, path: string): void {
    //searching the DOM for the element to replce
    let query = document.querySelector<HTMLElement>(selector);
    if(query == null)
        throw new Error("querySelector() failed to find any HTMLElement corresponding to CSS selector: " + selector);
    let element: HTMLElement = query;
    let newElement: HTMLElement = document.createElement('div');

    //creating the new node from another file
    fetch(path)
        .then((response: Response) => response.text())
        .then((data: string) => {
            newElement.innerHTML = data;
    });

    //cloning element classList to newElement classList
    element.classList.forEach((cls: string)=>newElement.classList.add(cls))

    element.insertAdjacentElement('afterend',newElement); //inserting new node
    element.parentElement?.removeChild(element); //removing old node

    //inserting HTML comment to explain the origin of the new HTMLElement
    let comment: Comment = document.createComment("HTML injected by function replaceNode()");
    newElement.parentElement?.insertBefore(comment,newElement);
}

/**
 * Handles the submission of a form
 * @param event
 * @returns {void}
 */
async function handleSubmit(event: any) {
    if(form == null)
        return;
  event.preventDefault();
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
      replaceNode(".form-container","./Snippets/confirmation.html");
      console.log("Form submitted successfully");
    if(form != null)
        form.reset()
  }).catch(error => {
      console.log("Oops! There was a problem submitting your form");
  });
}

if(form != null)
    form.addEventListener("submit", handleSubmit);


/**
 * This function adds to all the element matching
 * the selector the className specified in the second
 * parameter if the element is in view
 * @param {string} selector CSS selector
 * @param {string} className class name to be added
 */
function addClassInView(selector: string, className: string): void {
    let elements = document.querySelectorAll(selector)
    if(elements.length == 0)
        throw "No element with "+className+" className found"
    elements.forEach(elem => {
        if(isInView(elem))
            elem.classList.add(className)
    })
}
addClassInView(".animated", "animation-ended")

/**
 * This function tells if the element passed
 * as argument is within the viewport
 * @param {Element} element the element to bechecked
 * @returns {boolean} yes or no
 */
function isInView(element: Element): boolean {
    let rect: DOMRect = element.getBoundingClientRect();
    //check x
    if( rect.right < 0 )
        return false
    if( rect.left > window.innerWidth )
        return false
    //check y
    if( rect.bottom < 0 )
        return false
    if( rect.top > window.innerHeight )
        return false
    return true
}

window.addEventListener("scroll",evt => {
    addClassInView(".animated","animation-ended");
})

