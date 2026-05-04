TDT4145 - Data Modeling, Databases and
Database Management Systems
Exercise 1 - Relational Algebra
Spring Semester 2026
1. Consider the following schema, where underlining marks primary key attributes and equally named attributes imply foreign keys:
Artist(artistID, name)
Album(albumID, name, year, artistID)
Song(songID, name, duration, year, artistID)
FeaturedOn(artistID, songID)
SongOnAlbum(songID, albumID)
Note that:
• F eaturedOn.artistID and F eaturedOn.songID are foreign keys that refer to Artist.artistID and
Song.songID respectively, and
• SongOnAlbum.albumid and SongOnAlbum.songID are foreign keys that refer to Album.albumid
and Song.songID respectively.
Express the following queries in relational algebra.
1. Print for all songs in the database their title, duration, and year along with the name of the album each
song was in and the name of the artist.
2. Print the name and year of all albums released before 2017.
3. Print the IDs of all songs where the year they were released di!ers from the year the album they were
featured on was released.
4. Finds the artist names and song names for all songs in the database that do not appear on an album.
The resulting relation should be renamed to songsW ithoutAlbums(artistN ame, songN ame). Do
not use aggregation.
5. Print the names of all albums along with the number of songs that are featured on each album.
6. Find the names of all artists that have not released any albums in the year 2017.
7. Find all pairs of artists that have released songs that have appeared on the same album.
8. Find the names of the artists of all albums on which a song by “Queen” appeared.
9. Find the names of all artists that have released songs that appear in at least two albums. Do not use
aggregation.
10. Find the names of all artists that have released at least one album in 2017 and at least one song in 2018.
1