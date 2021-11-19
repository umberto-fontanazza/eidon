var form: any = document.getElementById("contact-form");


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
      console.log("Form submitted successfully");
      /**
       * @todo replace the form with a confirmation message
       */
      //window.location.href = "./Pages/confirmation.html";
    if(form != null)
        form.reset()
  }).catch(error => {
      console.log("Oops! There was a problem submitting your form");
  });
}

if(form != null)
    form.addEventListener("submit", handleSubmit);

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

    fetch(path)
        .then((response: Response) => response.text())
        .then((data: string) => {

    });
}

//replaceNode('form','./Snippets/confirmation.html');
