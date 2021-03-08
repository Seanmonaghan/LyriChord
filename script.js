var lyricDiv = $("#lyricDiv");
var searchButton = $("#searchButton");
var chordsButton = $("#chordsButton");
var suggestions = $("#suggestions");

// local Storage
let savedArtist = localStorage.getItem("savedArtist");
searchArtist.value = savedArtist;
let savedSong = localStorage.getItem("savedSong");
searchSong.value = savedSong;


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
                Authorization: "Bearer BQASO_PV0KKSw7e78tv_5WBUq7GuVW-JuwlU-3A4lpe1i7i0vtmkUutcPkT2aLm2dxUFy6wfNWnfaP_kHOTDPSVtF56tAnR0dMmBYJH_5E1BZxWXyxGbxxq9gRq2pb3QZSQGZFL3WbLBlri7o8vJRwNR3FFIz_Z1Xd2p339f75z2fA-lW5fHS4EAYOCwNKGHn7jvMelbA4apZcP8LVlR5JgLxCzVCXW6tqmnYKmaaHbFSXnelq-GN8ZrYP0j_wzDR2_cc9rWq9yLNxsYysnqGoc7",
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
                suggestionHeader.textContent = "Similar Chords";
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
    localStorage.setItem("savedArtist", searchArtist.value);
    localStorage.setItem("savedSong", searchSong.value);
    
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