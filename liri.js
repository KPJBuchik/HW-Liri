require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var moment = require("moment")

var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var userCommand = process.argv[2];
var userSearch = process.argv.slice(3).join("+")
//var userSearch = process.argv.slice(2).join(" ");

if (userCommand === "movie-this") {
    movieData(userSearch);
}


if (userCommand === "concert-this") {
    bandsData(userSearch)
}



if (userCommand === "spotify-this-song") {
    spotifyData(userSearch)
}


if (userCommand === "do-what-it-says") {
    doWhatItSays()
}


function movieData(userSearch) {
    axios.get("http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            if (userSearch === undefined) {
                userSearch = "Mr. Nobody"
                console.log("+><++><++><++><++><++><++><++><++><++><++><++><+");

            } else {
                console.log("+><++><++><++><++><++><+MOVIES+><++><++><++><++><++><+")
                console.log("Title: " + response.data.Title);
                console.log("Released: " + response.data.Year);
                console.log("IMDB Rating:  " + response.data.imdbRating);
                console.log("Rotten Tomatoes: " + JSON.stringify(response.data.Ratings[1]))
                console.log("Plot: " + response.data.Plot);
                console.log("Cast: " + response.data.Actors);
                console.log("language: " + response.data.Language);
                console.log("country: " + response.data.Country);
                console.log("+><++><++><++><++><++><+MOVIES+><++><++><++><++><++><+")
                //console.log()
            }


        })


}


function bandsData(userSearch) {
    axios.get("https://rest.bandsintown.com/artists/" + userSearch + "\/events?app_id=codingbootcamp").then(
        function (response) {

            for (var i = 0; i < response.data.length; i++) {
                console.log(">+<>+<)>+<)>+<)CONCERTS>+<)>+<)>+<)>+<)>+<)")
                console.log("Venue: " + response.data[i].venue.name)
                console.log("Location: " + response.data[i].venue.city)
                console.log("Date: " +response.data[i].datetime)
               // moment(datetime).format("MM/DD/YYYY")

            }
        })

}

function spotifyData(userSearch) {
    if (userSearch === undefined) {
        userSearch = "The Sign";
    }
    spotify.search({ type: "track", query: userSearch },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log("=+=+=+=+=+SONGS+=+=+=+=+=+==")
                console.log("Artist: " + data.tracks.items[i].artists[i].name)
                console.log("Song: " + data.tracks.items[i].name)
                console.log("Song Preview: " + data.tracks.items[i].preview_url)
                console.log("Album: " + data.tracks.items[i].album.name)
            }

}
//aghhhhh
function doWhatItSays() {
    fs.readFile('random.txt', "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        else
            var randomArray = data.split(',')
        userCommand = randomArray[0]
        userSearch = randomArray[1]
        spotifyData(userSearch)

    });
}