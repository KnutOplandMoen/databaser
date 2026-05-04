TDT4145 Datamodellering og databasesystemer
Transaksjoner
a) Se på de følgende historiene og avgjør hvilke samtidighetsproblemer som finnes der:
(dirty read, lost update, unrepeatable read, incorrect summary)
H1: r2(X); r1(X); w2(X); r2(Y); w1(X); w2(Y);
H2: r2(X); w2(X); r1(X); w1(X); abort T2;
b) Hvilke av de følgende historiene er konfliktsserialiserbare? Bestem evt. den ekvivalente
serielle historien.
H1: r1 (X); r3 (X); w1(X); r2(X); w3(X)
H2: r1 (X); r3 (X); w3(X); w1(X); r2(X)
H3: r3 (X); r2 (X); w3(X); r1(X); w1(X)
H4 r3 (X); r2 (X); r1(X); w3(X); w1(X)
c) Se på de tre transaksjonene T1, T2, and T3 og historiene H5 og H6 gitt under. Tegn
presedensgrafen for H5 og H6 og avgjør om historiene er konfliktserialiserbare eller ikke.
Hvis historien er konfliktserialiserbar, skriv ned den ekvivalente serielle historien.
T1: r1(x); r1(z); w1(x)
T2: r2(z); r2(y); w2(z); w2(y)
T3: r3(x); r3(y); w3(y)
H5: r1(x); r2(z); r1(z); r3(x); r3(y); w1(x); w3(y); r2(y); w2(z); w2(y)
H6: r1(x); r2(z); r3(x); r1(z); r2(y); r3(y); w1(x); w2(z); w3(y); w2(y)
d) Vi har historiene:
T1: r1(A); w1(A); r1(B); w1(B);
T2: r2(B); w2(B); r2(A); w2(A);
Hvor mange av de mulige historiene av operasjonene over, er konfliktekvivalente med den
serielle historien T1; T2?
e) Vi har historiene:
T1: r1(A); w1(A); r1(B); w1(B);
T2: r2(B); w2(B); r2(A); w2(A);
Hvor mange av de mulige historiene av operasjoner over, er konfliktekvivalente med den
serielle historien T2; T1?
f) Se på historiene H7, H8 og H9 under. Bestem om hver historie er strict, cascadeless,
recoverable eller nonrecoverable.
H7: r1(x); r2(z); r1(z); r3(x); r3(y); w1(x); c1; w3(y); c3; r2(y); w2(z); w2(y);c2
H8: r1(x); r2(z); r1(z); r3(x); r3(y); w1(x); w3(y); r2(y); w2(z); w2(y); c1; c2; c3;
H9: r1(x); r2(z); r3(x); r1(z); r2(y); r3(y); w1(x); w2(z); w3(y); w2(y); c3; c2;
g) La A,B,C og D være dataelementer med angitte startverdier og gitt loggen under med
loggposter på formatet:
[LSN,Operation,Transaction,DataItem,BeforeImage,AfterImage]
A B C D
3
0
1
5
4
0
2
0
[101,start_trans,T3]
[102,read,T3,C]
[103,write,T3,B,15,12] 1
2
[104,start_trans,T2]
[105,read,T2,B]
[106,write,T2,B,12,18] 1
8
[107,start_trans,T1]
[108,read,T1,A]
[109,read,T1,D]
[110,write,T1,D,20,25
]
2
5
[111,read,T2,D]
[112,write,T2,D,25,26
]
2
6
[113,read,T3,A]
Hvilken recoveryegenskap (strict, cascadeless, recoverable, ingen av delene) har denne
historien?
h) Hvis T2 rulles tilbake som en konsekvens av konflikten med T3, hvilke verdier vil
dataelementene A, B, C, D ha etter at T2 har blitt rullet tilbake?
i) Anta A, B, C, D er datasider det skal gjøres recovery på. Hvilke loggposter blir det gjort REDO
på i recovery av denne loggen når DPT har følgende tilstand:
(B,recLSN=106),(D,recLSN=112)
etter analysen og blokkene har følgende tilstand på disken:
(A, pageLSN=100, value=30),
(B, pageLSN=106, value=18),
(C, pageLSN=50, value=40),
(D, pageLSN=110, value=25)
?
j) Anta vi har en logg som følger: (LSN, Transaksjon, Page/Blokk, operasjon, …)
(101, T1, A, upd, ….)
(102, T2, B, upd, ….)
(103, T3, A, upd, ….)
(104, ckpt start)
(105, ckpt end)
(106, T1, commit)
(107, T3, A, upd)
(108, T2, B, upd)
(109, T2, commit)
DPT i sjekkpunktloggposten 105 er tom. Hvilke blokker/pages kan vi med sikkerhet si er
skrevet ut til disk med hvilke PageLSN?
k) Anta følgende forsøk på utføre dataoperasjoner:
H1: r1(X); w2(X); w2(Y); w3(Y); w1(Y); C1; C2; C3;
Her skal vi innføre rigorous 2PL. For hver read må transaksjonen sette en read_lock (rl). Før
hver write må transaksjon sette en write_lock (wl). Hvis en transaksjon må blokkere på en
låssetting, så stopper hele transaksjonen og alle etterfølgende operasjoner i denne
transaksjonen, men andre transaksjoner kan fortsette. Vis hvordan sekvensen av operasjoner
fører til hvilke låser som settes og hvilke operasjoner blir utført i hvilken sekvens.
Svein Erik Bratsberg, 21.februar 2024, oppdatert 23. mai 2024