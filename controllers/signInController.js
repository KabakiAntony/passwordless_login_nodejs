const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendEmail');

const signInPage = (req, res) => {
    res.render('signin', { title: "Sign In" })
}

const signInUser = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ 'message': 'Email is required' });

    //check if user is already registered
    const foundUser = await User.findOne({ email: email }).exec();

    // handle this better to deal with email enumeration
    // hackers trying to find out what emails exist in your application
    if (!foundUser) return res.sendStatus(401);

    const magicLinkToken = jwt.sign(
        {
            "id": foundUser._id
        },
        process.env.MAGIC_LINK_TOKEN_SECRET,
        { expiresIn: '5m' }
    )

    // send an email with the token as part of the verification url
    const link = `http://127.0.0.1:3500/verify?magic=${magicLinkToken}`;
    let recipient = email;
    let sender = process.env.SENDGRID_ADMIN_EMAIL;
    let subject = 'Your Magic Link is Here – Instant Access to Your Account!';
    let plain_text = "Some text";
    let html_content = `
    <p>Hello there,</p>

    <p>Click on the link below to access your account.</p>

    <a href=${link}>Log In</a>


    <p>Cheers,</p>
    <p>The PassLess Team</p>
    `
    sendMail(recipient, sender, subject, plain_text, html_content);

    res.status(200).json({ 'message': 'If an account with that email address was found, you will receive a magic link shortly' })
}

module.exports = {
    signInPage,
    signInUser
}