const alertBox = document.querySelector("#success-alert");
const signUpForm = document.querySelector("#sign-up-form");
const testBtn = document.querySelector("#test-btn");

signUpForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const { elements } = signUpForm;
  const email = elements.email.value;
  const firstName = elements.firstName.value;
  const lastName = elements.lastName.value;
  const receiveEmails = elements.receiveEmails.checked;
  const pilot = elements.pilot.checked;
  const privacyTos = elements.privacyTos.checked;
  console.log(email, firstName, lastName, receiveEmails, pilot, privacyTos);

  try {
    const resp = await fetch(
      `/.netlify/functions/add-contact?email=${email}&firstName=${firstName}&lastName=${lastName}`
    );
    const data = await resp.json();
    console.log(data);
    alertBox.classList.remove("opacity-0");
    /* setTimeout(() => {
      alertBox.classList.add("hidden");
    }, 3000); */
  } catch (err) {
    console.log(err);
  }
});

testBtn.addEventListener("click", (evt) => {
  const { elements } = signUpForm;
  console.log(elements);
  console.log(elements.privacyTos.checked);
});
