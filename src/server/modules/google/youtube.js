const fs = require("fs");
const readline = require("readline");
const logger = require("../logger").logger;
const { google } = require("googleapis");
const googleAuth = require("google-auth-library");
const {
  oauth_tdir,
  oauth_tpath,
  oauth_secret_fpath,
  api_key
} = require("../../config/vars");

const SCOPES = ["https://www.googleapis.com/auth/youtube.force-ssl"];
const TOKEN_PATH = oauth_tdir + oauth_tpath;

function getYoutubeVideoId(url) {
  return url.split("=")[1];
}

async function getYoutubeVideo(url, bubbleResponse) {
  logger.info("Fetching url = " + url);
  const _id = getYoutubeVideoId(url);
  fs.readFile(oauth_secret_fpath, function processClientSecrets(err, content) {
    if (err) {
      logger.error("Error loading client secret file: " + err);
      return;
    }
    authorize(
      JSON.parse(content),
      {
        params: { id: _id, part: "snippet,contentDetails,statistics" }
      },
      videosListById,
      bubbleResponse
    );
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, requestData, callback, bubbleResponse) {
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  let oauth2Client = new googleAuth.OAuth2Client(
    clientId,
    clientSecret,
    redirectUrl
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, requestData, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client, requestData, bubbleResponse);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, requestData, callback) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  logger.info("Authorize this app by visiting this url: ", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        logger.error("Error while trying to retrieve access token", err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client, requestData);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(oauth_tdir);
  } catch (err) {
    if (err.code != "EEXIST") {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  logger.info("Token stored to " + TOKEN_PATH);
}

/**
 * Remove parameters that do not have values.
 *
 * @param {Object} params A list of key-value pairs representing request
 *                        parameters and their values.
 * @return {Object} The params object minus parameters with no values set.
 */
function removeEmptyParameters(params) {
  for (var p in params) {
    if (!params[p] || params[p] == "undefined") {
      delete params[p];
    }
  }
  return params;
}

async function videosListById(auth, requestData, bubbleResponse) {
  const service = google.youtube({
    version: "v3",
    auth: api_key
  });
  let parameters = removeEmptyParameters(requestData["params"]);
  parameters["auth"] = auth;
  const response = await service.videos.list(parameters);
  bubbleResponse(response.data.items);
}

exports.getYoutubeVideo = getYoutubeVideo;
