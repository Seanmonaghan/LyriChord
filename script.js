lyricDiv = $("#lyricDiv");
searchButton = $("#searchButton");

function getLyrics(artistName, title) {
    var requestUrl = "https://api.lyrics.ovh/v1/" + artistName + "/" + title 

    fetch(requestUrl)
        .then(function (response) {
           
            return response.json();
        })
        .then(function (data) {
            console.log("hello");
            console.log(data);
            // console.log(data.lyrics.lyrics);
            fixLyrics = data.lyrics.replace('\n',' ')
            splitLyrics = fixLyrics.split('\n');
            console.log(splitLyrics);
            
            for (i = 0; i < splitLyrics.length; i++) {
                let songLine = document.createElement("p");
                songLine.textContent = splitLyrics[i];
                lyricDiv.append(songLine);
               
        }
            // console.log(splitLyrics);
            

        });
    
};

searchButton.click(function() {
    const artistInputValue = searchArtist.value;
    const songInputValue = searchSong.value;
    getLyrics(artistInputValue, songInputValue);
})

// searchButton.addEventListener('click', () => {
//     const artistInputValue = searchArtist.value;
//     const songInputValue = searchSong.value;
//     getLyrics(artistInputValue, songInputValue);
// });
