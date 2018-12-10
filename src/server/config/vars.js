const path = require("path");

require("dotenv-safe").load({
  path: path.join(__dirname, "../../../.env")
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  db_port: process.env.DB_PORT,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  api_key: process.env.API_KEY,
  oauth_secret_fpath: process.env.OAUTH_SECRET_FPATH,
  oauth_tpath: process.env.OAUTH_TPATH,
  oauth_tdir: process.env.OAUTH_TDIR,
  jwks_uri: process.env.JWKS_URI,
  auth0_issuer: process.env.AUTH0_ISSUER,
  auth0_audience: process.env.AUTH0_AUDIENCE,
  logs:
    process.env.NODE_ENV === "production"
      ? path.join(__dirname, "../logs/combined")
      : path.join(__dirname, "../logs/dev")
};
