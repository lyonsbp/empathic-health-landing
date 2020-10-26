const mailchimp = require("@mailchimp/mailchimp_marketing");
const crypto = require("crypto");

exports.handler = async function (evt) {
  const { email, refSource } = evt.queryStringParameters;
  const emailHash = crypto
    .createHash("md5")
    .update(email.toLowerCase())
    .digest("hex");

  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API,
    server: process.env.MAILCHIMP_DC,
  });

  try {
    const listId = process.env.MAILCHIMP_LIST_ID;
    const subscribingUser = {
      email,
      refSource,
    };

    const response = await mailchimp.lists.updateListMember(
      listId,
      emailHash,
      {
        merge_fields: { HOW: subscribingUser.refSource },
      },
      { skipMergeValidation: true }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: `Successfully updated contact ${subscribingUser.email}`,
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
