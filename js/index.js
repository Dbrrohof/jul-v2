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

var userdb = firebase.database().ref("users");

function skammekrog() {
    userdb.orderByChild("nisse").equalTo(null).once('value').then(function(snapshot) {
        var skammekrog = snapshot.val();
        $('#spinner2').hide();
        if (snapshot.val() == null) $('#skammekrog').append(`
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        <h4 class="text-center">Alle brugere har trukket!</h4>
        `);
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

function checkLogin2() {
    if (currentUser) {
        $('#greeting').html(`Hej, <span class="name">${currentUser}</span>`);
        $('#userName').html(`<span class="name">${currentUser}</span>`);
        getNisse();
    } else {
        window.location = "login.html"
    }
}

function getNisse() {
    firebase.database().ref('/users/' + currentUser + '/nisse').once('value').then(function(snapshot) {
        $('#spinner').hide();
        if (snapshot.val() == "none" || snapshot.val() == 0 || snapshot.val() == null) {
            $('#error').show();
        } else {
            $('#status').append(`
            <p class="lead text-center">
                Du er nisse for
            </p>
            <h1 class="display-3 text-center nisseName">${snapshot.val()}</h1>
            `)
        }
    });
  }

  $('#clock').countdown('2017/12/16 17:00:00', function(event) {
    $(this).html(event.strftime(`
    <div class="row text-center pt-2">
        <div class="col-md-3 col-sm-3 col-3">
            <p><span class="countdownObj">%D</span></p>
            <span>Dage</span>
        </div>
        <div class="col-md-3 col-sm-3 col-3">
            <p><span class="countdownObj">%H</span></p>
            <span>Timer</span>
        </div>
        <div class="col-md-3 col-sm-3 col-3">
            <p><span class="countdownObj">%M</span></p>
            <span>Minutter</span>
        </div>
        <div class="col-md-3 col-sm-3 col-3">
            <p><span class="countdownObj">%S</span></p>
            <span>Sekunder</span>
        </div>
    </div>
    `));
  });