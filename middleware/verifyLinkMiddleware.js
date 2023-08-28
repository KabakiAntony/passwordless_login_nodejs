const jwt = require('jsonwebtoken');

const verifyLinkMiddleware = (req, res, next) => {
    const magicToken = req.query.magic;
    if (!magicToken) return res.status(401).json({ 'message': 'The token is missing from the URL' })

    jwt.verify(
        magicToken,
        process.env.MAGIC_LINK_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {

                if (err.name === 'TokenExpiredError') {
                    // instead of showing this error redirect the user to the login page
                    // to request a new token
                    res.status(401).json({ 'message': 'Token is expired' });
                } else if (err.name === 'JsonWebTokenError') {
                    res.status(403).json({ 'message': 'Token is invalid' });
                } else {
                    res.sendStatus(500)
                }
            } else {
                // once magic link token is verified create an access token
                const accessToken = jwt.sign(
                    {
                        "userId": decoded.id
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1h' }
                );

                //set cookie to pass access token to other protected routes
                res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }
                )
                next();
            }
        }
    )

}

module.exports = verifyLinkMiddleware;