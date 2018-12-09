const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://web3.eu.auth0.com/.well-known/jwks.json`
    }),
    audience: "http://localhost:3030",
    issuer: `https://web3.eu.auth0.com/`,
    algorithms: ["RS256"]
});

const currentUser = (req, res, next) => {
    req.id_user = req.user.sub.split("|")[1];
    next();
}

exports.checkJwt = checkJwt;
exports.currentUser = currentUser;