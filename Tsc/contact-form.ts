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

