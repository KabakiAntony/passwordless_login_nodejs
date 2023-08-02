const User = require('../models/Users');

const profilePage = async (req, res) => {
    const user_id = req.userId
    const foundUser = await User.findOne({ _id: user_id }).exec();


    res.render('profile', { title: "Homepage", email: foundUser.email })
}


module.exports = {
    profilePage,
}