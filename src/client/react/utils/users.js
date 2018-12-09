let jsonwebtoken = require("jsonwebtoken");

function getUserProfile() {
    let profileToken = localStorage.getItem("profile");
    if (profileToken === null)
        throw "No user profile found in LocalStorage";
    let profile = jsonwebtoken.decode();
    return profile;
}

function getUserId() {
    return getUserProfile().sub.split('|')[1];
}

export default {
    getUserProfile: getUserProfile,
    getUserId: getUserId
};