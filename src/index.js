document
  .querySelector("#sign-up-form")
  .addEventListener("submit", async (evt) => {
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
      alert(data.msg);
    } catch (err) {
      console.log(err);
    }
  });
