# Mal for genererte øvingseksamener — TDT4145

Dette dokumentet beskriver hvordan en øvingseksamen bør se ut når vi lager nye sett her i [genererte/](.). Hver ny eksamen lagres som en **HTML-fil** i denne mappen (f.eks. `eksamen_01.html`, `eksamen_02.html`, ...) slik at oppgavene blir **interaktive flervalgsoppgaver** man kan klikke seg gjennom.

---

## 1. Rammer for årets eksamen

- **Format:** Kun **flervalgsspørsmål** (multiple choice). Ingen tegning, ingen langsvar, ingen "skriv SQL i en boks".
- **Interaktivt:** Hvert sett er en HTML-side. Brukeren klikker på et alternativ; siden fargelegger riktig svar grønt og feil svar rødt, og åpner automatisk en `<details>`-blokk med grundig forklaring (fasit + hvorfor de andre er feil + lenke til pensum). Bruk [exam.js](exam.js) og [exam.css](exam.css) — de håndterer denne logikken så lenge HTML-strukturen i §2 følges.
- **Vekting:** Del 1 ≈ 40 %, Del 2 ≈ 60 %.
- **Lengde per oppgavesett:** **40–50 oppgaver totalt** (ca. 16–20 i Del 1, ca. 24–30 i Del 2). Hver oppgave har et poengtall som summerer til 100. Den lengre formen tvinger oss til å gå *bredere* (alle delkapitler dekkes) og *dypere* (flere edge cases, flere ledd i hver utregning) enn et 25-oppgavesett klarer.
- **Vanskelighetsgrad:** Settene skal *utfordre* en student som har lest pensum. Unngå å bare ha "definisjonsspørsmål" der svaret er en bokstavelig setning fra boken, selv om det går fint å ha noen slike oppgaver, men bruk helst *anvendelse*: gi et konkret scenario, en log, en tabell, et schema, og krev at studenten *resonnerer*. Se på tidligere eksamener for å få et intrykk av dette og hvordan oppgavene b
- **Tidsramme (anbefalt):** 4 timer for et komplett sett — speiler en lengre, breiere eksamen.

> **Viktig om gamle eksamener:** [vår_2025.md](../vår_2025.md) og [midterm_2026.md](../midterm_2026.md) ligger som referanse for *stilen*, ikke fasit. Bruk dem til å forstå tonen, vanskelighetsgraden og oppgavetypene — men **ikke replikér oppgaver**. I tillegg må vi teste deler av pensum som ikke ble berørt der (særlig Del 1 sine kapitler om views/triggere/funksjoner/rekursjon, og deler av Del 2 som hashing, sortering og isolation levels). Variér tall, skjemaer og scenarier hver gang.

---

## 2. Filstruktur for en eksamensfil

Hver fil er en frittstående HTML-side som lenker til [exam.css](exam.css) og [exam.js](exam.js). Skall:

```html
<!doctype html>
<html lang="nb">
<head>
  <meta charset="utf-8">
  <title>Øvingseksamen 01 — TDT4145</title>
  <link rel="stylesheet" href="exam.css">
</head>
<body>
  <header class="exam-head">
    <h1>Øvingseksamen 01 — TDT4145</h1>
    <p>Tidsramme: 3 timer · Hjelpemidler: Ingen · Total: 100 poeng</p>
  </header>

  <section class="exam-part">
    <h2>Del 1 — Theodoros (~40 %)</h2>

    <!-- ÉN .exam-q per oppgave (se mal under) -->

  </section>

  <section class="exam-part">
    <h2>Del 2 — Svein Erik (~60 %)</h2>

    <!-- ÉN .exam-q per oppgave -->

  </section>

  <script src="exam.js"></script>
</body>
</html>
```

### Mal for én oppgave (`.exam-q`)

