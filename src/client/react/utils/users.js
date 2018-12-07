let jsonwebtoken = require("jsonwebtoken");

function getUserProfile() {
    let profile = jsonwebtoken.decode(localStorage.getItem("profile"));
    console.log("User profile : " + profile.name);
    return profile;
}

export default {
    getUserProfile: getUserProfile
};