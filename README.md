# LyriChord

https://seanmonaghan.github.io/LyriChord/

## Description

This app is designed for someone looking for a convenient place to find both the lyrics and chords to a song.  The app will generate lyrics on one side of the screen, and on the other provide the user with a link to the musical chords as well as suggest a variety of other chords by the same artist.  The app also features spotify integration so that the user can easily click on a link to open the song they were searching for on spotify.  

This app utilizes the API of Lyrics.ovh, Songsterr and Spotify to create a centralized hub for musicians to get all they need to learn a song and sing along.  

## Ideal User

```
This application is aimed at a user who is looking to 
access both the lyrics and chords of different songs
so they can learn them both similtaniously and conveniently.
 
```

## Site Overview

![Overall Image](assets/overall.PNG)

```
Upon rendering the page, the user is provided with two clearly labeled search bars 
where they can indicate the Artist name and Song Name they are looking for.  Most 
functionality of this app requires both inputs to be entered, however the app will
still generate suggestions if only the artist name is included.  This can be useful
for someone looking for a particular song, but they can only think of the artist name.

The styling of the app was done with Bulma and includes a simple color scheme that is
pleasant to view and not distracting from the functionality of the application.  We have
also developed a logo and favicon to further style the website.

```

```

The first function of this app is to generate the lyrics of a song that they are interested
in.  This is executed when the user clicks the "get lyrics" button, where the app will query
Lyrics.ovh for the lyrics.  The function then breaks down the lyrics from their string format
and displays them for the user in a readable format.  

This button also generates a list of suggested songs that the user might also be interested in
so that they can look up the lyrics for them, or click on them and get the chords for the song.

```

![Lyric Function](assets/lyricFunction.PNG)


```
The secondary function of this app is to allow the user to quickly get the chords for the song.  
When they click on the "Get Chords" button, they will have a new tab opened that contains the 
Chords for the song on the Songsterr website.  

The user can also access the chords for any of the suggested songs just by clicking on them,
for when they are generated they are given a value based on a unique ID that songsterr has and
upon being clicked they will similarly open a new tab with the chords in them.  

```

![createSuggestion Function code snippet](assets/createSuggestionsFunction.PNG)

```

Finally, we have implimented the Spotify API to allow the user to go directly to the song they
are searching for on Spotify.  This is done when the click on the button "listen on spotify", where
the song search is passed into the function and an API call is made to spotify to search for that
song and return the external URL for it.

```

![Spotify API](assets/spotifyAPIfunction.PNG)

```
In addition to displaying the weather, searching for a city will also generate a list item that is
displayed below the search bar.  These list items are saved into local storage so they will persist and 
be regenerated when the user returns to the site using the load function.  These list items will also execute the getWeather function
upon being clicked to bring up the weather information for that city.

```

