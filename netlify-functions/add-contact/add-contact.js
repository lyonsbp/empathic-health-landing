const mailchimp = require("@mailchimp/mailchimp_marketing");

exports.handler = async function (evt) {
  const email = evt.queryStringParameters.email;
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API,
    server: process.env.MAILCHIMP_DC,
  });

  try {
    const listId = process.env.MAILCHIMP_LIST_ID;
    const subscribingUser = {
      firstName: "Test",
      lastName: "Name",
      email: email,
    };

    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: `Successfully added contact ${subscribingUser.email}`,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err }),
    };
  }
};
