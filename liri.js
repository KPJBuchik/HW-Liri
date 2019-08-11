require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios=require("axios");
var Spotify = require("node-spotify-api")
var userCommand= process.argv[2];
var userSearch= process.argv[3];
//var userSearch = process.argv.slice(2).join(" ");


if (userCommand==="movie-this"){
    movieData(userSearch);
}


if (userCommand==="concert-this"){
    bandsData(userSearch)
}



if (userCommand==="spotify-this-song"){
    spotifyData(userSearch)
}


if (userCommand==="do-what-it-says"){}


function movieData (userSearch){
    axios.get("http://www.omdbapi.com/?t="+userSearch+ "&y=&plot=short&apikey=trilogy").then(
        function(response){
            if (userSearch === undefined){
                userSearch = "Mr. Nobody"
                console.log("+><++><++><++><++><++><++><++><++><++><++><++><+");

            }else {
                console.log("+><++><++><++><++><++><+MOVIES+><++><++><++><++><++><+")
                console.log("Title: " + response.data.Title);
                console.log("Released: "+response.data.Year);
                console.log("IMDB Rating:  " +response.data.imdbRating);
              //  console.log("Rotten Tomatoes: ")
               console.log("Plot: "+ response.data.Plot);
               console.log("Cast: "+ response.data.Actors);
               console.log("language: "+response.data.Language);
               console.log("country: " +response.data.Country);
               console.log("+><++><++><++><++><++><+MOVIES+><++><++><++><++><++><+")
                //console.log()
            }


})


}


function bandsData (userSearch){
    axios.get("https://rest.bandsintown.com/artists/" + userSearch + "\/events?app_id=codingbootcamp").then(
        function(response){
            for (var i = 0; i < 10; i++) 
             console.log(response)

})

}
