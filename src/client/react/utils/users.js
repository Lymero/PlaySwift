function getUserProfile() {
    console.log("LOCAL LIB : " + localStorage.getItem("profile"));
    return localStorage.getItem("profile");
}

export default {
    getUserProfile: getUserProfile
};