```html
<article class="exam-q">
  <header class="exam-q__head">
    <span class="exam-q__num">Spørsmål 1</span>
    <span class="exam-q__points">3 poeng</span>
    <span class="exam-q__topic">Kap. 2 — Relasjonsalgebra</span>
  </header>
  <div class="exam-q__body">
    <p class="q-text">Spørsmålstekst her? (kan inneholde små tabeller, kodeblokker eller SVG-figurer)</p>
    <ul class="exam-q__opts">
      <li><span class="opt-label">A</span> Alternativ A</li>
      <li><span class="opt-label">B</span> Alternativ B</li>
      <li><span class="opt-label">C</span> Alternativ C</li>
      <li><span class="opt-label">D</span> Alternativ D</li>
    </ul>
    <details class="fasit-details">
      <summary>Vis fasit</summary>
      <div class="fasit-body">
        <span class="fasit-correct">Riktig svar: C</span>
        <p>Forklaring på hvorfor C er riktig — vis utregning, sitér regelen, eller pek på det avgjørende beviset.</p>
        <p>Hvorfor de andre er feil: A bytter om på &hellip;; B glemmer at &hellip;; D antar feilaktig at &hellip;.</p>
        <p class="ref">Pensum: <a href="../../kap2/relasjonsalgebra.html">Kap. 2 — Relasjonsalgebra</a></p>
      </div>
    </details>
  </div>
</article>
```

### Hvordan det oppfører seg interaktivt

`exam.js` finner hver `.exam-q`, leser riktig svar fra `.fasit-correct` (tekstmønster `Riktig svar: X`), og:

1. Skjuler den manuelle "Vis fasit"-knappen.
2. Gjør hvert `<li>` i `.exam-q__opts` klikkbart (også med tastatur via Enter/Space).
3. Når brukeren klikker:
   - Riktig alternativ får klassen `is-correct` (grønn).
   - Hvis det valgte ikke var riktig, får det klikkede `is-wrong` (rødt).
   - Hele oppgaven låses (ingen flere klikk).
   - `<details class="fasit-details">` åpnes automatisk, så forklaringen vises.

Det betyr at **fasitens innhold er det brukeren ser etter et svar** — det skal derfor være en grundig læringstekst, ikke bare en bokstav.

### Krav til hver oppgave

- **Tematisk tittel** i `.exam-q__topic` (f.eks. "Kap. 6 — ER-modellering", "Kap. 11 — B+-tre løvnivå", "Kap. 18 — ARIES").
- **Pensum-lenke** i `<p class="ref">` som peker til riktig HTML-side i [kap1/](../../kap1/) – [kap8/](../../kap8/) – så brukeren kan slå opp.
- **Forklaring må dekke alle alternativer**, ikke bare det riktige. Mønster: "C er riktig fordi … A er feil fordi … B er feil fordi … D er feil fordi …". Dette er hele læringspoenget med formatet.
- **"Velg ett eller flere"-spørsmål** håndteres ikke av `exam.js` enda; hvis du absolutt må ha det, omform til flere uavhengige sant/usant-felter (`.exam-q__tf-field`) som JS-en støtter.
- For oppgaver som tidligere ville krevd skriftlig SQL/RA/ER, omform til MC: vis flere kandidat-svar (SQL-snutter, RA-uttrykk, ER-fragmenter) og spør hvilket som er korrekt/ekvivalent.

### Innholdskrav for alternativene

**Den vanligste lekkasjen er at det riktige svaret skiller seg ut.** Studenten leser ikke teksten — bare formen — og velger likevel riktig. Pass spesielt på dette:

- **Lengde — det viktigste.** Det riktige svaret skal *ikke* systematisk være det lengste. Tell tegnene før du publiserer: hvis riktig svar er lengre enn snittet av distraktorene, må du enten korte ned riktig svar eller pumpe opp distraktorene med samme detaljnivå (kvalifiseringer, eksempler, presiseringer). Gjennom et helt sett bør riktig svar være lengst, mellomlangt og kortest *omtrent like ofte* — sjekk fordelingen.
- **Variér posisjonen til riktig svar.** Riktig alternativ skal fordeles jevnt mellom A, B, C og D over hele settet — unngå "C-tendens". Hvis du oppdager skjevhet, bytt om rekkefølgen på alternativene i noen oppgaver.
- **Ingen "tell-tale words".** Ord som *alltid*, *aldri*, *kun*, *eneste* gjør et alternativ lett å eliminere; ord som *typisk*, *vanligvis*, *ofte* gjør det mistenkelig "trygt". Bruk dem i både riktige og feile svar — eller unngå dem helt.
- **Samme grammatiske form og detaljnivå** på tvers av A–D. Hvis ett svar starter med et tall, bør de andre også; hvis ett er en hel setning, skal alle være det; hvis ett bruker fagterminologi (f.eks. "konfliktserialiserbar"), skal alle gjøre det.
- **Distraktorene må være plausible** — basert på vanlige misforståelser eller halvt riktige resonnementer, ikke "fyll". En leser som ikke kan stoffet skal ikke kunne eliminere noen av dem på formgrunnlag alene.
- **Alternativene skal være innbyrdes uavhengige** — ikke "A og B, men ikke C". Unngå også at to distraktorer er nesten identiske (da blir det reelt 3-valg). Samtidig: ikke alle fire skal være variasjoner over samme svar — da kan studenten eliminere dem som gruppe.
- **Ikke gjør "Ingen av de andre alternativene er riktige"** til riktig svar i mer enn ca. 1 av 10 oppgaver — overbruk svekker dets verdi som konseptsjekk.

