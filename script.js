lyricDiv = $("#lyricDiv");
searchButton = $("#searchButton");
chordsButton = $("#chordsButton");
suggestions = $("#suggestions");



function getLyrics(artistName, title) {
    var requestUrl = "https://api.lyrics.ovh/v1/" + artistName + "/" + title;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lyricDiv.empty()

            // console.log(data);
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
            Authorization: "Bearer BQB7fWmBS6VVoaR5On2QEdZiqnp-wIunELmXx6Q2wuz58PsBhURCJJhKu-36UAc8dbYXRCYxdkgjX7SOxgJE2EFnaWAPFbv6EEu5pA0PiuTyPD7tBmKUsIKraQMUHTgRylb-2CtgT3_cEIqGX0mzU1b8L589He3-iPPaohlCghg",
            "Content-Type": "application/json"
        }
        
        })
        .then(function (response) {
            return response.json();
    }).then(function (data) {
        console.log(data);
    })
};


function getChords(artistName, songName) {
    var songsterrURL = "https://www.songsterr.com/a/wa/bestMatchForQueryString?s=" + songName + "&a=" + artistName;

    chordsButton.click(function () {
        window.open(songsterrURL, "http://127.0.0.1:5500/index.html");
    });
}

function createSuggestions(artistName) {
    var testURL = "https://www.songsterr.com/a/ra/songs.json?pattern=" + artistName;

    fetch(testURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            suggestions.empty()
            // console.log(data);
            if (data.length > 5) {
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
            });
        });
}

searchButton.click(function () {
    const artistInputValue = searchArtist.value;
    const songInputValue = searchSong.value;
    getLyrics(artistInputValue, songInputValue);
    getChords(artistInputValue, songInputValue);
    createSuggestions(artistInputValue);
    getSpotifySong(songInputValue);
})


chordsButton.click(function () {
    const artistName = searchArtist.value;
    const songName = searchSong.value;
    let chordURL = "https://www.songsterr.com/a/wa/bestMatchForQueryString?s=" + songName + "&a=" + artistName;
    window.open(chordURL, "http://127.0.0.1:5500/index.html");
})