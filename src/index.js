import "@fortawesome/fontawesome-free/css/all.css";

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

  try {
    const resp = await fetch(
      `/.netlify/functions/add-contact?email=${email}&firstName=${firstName}&lastName=${lastName}&receiveEmails=${receiveEmails}&pilot=${pilot}&privacyTos=${privacyTos}`
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
  toggleModal();
});

function handleModalSetup() {
  // Allow escape key to close modal
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    let isEscape = false;
    if ("key" in evt) {
      isEscape = evt.key === "Escape" || evt.key === "Esc";
    } else {
      isEscape = evt.keyCode === 27;
    }
    if (isEscape && document.body.classList.contains("modal-active")) {
      toggleModal();
    }
  };

  // Allow elements with .modal-close class to close modal
  const closemodal = document.querySelectorAll(".modal-close");
  for (let i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener("click", toggleModal);
  }
}
function startFactFade() {
  const [fact1, fact2, fact3] = document.querySelectorAll("blockquote");
  const delayTime = 5000;
  const transitionTime = 700;

  setTimeout(() => {
    fact1.classList.add("opacity-0");
    fact2.classList.remove("opacity-0");
  }, delayTime);
  setTimeout(() => {
    fact2.classList.add("opacity-0");
    fact3.classList.remove("opacity-0");
  }, delayTime * 2 + transitionTime);
  setTimeout(() => {
    fact1.classList.remove("opacity-0");
    fact2.classList.remove("opacity-0");
  }, delayTime * 3 + 2 * transitionTime);
}

function toggleModal() {
  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");
  modal.classList.toggle("opacity-0");
  modal.classList.toggle("pointer-events-none");
  body.classList.toggle("modal-active");
}

startFactFade();
handleModalSetup();
