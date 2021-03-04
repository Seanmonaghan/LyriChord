lyricDiv = $("#lyricDiv");
searchButton = $("#searchButton");
testButton = $("#testButton");
suggestions = $("#suggestions");


function getLyrics(artistName, title) {
    var requestUrl = "https://api.lyrics.ovh/v1/" + artistName + "/" + title; 

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
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

function getChords(artistName, songName) {
    var songsterrURL = "http://www.songsterr.com/a/wa/bestMatchForQueryString?s=" + songName +"&a=" + artistName; 

    testButton.click(function() {
        window.location= songsterrURL;
    });
}

function createSuggestions(artistName) {
    var testURL = "http://www.songsterr.com/a/ra/songs.json?pattern=" + artistName;

    fetch(testURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
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
    });
}

searchButton.click(function() {
    const artistInputValue = searchArtist.value;
    const songInputValue = searchSong.value;
    getLyrics(artistInputValue, songInputValue);
    getChords(artistInputValue, songInputValue);
    createSuggestions(artistInputValue);
});

$(".listItem").on("click", function() {
    console.log("hello");
    // window.location = this.val;
});
