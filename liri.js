
require("dotenv").config();

var command = process.argv[2];
var searchTerm = process.argv[3];
var divider = "\n--------------------------------------------------";
var keys = require("./keys.js");
var moment = require('moment');
var fs = require('fs');


//var spotify = new Spotify(keys.spotify);

// `concert-this` <artist/band name here>`

var axios = require("axios");

// Then run a request with axios to the OMDB API with the movie specified
function searchConcert() {
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
        function (response) {
            var concert = response.data[0];
            var dateTime = JSON.stringify(concert.datetime);
            console.log(divider);
            console.log("\nVenue Name: " + JSON.stringify(concert.venue.name));
            console.log("\nVenue Location: " + JSON.stringify(concert.venue.city) + ',' + JSON.stringify(concert.venue.country));
            console.log("\nEvent Date: " + moment(dateTime,"YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY"));
            console.log(divider);
            //log();
        }
    );
};
// Name of the venue
// Venue location
//Date of the Event (use moment to format this as "MM/DD/YYYY")

//`spotify-this-song`  '<song name here>'`

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "c31ca9f8a94645e091a042049ba8f2ac",
    secret: "b4d87549dadf49a3a08e7587973d7424",
});

function searchSong(searchTerm) {
    spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(divider);
        console.log("Artist(s): " + JSON.stringify(data.tracks.items[0].artists[0].name));
        console.log("Song's Name: " + data.tracks.items[0].name);
        console.log("Preview link: " + data.tracks.items[0].preview_url);
        console.log("The album title: " + data.tracks.items[0].album.name)
        console.log(divider);
        //log(data.tracks.items[0].artists[0].name);

    });

    };

    //`movie-this`'<movie name here>'`

    // Then run a request with axios to the OMDB API with the movie specified
    function searchMovie() {
        axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                var movie = response.data;
                console.log(divider);
                console.log("\nTitle: " + movie.Title);
                console.log("\nYear: " + movie.Year);
                console.log("\nIMDB Rating: " + movie.imdbRating);
                if (JSON.stringify(movie.Ratings[1].source) == "Rotten Tomatoes"){
                    console.log("\nRotten Tomatoes Rating: " + JSON.stringify(movie.Ratings[1].Value))
                }else if(JSON.stringify(movie.Ratings[2].source) == "Rotten Tomatoes"){
                    console.log("\nRotten Tomatoes Rating: " + JSON.stringify(movie.Ratings[2].Value))
                }else if(JSON.stringify(movie.Ratings[1].source) !== "Rotten Tomatoes" + JSON.stringify(movie.Ratings[2].source) !== "Rotten Tomatoes"){
                    console.log("\nRotten Tomatoes Rating not available")
                };
                console.log("\nCountry produced: " + movie.Country);
                console.log("\nLaunguage: " + movie.Language);
                console.log("\nPlot: " + movie.Plot);
                console.log("\nActors: " + movie.Actors);
                console.log(divider);
                //log();
            }
        );
    };

    //`do-what-it-says`

    function doThis(){
        fs.readFile('random.txt', 'utf8', function(err, data) {  
        if (err) throw err;
        var output =data.split(","); 
        command = output[0];
        searchTerm = output[1];
        if (command == "concert-this") {
            searchConcert(searchTerm);
        }else if(command == "spotify-this-song"){
            searchSong(searchTerm);
        }else if(command == "movie-this"){
            searchMovie(searchTerm);
        };
        });
    };

    function log(){
        fs.writeFile("log.txt", response, function(err) {
            // If the code experiences any errors it will log the error to the console.
            if (err) {
              return console.log(err);
            }
            // Otherwise, it will print: "movies.txt was updated!"
            console.log("log.txt was updated!");
          });
    };
    
    switch (command) {
        case "concert-this":
            if (searchTerm == "") {
                searchTerm = "Bruno Mars";
            }
            searchConcert(searchTerm);
            break;
        case "spotify-this-song":
            if (searchTerm == "") {
                searchTerm = "The Sign";
            }
            searchSong(searchTerm);
            break;
        case "movie-this":
            if (searchTerm == "") {
                searchTerm = "Mr. Nobody";
            }
            searchMovie(searchTerm);
            break;
        case "do-what-it-says":
            doThis();
            break;
        default:
            searchSong("Bohemian Rhapsody");
        //console.log("Please enter show or actor");
    }