// Declarations+
var currentUser = localStorage.getItem("name");




// Main Functions

function logOut() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("pass");
    window.location = "login.html"
}
