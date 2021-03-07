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

    // General Info
    // Client ID: a7a65bec8a33444b82e12002d1a69fc4
    // Client Secret: f09c1f92d65242519ba0bf1a0062883a
    // Encoded Redirect URI: https%3A%2F%2Fseanmonaghan.github.io%2FLyriChord%2F
    // Client ID : Client Secret 
    // a7a65bec8a33444b82e12002d1a69fc4:f09c1f92d65242519ba0bf1a0062883a
    // Base64 Encoded Client ID : Client Secret
    // YTdhNjViZWM4YTMzNDQ0YjgyZTEyMDAyZDFhNjlmYzQ6ZjA5YzFmOTJkNjUyNDI1MTliYTBiZjFhMDA2Mjg4M2E=

    // OAuth Token cURL command: curl -H "Authorization: Basic YTdhNjViZWM4YTMzNDQ0YjgyZTEyMDAyZDFhNjlmYzQ6ZjA5YzFmOTJkNjUyNDI1MTliYTBiZjFhMDA2Mjg4M2E=" -d grant_type=authorization_code -d code=AQD9UkWtUnSOZTDzTZa62JVeTXolMjfPjcCMhS0X8S_SiUEJaDr0Iul9wnfg3aHOWSmgq6tQUd-CQHEqx0_Ktx9vVypaSl0tlzDncVWgdkUj7ClzbdcnIESK6aOf5FZf2BE9cvsu0NPU1q3HrsSMfo-Rakp0SGwaN30woGJfMqFCN12VPsOJRkZFJb0PCrnL0Mf82w9qzf43EPMrqw1h174 -d redirect_uri=https%3A%2F%2Fseanmonaghan.github.io%2FLyriChord%2F https://accounts.spotify.com/api/token

    // Use the access token to access the Spotify Web API
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
    getChords(artistInputValue, songInputValue);
    createSuggestions(artistInputValue);
    // spotifyApi();
})

 
chordsButton.click(function() {
    const artistName = searchArtist.value;
    const songName = searchSong.value;
    var chordURL = "https://www.songsterr.com/a/wa/bestMatchForQueryString?s=" + songName +"&a=" + artistName; 
    window.location = chordURL;
})