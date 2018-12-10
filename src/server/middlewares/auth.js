const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { jwks_uri, auth0_audience, auth0_issuer } = require("../config/vars");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: jwks_uri
  }),
  audience: auth0_audience,
  issuer: auth0_issuer,
  algorithms: ["RS256"]
});

const currentUser = (req, res, next) => {
  req.body.id_user = req.user.sub.split("|")[1];
  next();
};

exports.checkJwt = checkJwt;
exports.currentUser = currentUser;
