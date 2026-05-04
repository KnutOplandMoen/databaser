Noen oppgaver med historier:
a) Gitt følgende historier:
H1: w2(A);w1(B);w1(A);r2(B);c1;c2;
H2: w1(A);w1(B);w2(A);c1;r2(B);c2;
H3: w1(A);c1;w2(B);w2(A); r2(B);c2;
Klassifiser recoveryegenskapene til historiene.
Løsning: I H1 leser 2 et element (B) som 1 har skrevet før 1 har committet (vi kan få
galopperende abort), men 2 committer etter 1 (opprettbar/recoverable). Dermed er H1
gjenopprettbar (recoverable), men unngår ikke galopperende abort (ACA).
I H2 leser 2 elementet (B) etter at 1 har committet, dermed ungåes galoppernde abort
(ACA). Historien bruker er ikke strikt låsing fordi 2 skriver A før 1 har committet.
H3 er seriell.
b) Gitt følgende historier:
1. r1(A); r2(A); r1(B); r2(B); r3(A); r4(B); w1(A); w2(B);
2. r1(A); r2(A); w1(B); w2(B); r1(B); r2(B); w2(C); w1(D);
3. w3(A); r1(A); w1(B); r2(B); w2(C); r3(C);
4. r1(A); w1(B); r2(B); w2(C); r3(C); w3(A);
5. r1(A); r2(A); r3(B); w1(A); r2(C); r2(B); w2(B); w1(C);
Tegn presedensgrafene for hver av historiene og avgjør om historiene er
konfliktserialiserbare
Løsning:
c) Gitt følgende historier, i hvilken av recoveryklassene tilhører disse:
H1: r1(x), w1(x), r2(x), r2(y), w2(y), c2, ….
H2: r1(x), w1(x), r2(x), r2(y), w2(y), c1, ….
H3: r1(x), w1(x), r2(y), c1, r2(x), w2(x), ….
Løsning:
H1: Ikke gjenopprettbar, det blir feil hvis nå T1 skulle gjøre abort. Da har T2 lest en
dirty x og kanskje beregnet ny verdi på y basert på x-verdien. Da blir det en feil som
ikke lar seg gjenopprette.
H2: En gjenopprettbar utførelse, men med risiko for galopperende abort. T2 kan nå
komitte. Hvis T1 hadde abortert, ville også T2 ha måttet abortere.
H3: Utførelsen er strict.