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
    var requestURL = "https://api.spotify.com/v1/search?=" + song + "&type=track"

    $.ajax({
        url: requestURL,
        method: "GET",
        dataType: "json",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json",
            'Authorization': "Bearer BQDPkZpfw_ceXcM9DwFxYmJVuNfVoEeKO7YQv2_Ugfz_k6NlEaPhfEemBRW9g2GmASju4xdIwhg8HhQBFZGd_9rzUXEampk9xAlwn-y6QUclKQvx1QaIkQuihk2ha6kleyFjq85iHOTqKRJpz9spQvocs_lo1VeQZ_dwPuK2LU8"
        },
        success: function (response) {
                return response.json()
            }
            .then,
        function (data) {
            console.log(data);
        }
    });
};


    // fetch(requestURL, {

    //     '-H' : {
    //         'Accept': "application/json",
    //         'Content-Type': "application/json",
    //         'Authorization': "Bearer BQDPkZpfw_ceXcM9DwFxYmJVuNfVoEeKO7YQv2_Ugfz_k6NlEaPhfEemBRW9g2GmASju4xdIwhg8HhQBFZGd_9rzUXEampk9xAlwn-y6QUclKQvx1QaIkQuihk2ha6kleyFjq85iHOTqKRJpz9spQvocs_lo1VeQZ_dwPuK2LU8"
    //     }

    // })
    // .then(function(data) {
    //     console.log(data)
    // })



// function spotifyApi() {

//     window.onSpotifyWebPlaybackSDKReady = () => {
//         const token = 'a7a65bec8a33444b82e12002d1a69fc4';
//         const player = new Spotify.Player({
//           name: 'Web Playback SDK Quick Start Player',
//           getOAuthToken: cb => { cb(token); }
//         });

//         // Error handling
//         player.addListener('initialization_error', ({ message }) => { console.error(message); });
//         player.addListener('authentication_error', ({ message }) => { console.error(message); });
//         player.addListener('account_error', ({ message }) => { console.error(message); });
//         player.addListener('playback_error', ({ message }) => { console.error(message); });

//         // Playback status updates
//         player.addListener('player_state_changed', state => { console.log(state); });

//         // Ready
//         player.addListener('ready', ({ device_id }) => {
//           console.log('Ready with Device ID', device_id);
//         });

//         // Not Ready
//         player.addListener('not_ready', ({ device_id }) => {
//           console.log('Device ID has gone offline', device_id);
//         });

//         // Connect to the player!
//         player.connect();
//       };

// }

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
    var chordURL = "https://www.songsterr.com/a/wa/bestMatchForQueryString?s=" + songName + "&a=" + artistName;
    window.open(chordURL, "http://127.0.0.1:5500/index.html");
})