const jwt = require('jsonwebtoken');


class AuthorizationError extends Error {
    constructor(message) {
        super(message)
        this.name = 'AuthorizationError';
    }
}

class Authenticated {
    constructor(user, message) {
        this.user = user;
        this.message = message;
        this.isAuth = (this.user) ? true : false;
        this.code = (this.isAuth) ? 200 : 404;
        // this.pubsub = pubsub;
    }
}

module.exports = ({ req, res }) => {
    try {
        const authHeader = req.get('Authorization') // || process.env.DEV_TOKEN;
        if (!authHeader) {
            throw new AuthorizationError('Authorization header not privided');
        }

        const token = authHeader.split(' ')[1];
        if (!token || token === '') {
            throw new AuthorizationError('Authorization token not privided');
        }
        let decodedToken;
        decodedToken = jwt.verify(token, 'somesupersecretkey');

        if (!decodedToken) {
            throw new AuthorizationError('Authorization token verification failed')
        }

        return new Authenticated(decodedToken, 'Authorization success')
    } catch (error) {
        return new Authenticated(null, error.message);
    }

}

// try {
//     const token =
//         req.body.token || req.query.token || req.headers["x-access-token"];
//     if (!token) {
//         return res.status(403).send("A token is required for authentication");
//     }
//     const decoded = jwt.verify(token, 'secret');
//     req.user = decoded;
// } catch (err) {
//     console.log(err);
//     return res.status(401).send("Invalid Token");
// }
// return next();