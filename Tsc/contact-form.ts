var form = document.getElementById("contact-form");


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
      window.location.href = "./confirmation.html";
    if(form != null)
        form.reset()
  }).catch(error => {
      console.log("Oops! There was a problem submitting your form");
  });
}

if(form != null)
    form.addEventListener("submit", handleSubmit);