> **Sjekk før publisering:** Les hver oppgave kun ved å se på alternativene (skjul spørsmålsteksten). Klarer du å peke ut riktig svar bare ut fra hvordan de er formulert? Hvis ja — skriv om.

---

## 3. Del 1 — Theodoros (~40 %, ca. 16–20 oppgaver)

Stilen ligner [midterm_2026.md](../midterm_2026.md): korte konseptspørsmål + små tabeller man "kjører" SQL/RA mot i hodet. Hver eksamen skal dekke alle de syv blokkene under, med minst antallet oppgaver indikert. Med 16–20 oppgaver i Del 1 har vi rom for *flere ulike vinklinger* per blokk — ikke bare én "definisjonsoppgave" og én "regneoppgave", men f.eks. tre ulike SQL-bugs som hver tester sin egen feilmønster.

### 3.1 Introduksjon (Kap. 1) — 1–2 oppgaver
Kap. 1 er en oversiktsforelesning, men har konseptuelt MC-stoff som er lett å glemme:
- **Tre-skjema-arkitekturen** (fysisk / logisk / view) og **datauavhengighet** (logisk vs fysisk).
- **DDL vs DML** — hva uttrykker DDL (skjema, integritetskrav), hva uttrykker DML (innhold)?
- **Database­motorens komponenter**: storage manager, query processor, transaction manager, buffer manager — hva gjør hver?
- **2-tier vs 3-tier-arkitektur**, og forskjell på sentralisert / parallell / distribuert DB.
- **DBMS vs filsystem**: hvorfor ikke bare bruke filer? (lost update, redundans, integritet, samtidighet, recovery).
- **Skjema vs instans**: skjemaet endres sjelden, instansen ofte.

### 3.2 Relasjonsmodell og relasjonsalgebra (Kap. 2 + 3.2 + 4.1) — 2–3 oppgaver
Spørsmålstyper som **må** representeres over tid:
- Hvilke operatorer er fundamentale i RA? (selection, projection, union, set difference, cross product, rename — *ikke* intersection, join, division)
- Beregn antall tupler i resultatet av et RA-uttrykk (σ, π, ⋈, ⋈ₙ, ÷, ∪, ∩, −).
- Forskjell på natural join, theta join, outer joins (left/right/full).
- Egenskaper ved joins: ordensuavhengighet for inner join, NULL-håndtering i outer joins, størrelses-grenser.
- Nøkkelbegreper: superkey vs candidate key vs primary key vs foreign key.
- Domain, attributt, schema, instans.

### 3.3 SQL — DDL, spørringer, aggregater (3.1–3.7, 3.9) — 2–3 oppgaver
- Les en `CREATE TABLE`-setning: hvilken er gyldig? Hvilken constraint er brutt? Hva blir typen til en kolonne?
- Resultat av en `SELECT` med `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`, `LIMIT` mot en gitt liten tabell — svaralternativer er konkrete tall eller verdier.
- Rekkefølgen SQL-klausuler logisk evalueres i (FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY).
- Aggregater (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) og hva som skjer med NULL.
- DISTINCT, set-operatorer (UNION, INTERSECT, EXCEPT).

### 3.4 SQL — joins og subqueries (3.8, 4.1) — 2–3 oppgaver
- Resultat av self-joins, inner/outer joins.
- Korrelert vs ukorrelert subquery — hvilken gir samme resultat?
- `IN`, `EXISTS`, `ANY`, `ALL`, `NOT EXISTS` — semantikk og ekvivalenser.
- Omskriv en nøstet spørring til en flat join (eller motsatt) — "hvilken av disse er ekvivalent?".

