console.log("hello world");

document
  .querySelector("#sign-up-form")
  .addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const email = document.querySelector("#email-input").value;

    try {
      const resp = await fetch(
        `/.netlify/functions/add-contact?email=${email}`
      );
      const data = await resp.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  });
