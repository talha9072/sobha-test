import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function handler(event, context) {
  try {
    // Parse form data (agar koi payload bhej raha ho)
    const data = JSON.parse(event.body);

    const msg = {
      to: data.email || "test@example.com", // form se aaya email ya fallback
      from: "no-reply@yourdomain.com",     // SendGrid me verified sender
      subject: "Test from Netlify Function",
      text: "Testing works awesome 🎉",
      html: "<strong>Testing works awesome 🎉</strong>",
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
}