### 3.5 SQL — views, transaksjoner, integritet, indekser, autorisasjon, prosedyrer, triggere, rekursjon (4.2–4.7, 5.2–5.4, 16.5.1, 17.1) — 3–4 oppgaver
**Dette området ble underrepresentert i midterm — pass særlig på her.**
- Hva er en view? Materialiserte views vs vanlige views. Updatable views.
- `CHECK`, `NOT NULL`, `UNIQUE`, `FOREIGN KEY ... ON DELETE/UPDATE CASCADE/SET NULL/RESTRICT`.
- Foreign key-spørsmål à la midterm Q1.11 (refererer FK alltid PK? Hvilken kolonne refereres når ingen er gitt?).
- Triggere: BEFORE/AFTER, ROW/STATEMENT, hva utløses når.
- Rekursive `WITH RECURSIVE`-spørringer — gitt et CTE, hva blir resultatet etter N iterasjoner?
- `GRANT`/`REVOKE`-syntaks.
- `CREATE INDEX` — hva slags indeks lages, og hva betyr det for ytelse?

### 3.6 ER-modellering og ER → relasjonsskjema (6.1–6.7, 6.9, 7.1) — 2–3 oppgaver
- Tolk et lite ER-diagram (vist som SVG/bilde eller beskrivelse): hvor mange tabeller trengs?
- Kardinaliteter (1:1, 1:N, M:N) og total/partial deltakelse.
- Svake entiteter — hvordan mappes de?
- Spesialisering/generalisering, ISA-hierarkier, kategorier (union types).
- Hvilke utsagn om diagrammet er sanne? (à la midterm Q1.13)

### 3.7 Funksjonelle avhengigheter og normalformer (7.1–7.3, 7.6) — 2 oppgaver
- Gitt FD-mengde: hva er kandidatnøklene?
- Hvilken normalform er en gitt tabell på (1NF/2NF/3NF/BCNF)?
- BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF — hvilke implikasjoner gjelder?
- Lossless-join og dependency preservation ved dekomponering — hvilken dekomponering bevarer hva?
- Identifiser brudd på 2NF (delvis avhengighet av PK) og 3NF (transitiv avhengighet).

---

## 4. Del 2 — Svein Erik (~60 %, ca. 14–18 oppgaver)

Stilen ligner [vår_2025.md](../vår_2025.md): regneoppgaver med konkrete tall, små logger, schedules og lock-tabeller. Den store endringen i år er at *alle* svar er flervalg — også der man tidligere skulle skrive RA-grafer eller dekomponere tabeller. Disse må omformes (se §5).

### 4.1 Lagring del 1 — poster, blokker, heapfiler, hashing (kap. 1–8) — 2–3 oppgaver
- Beregn antall blokker i en heapfil gitt postgrøttese, blokkstørrelse og fyllgrad.
- Record-format (fixed vs variable length, record vector, delimiter).
- Statisk hashing — formel `h(K) = K mod N`, plassér gitte nøkler i blokker, tell overflow.
- **Extendible hashing** — gitt en serie nøkler, hvor mange directory-doublings? Hva er global/local depth etter N innsettinger?
- Heap file: linked list med fulle vs ledige blokker, RID-format, scan-kostnad.
- DB-buffer: hva styrer DBMS vs OS, prefetching.

### 4.2 Lagring del 2 — B+-trær, LSM-trær (kap. 9–11) — 3–4 oppgaver
**Nesten alltid representert. Variér scenarier — ikke kopiér tallene fra vår_2025.**
- Beregn antall blokker på løvnivå (level=0) gitt N poster, postgrøttese, blokkstørrelse, 2/3 fyllgrad — `floor(blokk*2/3 / postgrøttese)` poster per blokk.
- Beregn antall blokker på level=1, 2, 3 ... gitt fan-out (basert på (key, BlockId)-størrelser).
- Antall nivåer i et clustered/unclustered B+-tre.
- Hva lagres på løvnivå i clustered vs unclustered? (Hele rader vs (key, RID).)
- Block split — hvor mange poster flyttes? Hvor havner split-key (kopieres ved leaf, flyttes ved indre nivå)?
- Composite keys — leksikografisk sortering, valg av nøkkel-rekkefølge ved selektivitet.
- LSM-trær: memtable → SST, write amplification, compaction — sammenlign med B+-trær (write- vs read-ytelse).

