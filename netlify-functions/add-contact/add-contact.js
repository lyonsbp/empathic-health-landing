const mailchimp = require("@mailchimp/mailchimp_marketing");

exports.handler = async function (evt) {
  const {
    email,
    firstName,
    lastName,
    receiveEmails,
    privacyTos,
    pilot,
  } = evt.queryStringParameters;

  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API,
    server: process.env.MAILCHIMP_DC,
  });

  try {
    const listId = process.env.MAILCHIMP_LIST_ID;
    const subscribingUser = {
      firstName,
      lastName,
      email,
      receiveEmails,
      privacyTos,
      pilot,
    };

    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
        REMAILS: subscribingUser.receiveEmails,
        PILOT: subscribingUser.pilot,
        PRIVTOS: subscribingUser.privacyTos,
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
