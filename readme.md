<img src="/screenshots/logo.png" style="width:100%">

fourtrack is an application for musicians to share their creations, and for fans to experience music from a new perspective. artists can upload isolated tracks of their music. fans can listen to the individual tracks, mix songs on the fly, and download them for their own remixing.

### technology

fourtrack is mean application.  The server is built with express, mongo for the database, and angular for a front end framework.  The audio playback and management is achieved using <a href="https://github.com/goldfire/howler.js">howlerjs<a>, an excellent javascript audio framework.

<img src="/screenshots/screenshot01.png" style="width:100%">

when a user signs up, they can scroll through the songs in the database.  clicking on the mixing icon will hide the album artwork and pull up a mixing board, where users can mix a song as it plays.  Additionally, clicking on the track label will allow the user to download the individual track for mixing on their own software.

<img src="/screenshots/screenshot02.png" style="width:100%">

in addition to listening to and mixing other songs, users can also create their own songs.  the user must provide a link to four mp3 files, which will be played simultaneously when a user clicks on the mixing icon for their song.

although the design of the site is fully responsive across devices, the audio playback is currently only supported in desktop browsers.
