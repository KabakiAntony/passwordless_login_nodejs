const User = require('../models/Users');


const signUpPage = (req, res) => {
    res.render('signup', { title: "Sign Up" })
}

const signUpNewUser = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ 'message': 'Email is required' });

    // check for duplicate email in mongo
    const duplicate_email = await User.findOne({ email: email }).exec();

    if (duplicate_email) return res.sendStatus(409);

    try {
        const result = await User.create({
            "email": email
        })
        res.status(201).json({ 'success': `New user with email ${email} has been registered.` });

    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = {
    signUpPage,
    signUpNewUser
}