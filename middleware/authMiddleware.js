const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return res.status(401).json({ 'message': 'The token is missing' })

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {

                if (err.name === 'TokenExpiredError') {
                    res.status(401).json({ 'message': 'Token is expired' });
                } else if (err.name === 'JsonWebTokenError') {
                    res.status(403).json({ 'message': 'Token is invlaid' });
                } else {
                    res.sendStatus(500)
                }
            } else {
                req.userId = decoded.userId;
                next();
            }
        }
    )

}

module.exports = authMiddleware;