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

var users = firebase.database().ref('users');


function login() {

    let name = $('#inputName').val();
    let pass = $('#inputPassword').val();

    return firebase.database().ref('/users/' + name).once('value').then(function(snapshot) {
    if (snapshot.val()) {
        if (pass == snapshot.val().password) {
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("name", name);
            localStorage.setItem("pass", pass);
            window.location = "/";
        } else {
            document.getElementById('error').style.display = "block";
        }
    } else {
        document.getElementById('error').style.display = "block";
    }
});

}