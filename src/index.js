const alertBox = document.querySelector("#success-alert");
const signUpForm = document.querySelector("#sign-up-form");

signUpForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const email = document.querySelector("#email-input").value;
  const firstName = document.querySelector("#fname-input").value;
  const lastName = document.querySelector("#lname-input").value;

  try {
    const resp = await fetch(
      `/.netlify/functions/add-contact?email=${email}&firstName=${firstName}&lastName=${lastName}`
    );
    const data = await resp.json();
    console.log(data);
    alertBox.classList.remove("hidden");
    /* setTimeout(() => {
      alertBox.classList.add("hidden");
    }, 3000); */
  } catch (err) {
    console.log(err);
  }
});
