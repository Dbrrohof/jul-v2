// Initialize Firebase
var config = {
    apiKey: "AIzaSyBAnks7FMf2TNQE8m7z_oh9Vs-mbs16Okw",
    authDomain: "julelodtraekning.firebaseapp.com",
    databaseURL: "https://julelodtraekning.firebaseio.com",
    projectId: "julelodtraekning",
    storageBucket: "julelodtraekning.appspot.com",
    messagingSenderId: "490164122312"
};
firebase.initializeApp(config);

// Call every int function



// Declarations+
var currentUser = localStorage.getItem("name");
var wishlists = firebase.database().ref('wishlists');

var userdb = firebase.database().ref("users");

// Main Functions

function checkLogin() {
    if (currentUser) {
        $('#greeting').html(`Hej, <span class="name">${currentUser}</span>`);
    } else {
        window.location = "login.html"
    }
}

function skammekrog() {
    userdb.orderByChild("nisse").equalTo(null).once('value').then(function(snapshot) {
        var skammekrog = snapshot.val();
        $('#spinner2').hide();
        for (var s in skammekrog) {
            $('#skammekrog').append( 
            `
            <div class="user-progress justify-center">
                <div class="col-sm-3 col-md-2" style="padding: 0;">
                    <img src="images/profile-pic2.png" alt="profile photo" class="circle profile-photo" style="width: 100%; max-width: 100px;">
                </div>
                
                <div class="col-sm-9 col-md-10">
                    <h6 class="pt-1">${s}</h6>
                </div>
            </div>
            `)
        }
    });
}

function logOut() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("pass");
    window.location = "login.html"
}
