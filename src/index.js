console.log("hello world");
const MailchimpApiKey = process.env.MAILCHIMP_API;
const MailchimpDc = process.env.MAILCHIMP_DC;

async function ping() {
  const resp = await fetch(
    `https://${MailchimpDc}.api.mailchimp.com/3.0/ping`,
    {
      mode: "no-cors",
      headers: {
        authorization: btoa(`user:${MailchimpApiKey}`),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
}

ping();
