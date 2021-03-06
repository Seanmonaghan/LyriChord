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
            fixLyrics = data.lyrics.replace('\n',' ')
            splitLyrics = fixLyrics.split('\n');
            
            
            for (i = 0; i < splitLyrics.length; i++) {
                let songLine = document.createElement("p");
                
                songLine.textContent = splitLyrics[i];
                lyricDiv.append(songLine);
        }
        });
};


function spotifyApi() {
    var accessToken = 'BQBhWgzWakFOLJXKvzhRnve7l_FQmLI8NU9dSb6VQu97Y-DJhGIbpJSwmaUnBb5GsDAyrr4NJn1Qyf107H6lANMOcSh0vM3Pzf4eD_MdPZpSLHLbwliaNs788cc_2Hplw_X6n-11lTQyiLpQDyLjawh9YFbtyhZYdJQpn31VLbo';

    // General Info
    // Client ID: a7a65bec8a33444b82e12002d1a69fc4
    // Client Secret: f09c1f92d65242519ba0bf1a0062883a
    // Encoded Redirect URI: https%3A%2F%2Fseanmonaghan.github.io%2FLyriChord%2F
    // Client ID : Client Secret 
    // a7a65bec8a33444b82e12002d1a69fc4:f09c1f92d65242519ba0bf1a0062883a
    // Base64 Encoded Client ID : Client Secret
    // YTdhNjViZWM4YTMzNDQ0YjgyZTEyMDAyZDFhNjlmYzQ6ZjA5YzFmOTJkNjUyNDI1MTliYTBiZjFhMDA2Mjg4M2E=

    // OAuth Token cURL command: curl -H "Authorization: Basic YTdhNjViZWM4YTMzNDQ0YjgyZTEyMDAyZDFhNjlmYzQ6ZjA5YzFmOTJkNjUyNDI1MTliYTBiZjFhMDA2Mjg4M2E=" -d grant_type=authorization_code -d code=AQBgEM8cCNsex4fbgtf1KPbyxklxpmbM3MSAqtRnGpRrUsd4PNB9UewvGZaJJ3txltcEiwyfG9PIrqsQBTJLxKkAABXzlla5Vhx3z8j2NMmWWPKvPJSMeDXXUknHZjbOKJsUjAhjufQ-SQxNd4Z5YVrpHCyKD6UXT2RyuGoEaGGnk_lk4ciEO0CLqmzW_Bjhf084kFm6jZJPf_aDh2Zii-M -d redirect_uri=https%3A%2F%2Fseanmonaghan.github.io%2FLyriChord%2F https://accounts.spotify.com/api/token

    // Use the access token to access the Spotify Web API
    $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function(response) {
            return response.json()
        }
        .then, function(data) {
            console.log(data);
        }
    });
}

function getChords(artistName, songName) {
    var songsterrURL = "https://www.songsterr.com/a/wa/bestMatchForQueryString?s=" + songName +"&a=" + artistName; 

    chordsButton.click(function() {
        window.location= songsterrURL;
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
        } $(".listItem").on("click", function(e) {
            
            window.location = this.val;
        });
    });
}

searchButton.click(function() {
    const artistInputValue = searchArtist.value;
    const songInputValue = searchSong.value;
    getLyrics(artistInputValue, songInputValue);
    spotifyApi();
    getChords(artistInputValue, songInputValue);
    createSuggestions(artistInputValue);
})

 
chordsButton.click(function() {
    const artistName = searchArtist.value;
    const songName = searchSong.value;
    var chordURL = "https://www.songsterr.com/a/wa/bestMatchForQueryString?s=" + songName +"&a=" + artistName; 
    window.location = chordURL;
})