const fetch = require("node-fetch");
const mailchimp = require("@mailchimp/mailchimp_marketing");

exports.handler = async function () {
  try {
    const authenticationString = `Basic ${process.env.MAILCHIMP_API}`;
    const baseUrl = `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0`;
    const response = await fetch(`${baseUrl}/ping`, {
      mode: "no-cors",
      headers: {
        authorization: authenticationString,
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data }),
    };
  } catch (error) {
    console.log(error); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