### 4.3 Queries — aksessmetoder, sortering, query processing (kap. 12–14) — 2–3 oppgaver
- "Hvor mange blokker aksesseres ved optimal utføring?" — gitt clustered/unclustered B+-tre + heap, beregn for `WHERE pk = c`, `WHERE secondary = c`, `WHERE pk > c`, `ORDER BY secondary` osv. Dette er kjernemønsteret i Problem 3–5 i vår_2025 — variér tallene.
- Velg riktig aksess-plan: scan vs index seek vs index-scan + heap-aksess.
- External merge sort: gitt B blokker og nB buffere, beregn `nR = ceil(B/nB)`, `dM = min(nB-1, nR)`, antall passes = `ceil(log_dM(nR))`, totalt I/O = `2B * (1 + passes)`.
- **Join-algoritmer (J1–J4)** — kjenn navnene, hovedidéen, og når hver vinner:
  - **J1 Block nested loop:** hvor mange blokker leses gitt buffer-spaces? Hvilken tabell skal være ytre løkke (typisk den minste)?
  - **J2 Index nested loop:** raskere når det fins en indeks på indre tabells join-attributt — for hver rad i ytre, slå opp i indeksen.
  - **J3 Sort-merge join:** sorter begge på join-attributtet og gå parallelt gjennom med to pekere. Lønner seg når begge inputs allerede er sortert, eller når resultatet uansett skal sorteres.
  - **J4 Partition-hash join:** hash join-attributtet for å partisjonere begge tabellene; *build*-fase bygger hashtabell på den minste siden, *probe*-fase slår opp den andre. Krever at partisjonene får plass i RAM.
- Query optimizer: logisk vs fysisk plan, statistikk fra katalog.

### 4.4 Transaksjoner del 1 — teori, schedules, serialiserbarhet (kap. 15–16) — 2–3 oppgaver
- ACID — hva betyr hver bokstav? Hvilken løses av hva (logging, locking, constraints)?
- Avgjør om en gitt schedule er **konfliktserialiserbar** ved å bygge presedensgraf — flere schedules som alternativer, "hvilke er konfliktserialiserbare?". Mønster fra vår_2025 Problem 6.
- Anomalier: dirty read, dirty write, unrepeatable read, lost update, phantom — match anomali til scenario.
- Recoverability-hierarki: Strict ⊂ ACA ⊂ Recoverable ⊂ All — hvilken klasse hører schedule X til?
- SQL isolation levels: READ UNCOMMITTED / READ COMMITTED / REPEATABLE READ / SERIALIZABLE — hvilke anomalier hindres av hva?

### 4.5 Transaksjoner del 2 — låser og samtidighet (kap. 16–17) — 2–3 oppgaver
- Gitt en sekvens av operasjoner, sett 2PL-låser (rigorous/strict). I hvilken rekkefølge committer transaksjonene? Mønster fra vår_2025 Problem 9–10.
- Match en låse-tilstand (has-locks/wants-locks-graf) til riktig operasjonssekvens.
- Deadlock — gitt en sekvens, oppstår deadlock? Hvilke transaksjoner er involvert?
- 2PL-varianter: basic, conservative, strict, rigorous — hvilken egenskap har hver?
- MVCC / snapshot isolation — hva leser en read-transaksjon hvis en write committer underveis?

### 4.6 Transaksjoner del 3 — recovery (ARIES) (kap. 18) — 2–3 oppgaver
**Mønster fra vår_2025 Problem 7–8 — varier loggen hver gang.**
- Gitt en logg + checkpoint-state (transaksjonstabell, DPT): hva er DPT etter analyse-fasen?
- Hvilke pages kan vi med sikkerhet si ble skrevet til disk før krasj? (Forutsetter forståelse av PageLSN, recLSN, "stjålne" buffer-slots.)
- Hvilke loggposter trenger REDO? (Sjekk DPT-medlemskap, recLSN ≥ LSN, PageLSN ≥ LSN.)
- Hvilke transaksjoner er winners/losers etter analysen?
- WAL — hva må skrives først, og hvorfor? Force-log-at-commit.
- CLR — hva er hensikten, og hvorfor kan den aldri undoes?
- Force/no-force × steal/no-steal-matrisen — hvilken kombinasjon bruker ARIES?

---

## 5. Hvordan omforme tidligere langsvar/tegne-oppgaver til MC

Tidligere eksamener (særlig Problem 12–14 i vår_2025) krevde papirarbeid. Konverteringer:

