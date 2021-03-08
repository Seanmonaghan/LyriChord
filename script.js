var lyricDiv = $("#lyricDiv");
var searchButton = $("#searchButton");
var chordsButton = $("#chordsButton");
var suggestions = $("#suggestions");



function getLyrics(artistName, title) {
    var requestUrl = "https://api.lyrics.ovh/v1/" + artistName + "/" + title;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lyricDiv.empty()
            fixLyrics = data.lyrics.replace('\n', ' ')
            splitLyrics = fixLyrics.split('\n');

            for (i = 0; i < splitLyrics.length; i++) {
                let songLine = document.createElement("p");
                songLine.textContent = splitLyrics[i];
                lyricDiv.append(songLine);
            }
        });
};

function getSpotifySong(song) {
    var requestURL = "https://api.spotify.com/v1/search?q=" + song + "&type=track"

    fetch(requestURL, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer BQC_wRfDZoI-S411BYB-bHWClKfHbXLyCKUxN_lSiZzpSXwZZvR8_bSbQfwf6GudKf3DbvaeD3ZP-g85Au8BoJQ3kNHhIL3g5wFS30tvu-G_X4p_lyetcCjWTLwR_8Sx1G6eTmxFzOJjL9RxR1KHhI6kLkpI5DazDYGxMbrzKsV42O_oJxfm7ChGXd8cmL82OvqY2N-7Ztju0XCKYZiCEeeZAC0cvBjH0-HHXM6ne3u918my8D9p_56GxYYc0Y-CRYIeBSFyDG5Y5YNIrHK-yErh",
                "Content-Type": "application/json"
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
                console.log(data);
                console.log(data.tracks.items[0].external_urls.spotify);
                window.open(data.tracks.items[0].external_urls.spotify, "http://127.0.0.1:5500/index.html");
        })  
}

function createSuggestions(artistName) {
    var songsterrURL = "https://www.songsterr.com/a/ra/songs.json?pattern=" + artistName;

    fetch(songsterrURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            suggestions.empty()
            // console.log(data);
            if (data.length > 5) {
                var suggestionHeader = document.createElement("h2");
                suggestionHeader.textContent = "Similar Chords"
                $("#suggestionHeader").prepend(suggestionHeader);
                for (i = 0; i < 10; i++) {
                    var listItem = document.createElement('li');
                    listItem.classList.add('listItem');
                    listItem.href = "http://www.songsterr.com/a/wa/song?id=" + data[i].id;
                    listItem.val = "http://www.songsterr.com/a/wa/song?id=" + data[i].id;
                    listItem.textContent = data[i].artist.name + "  -  " + data[i].title;
                    suggestions.append(listItem);
                }
            }
            $(".listItem").on("click", function (e) {

                window.open(this.val, "http://127.0.0.1:5500/index.html");
            })
        })
}

searchButton.click(function () {
    const artistInputValue = searchArtist.value;
    const songInputValue = searchSong.value;
    getLyrics(artistInputValue, songInputValue);
    createSuggestions(artistInputValue);
})


chordsButton.click(function () {
    const artistName = searchArtist.value;
    const songName = searchSong.value;
    let chordURL = "https://www.songsterr.com/a/wa/bestMatchForQueryString?s=" + songName + "&a=" + artistName;
    window.open(chordURL, "http://127.0.0.1:5500/index.html");
})

$("#spotifyButton").on('click', function () {
    console.log("Hello");
    const songInputValue = searchSong.value;
    getSpotifySong(songInputValue);
})