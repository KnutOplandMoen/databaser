TDT4145 - Data Modeling, Databases and
Database Management Systems
Training Exercise 2 - SQL∗
Download and import the CDDB database. You can either use the SQLite database cddb.db or re-import
the data found in cddb.sql.zip. The database contains information about albums and artists. An image of
the schema of the database is also provided in cddb.pdf. All files can be found in the cddb directory insider
the resources directory that can be accessed via the link in Blackboard. The link can be found along with the
training exercises files.
1. Rewrite the following query from the traditional to the modern JOIN syntax. Use any of the options that
include the JOIN keyword.
2. Write a query to list all artists who have released an album in the year 2000 that exclude duplicates.
3. Write a query to list the artist and album name of CDs released in 1999 which contain the song ‘family
reunion’
4. Give a query to show non-duplicated artist, song, and album names of songs that are located on track 12 on
a cd.
5. Give a query that produces a list of all artists with self-titled albums (i.e., an album with the same name as
the artist who releases it). Artists with no self-titled albums have to be included with null as album.
6. Within one single query, find the most recent and the average release year in this database. The query should
exclude values below 1900 and above 2012.
7. How many albums (not CDs) have been issued each year in the 20th century (years 19XY)
8. Make an alphabetically sorted list of artists whose name starts with ’rad’ along with the number of albums
each artist has. Exclude artists who have just a single album from the result.
9. Sort the genres in the descending order of their popularity (popularity is defined by the number of cds in
that genre). Include only those genres represented by at least 1000 cds.
10. Find all artists involved in albums which contain the word ‘drop’.
11. What is the maximum and average number of cds per genre?
12. Find out how many songs are included in at least 3 CDs. Avoid counting the same cd multiple times.
∗Parts of the exercise have been created and modified over the years by members of the DBIS group of the University of Konstanz as part
of the course “Database Systems”.
1
Solutions
1. SELECT album
FROM artists
NATURAL JOIN artist2album
NATURAL JOIN albums
WHERE artist = ' radiohead';
2. SELECT DISTINCT artist
FROM artists
NATURAL JOIN artist2album
NATURAL JOIN cds
WHERE ayear = 2000;
3. SELECT artist, album
FROM songs
NATURAL JOIN cdtracks
NATURAL JOIN cds
NATURAL JOIN artist2album
NATURAL JOIN artists
NATURAL JOIN albums
WHERE ayear = 1999 AND song = 'familyreunion';
4. SELECT DISTINCT artist, song, album
FROM cdtracks
NATURAL JOIN songs
NATURAL JOIN cds
NATURAL JOIN artist2album
NATURAL JOIN albums
NATURAL JOIN artists
WHERE track = 12;
5. SELECT artist, album
FROM artists
LEFT OUTER JOIN (albums NATURAL JOIN artist2album)
ON artists.artistid = artist2album.artistid AND artist = album;
6. SELECT MAX(ayear), AVG(ayear)
FROM cds
WHERE ayear BETWEEN 1900 AND 2012
7. SELECT cds.ayear, COUNT(DISTINCT albumid)
FROM cds NATURAL LEFT OUTER JOIN artist2album
WHERE cds.ayear BETWEEN 1900 AND 1999
GROUP BY cds.ayear
8. SELECT artist , COUNT(albumid) AS albums
FROM artists
NATURAL JOIN artist2album
WHERE artist LIKE ' rad%'
GROUP BY artist
HAVING COUNT(albumid) > 1
ORDER BY artist
Page 2 of 3
9. SELECT genre, COUNT(cdid) AS cds
FROM cds
NATURAL JOIN genres
GROUP BY genres.genreid, genre
HAVING COUNT(cdid) >= 1000
ORDER BY cds DESC
10. Correlated sub-query:
SELECT a.artist
FROM artists AS a
WHERE EXISTS (
SELECT artistid
FROM albums
NATURAL JOIN artist2album
WHERE album LIKE '% drop %'
AND a.artistid = artist2album.artistid
)
Uncorrelated sub-query:
SELECT DISTINCT artist
FROM artists
NATURAL JOIN (
SELECT artistid
FROM albums
NATURAL JOIN artist2album
WHERE album LIKE '% drop %'
)
11. SELECT MAX (num_cds) , AVG(num_cds)
FROM (
SELECT genreid , COUNT (*) AS num_cds
FROM cds
GROUP BY genreid
)
12. SELECT COUNT (*)
FROM (
SELECT songid , COUNT ( DISTINCT cdid ) AS cds
FROM cdtracks
GROUP BY songid
HAVING COUNT ( DISTINCT cdid ) >= 3
)
Page 3 of 3