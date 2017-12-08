// Declarations+
var currentUser = localStorage.getItem("name");

function checkLogin() {
    if (currentUser) {
        $('#userName').html(`<span class="name">${currentUser}</span>`);
    } else {
        window.location = "login.html"
    }
}


// Main Functions

function logOut() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("pass");
    window.location = "login.html"
}
