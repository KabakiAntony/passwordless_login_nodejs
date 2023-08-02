const client = require('@sendgrid/mail');
client.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (recipient, sender, subject, plain_text, html_content) => {

    const message = {
        to: recipient,
        from: sender,
        subject: subject,
        text: plain_text,
        html: html_content
    };

    try {
        await client.send(message);
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = sendMail;