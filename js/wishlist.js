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

var currentUser = localStorage.getItem("name");
var wishlists = firebase.database().ref('wishlists');
var userdb = firebase.database().ref("users");

var wishlistsArray = [];
// get wishlists
wishlists.on('value', function(snapshot) {
    wishlistsArray = snapshot.val();
    getWishlists();
});

function getWishlists() {
    if (!$.isEmptyObject(wishlistsArray)) {
        let table = $('tbody');
        table.html("");
        for (var key in wishlistsArray) {
            table.append(`
            <tr>
                <td class="nameCap">${key}</td>
                
                <td>
                    <a class="btn btn-primary btn-sm" href="${wishlistsArray[key].downloadurl}" role="button" target="_blank">Download</a>
                </td>
            </tr>	
            `);
        }
        $('#spinner').hide();
    }
}

function upload() {
    // GET FILE
    let file = document.getElementById("inputFile").files[0];
    let metadata = {
        contentType: file.type,
    };

    // Create a storage ref
    let storageRef = firebase.storage().ref('wishlists/' + currentUser)

    // Upload file
    var task = storageRef.put(file);

    // Confirmation to user
    task.on('state_changed', 
    
        function (snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log(percentage);
            let progress = $('#progress');
            progress.html(percentage + '%');
            progress.attr("aria-valuenow", percentage);
            progress.width(percentage + '%');
        },
        function(err) {
            
        },
        function() {
            let downloadurl = task.snapshot.downloadURL;
            firebase.database().ref('wishlists/' + currentUser).update({
            downloadurl
            });
        }    

    );
}

function saveLink() {
    let link = document.getElementById('wishlistUrl').value;
    
    if (link == "") {
    console.log('err')
    }
    else {
        firebase.database().ref('wishlists/' + currentUser).update({
            downloadurl: link
        }, function() {
            // callback
            document.getElementById('wishlistUrl').value = "";
            $('#saveLinkBtn').addClass( "confirmUpload" ).html("&nbsp;")
            setTimeout(function() {
                $('#saveLinkBtn').html('<div class="animated jackInTheBox">✔️</div>')
            }, 1000);
            setTimeout(function() {
                $('#saveLinkBtn').removeClass("confirmUpload")
                setTimeout(function() {
                    $('#saveLinkBtn').html('Gem link')
                }, 1000);
            }, 4000);
        });
        // console.log('updated')
    }
}