| Gammel oppgavetype | MC-versjon |
|---|---|
| "Skriv SQL-koden som ..." | Vis 4–5 SQL-snutter, spør hvilken som tilfredsstiller alle kravene. |
| "Skriv et SQL-query som ..." | Vis 4–5 kandidat-querier, spør hvilken returnerer riktig resultat. |
| "Lag en RA-spørring ..." | Vis 4–5 RA-uttrykk/grafer, spør hvilken er ekvivalent med en gitt SQL eller løser et gitt problem. |
| "Dekomponér tabellen til BCNF" | Vis 4–5 dekomponeringer, spør hvilken er på BCNF *og* har lossless-join *og* dependency preservation. |
| "Lag et ER-diagram for ..." | Vis ferdige ER-diagrammer som SVG-bilder, spør hvilket modellerer en gitt tekst korrekt — eventuelt to-trinns (først kardinaliteter, så mapping). |
| "Skriv en CREATE TABLE ..." | Vis 4–5 DDL-snutter, spør hvilken oppfyller skjemaet (typer, constraints, FKs). |

For alle slike: hold spørsmålet *konkret* (presis spec) og distraktorene *plausible* (typiske feil, ikke åpenbart feilformaterte alternativer).

---

## 6. Sjekkliste før et nytt sett anses ferdig

- [ ] Filen er en HTML-side med `<link rel="stylesheet" href="exam.css">` og `<script src="exam.js"></script>`.
- [ ] Hver oppgave er en `<article class="exam-q">` med riktig HTML-struktur (se §2) — `.opt-label` per alternativ, `.fasit-correct` med `Riktig svar: X`, og en `<details class="fasit-details">` med forklaring.
- [ ] Sett er testet i nettleser: klikk på et alternativ låser oppgaven, fargelegger riktig/feil, og åpner forklaringen automatisk.
- [ ] Total poengsum = 100, og fordelingen er ≈ 40/60 mellom Del 1 og Del 2.
- [ ] Hver av de syv Del 1-blokkene (§3.1–3.7) er representert med minst én oppgave.
- [ ] Hver av de seks Del 2-blokkene (§4.1–4.6) er representert med minst én oppgave.
- [ ] Minst én oppgave dekker det "underrepresenterte" stoffet: views, triggere, rekursjon, hashing-detaljer, join-algoritmer (J2–J4), isolation levels, MVCC.
- [ ] Ingen oppgave er en direkte kopi av [midterm_2026.md](../midterm_2026.md) eller [vår_2025.md](../vår_2025.md). Tall, navn og scenario er endret.
- [ ] Alle oppgaver har grundig forklaring som dekker både hvorfor riktig er riktig og hvorfor distraktorene er feil.
- [ ] Distraktorene er plausible (typiske misforståelser), ikke "fyllalternativer", og er omtrent like lange som det riktige svaret.
- [ ] **Lengdesjekk:** over hele settet er riktig svar lengst, mellomlangt og kortest *omtrent like ofte* — ikke systematisk det lengste alternativet.
- [ ] **Posisjonssjekk:** riktig svar (A/B/C/D) er fordelt jevnt over settet, ikke konsentrert på én bokstav.
- [ ] **Form-test:** for hver oppgave, prøv å gjette riktig svar uten å lese spørsmålet. Hvis du klarer det fra formuleringen alene, må alternativene skrives om.
- [ ] Hver oppgave har en pensum-lenke i `.ref` som peker til riktig kapittelside.
- [ ] For hver Del 2-regnearts-oppgave (B+-tre, ARIES, 2PL, merge-sort): tallene er nye, ikke gjenbruk av tidligere oppgavers oppsett.

---

## 7. Navngiving og oppfølging

- Filnavn: `eksamen_NN.html` (NN = 01, 02, ...). Tema-spesifikke sett kan hete `eksamen_NN_tema.html`, f.eks. `eksamen_03_aries.html`.
- Hvert sett bør ha en kort innledning øverst (under `<h1>`) med dato det ble laget og hvilke pensumblokker som er hovedfokus.
- [exam.js](exam.js) og [exam.css](exam.css) er felles for alle sett — ikke kopier dem inn i hver fil. Hold dem oppdatert hvis vi endrer interaksjonsmønsteret.
- Når et sett er testet av brukeren, oppdater eventuelt med kommentarer i en `<!-- -->`-kommentar øverst i HTML-en om hva som var for lett/for vanskelig — slik at neste sett kalibreres bedre.
