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
var bucket = firebase.database().ref('hat').orderByValue().equalTo(0);
var bucketArray = [];
var usersLeft = [];

var currentUser = localStorage.getItem("name");

function getNisse() {
    firebase.database().ref('/users/' + currentUser + '/nisse').once('value').then(function(snapshot) {
        $('#spinner').hide();
        if (snapshot.val() == "none" || snapshot.val() == 0 || snapshot.val() == null) {
            $('.noNisse').show();
        } else {
            $('.noNisse').hide();
            $('.foundNisse').show();
            $('#foundNisse').html(snapshot.val())
        }
    });
}
getNisse();

function pickNisse(name) {
    $('.noNisse').addClass("animated fadeOut");
    setTimeout(function() {
        $('.noNisse').hide();
        $('.findNisse').show().addClass("animated fadeIn")
    }, 750)
    init(name);
}

var dictionary = "0123456789qwertyuiopasdfghjklzxcvbnm!?></\a`~+*=@#$%".split('');

var el = document.getElementById('codeReveal');

var ran = function() {
 return Math.floor(Math.random() * dictionary.length)
}

var ranString = function(amt) {
  var string = '';
  for(var i = 0; i < amt; i++) {
    string += dictionary[ran()];
  }
  return string;
}

var init = function(str) {
  var count = str.length;
  var delay = 50;
  
  el.innerHTML = '';
  
  var gen = setInterval(function() {
    el.setAttribute('data-before', ranString(count));
    el.setAttribute('data-after', ranString(count));
    if(delay > 0) {
      delay--;
    }
    else {
      if(count < str.length) {
        el.innerHTML += str[str.length - count-1];
      }
      count--;
      if(count === -1) {
        clearInterval(gen);
      }
    }
  }, 32);
}

function getAnswer() {
    bucket.once('value', function(snapshot) {
      bucketArray = Object.keys(snapshot.val());
      getAnswerReady();
    });
  }
  function getAnswerReady() {
    console.log(bucketArray);

    // loop over bucket to find a random nisse.
    let keys = Object.keys(bucketArray);
    let chosenNisse =  bucketArray[keys[ keys.length * Math.random() << 0]];
    console.log(chosenNisse)
    // Check if nisse result is you
    // console.log(chosenNisse, currentUser)
    if (chosenNisse === currentUser && keys.length > 1) {
        getAnswerReady();
        return;
    } else if (chosenNisse === currentUser && keys.length == 1) {
        console.log("Øv... Der er ikke flere navne i posen");
    }
    if (keys.length == 2) {
        // check if the two names in the hat exist in the usersLeft array, if so, asign the "double-person" to currentUser
        for (let i = 0; i < bucketArray.length; i++) {
        if (usersLeft[bucketArray[i]]) {
            // Make sure that the one picking a nisse, isn't the "double-person"
            if (bucketArray[i] != currentUser) {
            chosenNisse = bucketArray[i];
            }
        }
        }
    }

    // // Assign nisse to you
    firebase.database().ref('users/' + currentUser).update({ nisse: chosenNisse });
    pickNisse(chosenNisse);

    // Remove nisse from bucket
    firebase.database().ref('hat/').update({ [chosenNisse]: 1});
  }
  