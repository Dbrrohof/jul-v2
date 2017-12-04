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

var wishlists = firebase.database().ref('wishlists');

var wishlistsArray = [];
// get wishlists
wishlists.on('value', function(snapshot) {
    wishlistsArray = snapshot.val();
    getWishlists();
});

function getWishlists() {
    if (!$.isEmptyObject(wishlistsArray)) {
        let table = $('tbody');
        for (var key in wishlistsArray) {
            table.append(`
            <tr>
                <td>${key}</td>
                
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
    let file = document.getElementById("inputFile").files[0];
    let metadata = {
        contentType: file.type,
    };
    console.log(metadata);
}