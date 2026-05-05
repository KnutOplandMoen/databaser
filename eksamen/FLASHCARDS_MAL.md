# Mal for "kapittel-eksamen" — flashcards per kapittel i Del 2

Dette dokumentet beskriver hvordan vi legger til en **flashcard-basert kapittel-eksamen** i hvert av kapitlene i Del 2 ([kap6/index.html](../kap6/index.html), [kap7/index.html](../kap7/index.html), [kap8/index.html](../kap8/index.html) — og samme oppskrift kan brukes på Del 1-kapitlene senere).

Målet er å gi en repetisjonsmodul som ligger der pensum ligger, og som *føles* som eksamen: samme tone, samme oppgavetyper, samme regnescenarier som [eksamen/genererte/MAL.md](genererte/MAL.md) — bare presentert som blafrende kort i stedet for ett sammenhengende sett. Studenten kan gå **fremover/bakover** gjennom kortene og **shuffle** dem for å unngå å huske rekkefølgen.

---

## 1. Hva er en "kapittel-eksamen"?

En seksjon på slutten av kapittelets `index.html` (`<section id="kapittel-eksamen">`), bygd som en **kortstokk** der hvert kort er én eksamensoppgave knyttet til pensum i akkurat det kapittelet.

To typer kort skal blandes i samme stokk:

| Type | Front | Bak |
|---|---|---|
| **Begreps-/definisjonskort** | Et begrep eller en kort spørsmålssetning ("Hva er en RID?", "Definer extendible hashing"). | Detaljert definisjon + hvor begrepet brukes + typiske misforståelser + lenke til pensum-side i kapittelet. |
| **Eksamens-/regneoppgavekort** | Konkret oppgave med tall, små tabeller, schedules, logger eller B+-tre-fragmenter — *samme stil som [eksamen/genererte/MAL.md](genererte/MAL.md)*. Kan være MC (4 alternativer) eller åpent ("regn ut antall blokker på løvnivå …"). | Full utregning steg-for-steg, formel siteres, sluttsvar uthevet, hvorfor distraktorer er feil (hvis MC), pensum-lenke. |

Kortstokken skal **dekke hele pensum i kapittelet** — alle sentrale begreper og alle oppgavetyper som kan dukke opp i Del 2 av eksamen. Rule of thumb: hvis en konsept dukker opp i [del_2_egnenotater.txt](../del_2_egnenotater.txt) eller i [powerpoints/del2/](../powerpoints/del2/), skal det finnes minst ett kort om det.

---

## 2. Filstruktur og infrastruktur

Vi gjenbruker så mye eksisterende infrastruktur som mulig. Konkret:

### 2.1 Felles JS + CSS (lages én gang, brukes i alle kapitler)

- **`flashcards.js`** (i prosjektroten, ved siden av [quiz.js](../quiz.js)) — håndterer flip, neste/forrige, shuffle, tastatur, evt. MC-klikking på fronten.
- **`flashcards.css`** (eller seksjon i [style.css](../style.css)) — kort-utseende, flip-animasjon, navigasjons-knapper, shuffle-knapp.

### 2.2 Per kapittel

I hvert chapter-`index.html` legges én ny `<section id="kapittel-eksamen">` rett *før* `<section id="quiz">` (eller etter, men før `</main>`). Inkluder `<script src="../flashcards.js"></script>` ved siden av `<script src="../quiz.js"></script>` nederst på siden.

Innhold-mengde:

| Kapittel | Antall kort (anbefalt) | Hvorav regneoppgaver |
|---|---|---|
| Kap 6 (Lagring + indekser, 6A + 6B) | 35–45 | 12–15 (B+-tre-nivåer, fyllgrad, hashing, blokk-aksess) |
| Kap 7 (Queries: aksessveier, sortering, joins) | 30–40 | 15–20 (merge-sort I/O, J1–J4-kostnad, plan-valg) |
| Kap 8 (Transaksjoner: teori, samtidighet, recovery) | 40–50 | 15–20 (presedensgraf, 2PL-låsing, ARIES-logg) |

Disse er *minimums*-mål. Underkapitler ([kap6/lagring.html](../kap6/lagring.html), [kap6/btrees.html](../kap6/btrees.html), [kap8/recovery.html](../kap8/recovery.html), osv.) kan også få en mindre, fokusert flashcard-seksjon — samme HTML-mønster, færre kort.

---

## 3. HTML-struktur

Skall (legges inn i kapittelets `index.html`):

```html
<section id="kapittel-eksamen">
  <div class="container">
    <div class="section-badge">08 · Kapittel-eksamen</div>
    <h2>Flashcards — <em>hele pensum i kortform</em></h2>
    <p class="section-intro">
      40 kort som dekker alle begrepene og regneoppgavetypene i kapittelet.
      Klikk kortet for å snu det. Bruk piltastene (← →) til å bla, eller
      <kbd>S</kbd> for å shuffle. Samme stil og vanskelighetsgrad som
      <a href="../eksamen/">øvingseksamenene</a>.
    </p>

    <div class="flashcard-deck" data-flashcards>
      <div class="flashcard-toolbar">
        <button class="fc-btn" data-fc-prev aria-label="Forrige kort">&larr; Forrige</button>
        <span class="fc-counter"><span data-fc-current>1</span> / <span data-fc-total>0</span></span>
        <button class="fc-btn" data-fc-next aria-label="Neste kort">Neste &rarr;</button>
        <button class="fc-btn fc-btn--alt" data-fc-shuffle aria-label="Shuffle kortstokken">⤨ Shuffle</button>
        <button class="fc-btn fc-btn--alt" data-fc-reset aria-label="Tilbakestill rekkefølgen">↺ Reset</button>
      </div>

      <!-- ÉN .flashcard per kort -->
      <article class="flashcard" data-fc-type="begrep">
        <header class="flashcard__head">
          <span class="flashcard__topic">Kap. 6A — Blokk &amp; record</span>
          <span class="flashcard__diff">Lett</span>
        </header>
        <div class="flashcard__inner">
          <div class="flashcard__front">
            <p class="fc-question">Hva er en <em>RID</em>, og hvorfor brukes ikke bare en absolutt byte-offset?</p>
          </div>
          <div class="flashcard__back">
            <p><strong>RID = (BlockId, slot).</strong> BlockId peker fysisk på en blokk; slot er en logisk indeks i blokkens slot directory som oversetter til faktisk byte-posisjon i blokken.</p>
            <p>Grunnen til at vi ikke bruker absolutt offset: <strong>kompaktering</strong>. Når vi sletter records og deretter komprimerer blokken, flyttes records innenfor blokken. RID-en forblir gyldig fordi slot directory-en oppdateres — alle indekser ute i systemet trenger ikke endres.</p>
            <p class="fc-ref">Pensum: <a href="lagring.html#rid">Kap. 6A — slot directory og RID</a></p>
          </div>
        </div>
      </article>

      <!-- Eksempel på regneoppgave-kort med MC på fronten -->
      <article class="flashcard" data-fc-type="regning">
        <header class="flashcard__head">
          <span class="flashcard__topic">Kap. 6B — B+-tre løvnivå</span>
          <span class="flashcard__diff">Vanskelig</span>
        </header>
        <div class="flashcard__inner">
          <div class="flashcard__front">
            <p class="fc-question">En tabell har 2 000 000 rader, 100 byte per rad og blokkstørrelse 4 KiB. Et clustered B+-tre med fyllgrad 2/3 brukes som primærindeks. Hvor mange blokker ligger på løvnivå?</p>
            <ul class="fc-opts">
              <li><span class="opt-label">A</span> ~30 000</li>
              <li><span class="opt-label">B</span> ~74 074</li>
              <li><span class="opt-label">C</span> ~50 000</li>
              <li><span class="opt-label">D</span> ~120 000</li>
            </ul>
            <span class="fc-correct" hidden>Riktig svar: B</span>
          </div>
          <div class="flashcard__back">
            <p><strong>Riktig: B (~74 074).</strong></p>
            <p>Records per blokk ved 2/3 fyllgrad: <code>floor(4096 · 2/3 / 100) = floor(27,3) = 27</code> records per blokk.</p>
            <p>Antall bladblokker: <code>ceil(2 000 000 / 27) = 74 074</code>.</p>
            <p>A glemmer å gange med 2/3 (gir <code>4096/100 = 40</code> rec/blokk → 50 000 blokker — det er C).
               D bruker feil fyllgrad (1/3) eller har kuttet floor før divisjon.</p>
            <p class="fc-ref">Pensum: <a href="btrees.html#fyllgrad">Kap. 6B — fyllgrad og bladblokker</a></p>
          </div>
        </div>
      </article>

      <!-- Flere kort … -->
    </div>
  </div>
</section>
```

### 3.1 Forklaring av strukturen

- **`.flashcard-deck[data-flashcards]`** — `flashcards.js` finner alle slike, viser ett kort om gangen og styrer navigasjon.
- **`.flashcard__inner`** — det som flippes (CSS-transform). Inni ligger `__front` og `__back`.
- **`data-fc-type`** — `"begrep"` eller `"regning"`. Brukes til å fargelegge eller filtrere senere; ikke kritisk nå, men hold konsistent.
- **`.flashcard__topic`** — alltid med kapittel-prefiks ("Kap. 6A — …", "Kap. 7 — …", "Kap. 8 ARIES — …") som speiler `.exam-q__topic` fra eksamensmalen.
- **`.flashcard__diff`** — `Lett` / `Middels` / `Vanskelig`. Samme skala som eksisterende `.q-label` i [quiz.js](../quiz.js)-quizene.
- **MC-kort:** `.fc-opts` på fronten + skjult `.fc-correct` med tekstmønsteret `Riktig svar: X` (samme parsing-mønster som `exam.js` bruker — gjenbruk, ikke gjenoppfinn). Når brukeren klikker et alternativ, fargelegges det riktige grønt og evt. feilvalg rødt; deretter snus kortet automatisk.
- **Begrepskort:** kun en `.fc-question` på fronten, ingen alternativer.
- **Bakside skal alltid inneholde:**
  1. Et utheva sluttsvar (for regneoppgaver).
  2. Steg-for-steg-utregning eller begrunnelse — *ikke* bare svar.
  3. Hvorfor distraktorer er feil (hvis MC). Samme krav som i [eksamen/genererte/MAL.md §2 "Krav til hver oppgave"](genererte/MAL.md).
  4. En `<a>` til en pensum-side i samme kapittel (ankre til relevante seksjoner — bruk de eksisterende `id`-ene i HTML-en, eller legg til nye anchors hvis nødvendig).

---

## 4. JS-oppførsel som `flashcards.js` skal levere

Minimum funksjonalitet:

1. **Init:** for hver `[data-flashcards]`, lag en intern array `order = [0, 1, 2, …]`. Vis kort 0 (`display: block`), skjul resten.
2. **Flip:** klikk på kortet (eller `Space`/`Enter` når kortet har fokus) toggler klassen `is-flipped` på `.flashcard__inner` — CSS gjør 3D-rotasjonen.
3. **Neste/forrige:** `data-fc-next` / `data-fc-prev` (eller `→` / `←`) bytter `current` modulo lengden. Når man bytter kort, **resettes flip-tilstanden** til front.
4. **Shuffle:** `data-fc-shuffle` (eller `S`) — Fisher-Yates på `order`-arrayet. Sett current = 0 igjen. Oppdater `data-fc-current` / `data-fc-total`.
5. **Reset:** `data-fc-reset` — restaurer originalrekkefølgen.
6. **Tastatur:** lytte globalt (på `.flashcard-deck`-fokus eller på dokumentet, men begrens til når dekket er synlig i viewport for å unngå konflikter). Piltaster, `Space`, `S`, `R`.
7. **MC-håndtering på regnekort:** når `.fc-opts` finnes på fronten — gjør hvert `<li>` klikkbart, parse `Riktig svar: X` fra `.fc-correct`, marker grønt/rødt, og **flip kortet automatisk etter ~250 ms** så bakside-forklaringen vises. Ingen retry — første klikk låser.
8. **Counter-oppdatering:** `[data-fc-current]` viser `currentIndex + 1`, `[data-fc-total]` viser totalt antall.
9. **A11y:** kort har `role="button"`, `tabindex="0"`, `aria-pressed` reflekterer flip-tilstand. Knappene har `aria-label`.

Implementasjonsnotat: hold scriptet i samme stil som [quiz.js](../quiz.js) og [eksamen/genererte/exam.js](genererte/exam.js) — vanlig IIFE, ingen build-step, ingen avhengigheter.

---

## 5. CSS-krav (`flashcards.css` eller del av [style.css](../style.css))

- `.flashcard` har fast min-høyde (f.eks. `min-height: 320px`) for at flip ikke skal hoppe layout.
- `.flashcard__inner` har `transform-style: preserve-3d` og `transition: transform .5s`.
- `.flashcard__front` og `.flashcard__back` har `backface-visibility: hidden`; `__back` har `transform: rotateY(180deg)`.
- `.flashcard__inner.is-flipped` har `transform: rotateY(180deg)`.
- Toolbar er sticky/fixed til toppen av seksjonen på små skjermer.
- Bruk eksisterende fargevariabler fra [style.css](../style.css) (`--paper`, `--paper-dark`, `--rust`, `--ochre`, `--ink-faded`) for konsistens med resten av nettstedet.
- For MC-alternativer på fronten: gjenbruk samme grønn/rød-paletter som [eksamen/genererte/exam.css](genererte/exam.css) (`#ecfdf5` / `#fef2f2`).

---

## 6. Innholds-rammeverk per kapittel

Hver kortstokk skal innhold-messig dekke disse blokkene. Lenkene er til seksjonene i [eksamen/genererte/MAL.md](genererte/MAL.md) som beskriver pensum mer detaljert.

### Kap 6 — Lagring og indekser (Del 2 §4.1 + §4.2)

**Begrepskort (~25):**
- Block, BlockId, RID, slot directory, page directory, flip/flop.
- Record format: fixed length, variable length record vector, delimiter.
- Heap file, linked list (full / free blocks).
- Buffer pool, pinning, page replacement, prefetching, DBMS vs OS.
- Statisk hashing, `h(K) = K mod N`, overflow chain.
- Extendible hashing, directory, global depth, local depth, doubling, splitting.
- B+-tre, fanout, intern node, blad-node, blad-lenker.
- Clustered vs unclustered indeks, primær- vs sekundærindeks.
- Composite key, leksikografisk sortering.
- LSM-tre, memtable, SSTable, write/read amplification, compaction.

**Regneoppgavekort (~12):**
- Records per blokk gitt postgrøttese + blokkstørrelse + fyllgrad.
- Antall bladblokker for N records.
- Antall nivåer i B+-tre gitt fanout.
- Antall directory-doublings i extendible hashing for en gitt nøkkelsekvens.
- Block split: hvor mange records flyttes? hvor havner split-key?
- Heap scan: blokker aksessert ved lik/range-spørring uten indeks.
- Statisk hash: gitt N blokker og nøkler, plassér og tell overflow.

### Kap 7 — Queries: aksessveier, sortering, optimalisering (Del 2 §4.3)

**Begrepskort (~18):**
- Aksessvei, filscan, indeksscan, range-scan, indeks-lookup.
- Selektivitet, statistikk fra SQL-katalog (rader, blokker, nøkkelverdier, histogrammer).
- Optimizer: logisk plan, fysisk plan, kostnadsmodell, left-deep tree.
- External merge sort, run, pass, merge factor.
- Join-algoritmer: J1 block nested loop, J2 index nested loop, J3 sort-merge, J4 partition-hash.
- Build-/probe-fase i hash join, partisjonering.
- Inner vs outer join, semi-join, anti-join.

**Regneoppgavekort (~17):**
- Blokker aksessert ved `WHERE pk = c`, `WHERE secondary = c`, `WHERE pk > c`, `ORDER BY secondary` — med både clustered og unclustered indeks.
- External merge sort: gitt B blokker og nB buffere, regn `nR = ceil(B/nB)`, `dM = min(nB-1, nR)`, antall passes = `ceil(log_dM(nR))`, totalt I/O = `2B · (1 + passes)`.
- J1 block nested loop: gitt buffer-spaces, regn ut totalt antall blokk-leser; argumenter for hvilken tabell som skal være ytre.
- J2 index nested loop: kostnad gitt indeks-høyde + heap-aksess.
- J4 hash join: hvor mange partisjoner hvis hash-tabellen ikke får plass i RAM? Recursion-dybde.
- Plan-valg: vis 4 planer med kostnad, hvilken velger optimizer?

### Kap 8 — Transaksjoner (teori + samtidighet + recovery) (Del 2 §4.4–§4.6)

**Begrepskort (~25):**
- ACID, hver bokstav koblet til mekanisme.
- Schedule, serial, serialiserbar, konfliktserialiserbar, view-serialiserbar.
- Anomalier: dirty read, dirty write, unrepeatable read, lost update, phantom — én bak per anomali med scenario.
- Recoverability: Strict ⊂ ACA ⊂ Recoverable ⊂ All.
- SQL isolation levels: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE — hvilke anomalier hindres.
- 2PL-varianter: basic, conservative, strict, rigorous.
- S/X-låser, lock compatibility matrix, lock escalation, intent locks (IS, IX, SIX).
- Deadlock: deteksjon (wait-for-graf), forebygging (wait-die, wound-wait), timeout.
- MVCC, snapshot isolation, write skew.
- WAL, force-log-at-commit, Force/No-force × Steal/No-steal-matrise (ARIES = no-force + steal).
- LSN, prevLSN, recLSN, PageLSN, transaction table, dirty page table (DPT).
- ARIES-fasene: analyse, redo, undo. CLR (compensation log record).

**Regneoppgavekort (~17):**
- Gitt schedule, bygg presedensgraf, avgjør konfliktserialiserbarhet.
- Gitt operasjonssekvens + 2PL-variant, sett låser; rekkefølge for commit; oppstår deadlock?
- Match has-locks/wants-locks-graf til operasjonssekvens.
- Gitt logg + checkpoint-state, kjør analyse-fasen og finn ny DPT + transaksjonstabell.
- For hver loggpost, avgjør om REDO trengs (DPT-medlemskap, recLSN ≥ LSN, PageLSN ≥ LSN).
- Identifiser winners/losers etter analyse.
- Gitt en isolation level og et scenario, hvilken anomali kan inntreffe?
- MVCC: gitt en sekvens av reads/writes/commits, hva ser en lang lesetransaksjon?

---

## 7. Innholdskrav per kort

Disse er strengt analoge til [eksamen/genererte/MAL.md §2 "Innholdskrav for alternativene"](genererte/MAL.md) — vi bruker samme kvalitetsskinne:

- **Definisjonen på baksiden skal være selvstendig forståelig.** Ikke "se figur" eller "se 6B" uten å gjenta hovedpoenget.
- **Regneoppgaver må vise utregningen,** ikke bare formelen og svaret. En student som glemmer formelen skal kunne lese baksiden og rekonstruere fremgangsmåten.
- **For MC-kort:** baksiden forklarer hvorfor *alle fire* alternativene er det de er — ikke bare det riktige. Følg [eksamen/genererte/MAL.md §2.5 "Innholdskrav for alternativene"](genererte/MAL.md) for å unngå at riktig svar systematisk skiller seg ut i lengde, posisjon eller form.
- **Pensum-lenken på baksiden** skal peke til den faktiske underseksjonen i kapittelet — bruk eksisterende anchors i HTML-en, eller legg til nye `id`-er der det mangler. Ikke link til andre kapitler hvis du kan unngå det (kapittel-eksamen ≈ kapittelets pensum).
- **Bredde-test:** når kortstokken er ferdig, les bare frontene. Klarer du å peke ut hva pensum dekker uten å lese baksidene? Hvis ja — bra. Hvis det er begrepsmessige hull (f.eks. ingen kort om DPT i Kap 8), legg til.

---

## 8. Sjekkliste før en kapittel-eksamen anses ferdig

- [ ] `<section id="kapittel-eksamen">` ligger i kapittelets `index.html` med riktig `<div class="section-badge">`, `<h2>` og `<p class="section-intro">`.
- [ ] Linker til `flashcards.js` og `flashcards.css` (eller integrert i [style.css](../style.css)) er på plass.
- [ ] Antall kort treffer minimum fra §2.2-tabellen.
- [ ] Hvert delpensum-blokk i §6 er representert med minst ett begrepskort + minst ett regneoppgavekort der det er relevant.
- [ ] Hver bakside har: utheva sluttsvar (regning) eller kjernedefinisjon (begrep), full begrunnelse/utregning, og pensum-lenke.
- [ ] MC-kort følger lengde- og posisjonskravene fra [eksamen/genererte/MAL.md §2](genererte/MAL.md): riktig svar er ikke systematisk lengst; A/B/C/D er jevnt fordelt over kortstokken.
- [ ] Testet i nettleser:
  - [ ] Klikk på kort flipper det.
  - [ ] Piltaster og `Space`/`S`/`R` virker som beskrevet i §4.
  - [ ] Shuffle endrer rekkefølgen, reset bringer den tilbake.
  - [ ] MC-kort: klikk på alternativ fargelegger og flipper automatisk; ingen retry.
  - [ ] Counter `data-fc-current / data-fc-total` oppdateres riktig.
  - [ ] Resize til mobil — toolbar og kort er fortsatt brukbare.
- [ ] Innholds-test: gå gjennom hele stokken én gang. Er det noen kort hvor baksiden ikke faktisk forklarer (bare gjentar spørsmålet)? Skriv om.
- [ ] Repetisjons-test: shuffle, gå gjennom 10 tilfeldige kort. Føles det som eksamen-stil og samme tone som [eksamen/genererte/eksamen_01.html](genererte/eksamen_01.html)? Hvis nei — juster språket.

---

## 9. Implementasjonsrekkefølge (anbefalt)

1. **Lag `flashcards.js` + `flashcards.css`** i prosjektroten. Gjør dem helt frittstående; test mot et lite hardkodet sett med 5 kort i en throwaway-fil.
2. **Bygg Kap 6-stokken først** (35–45 kort). Det er det største kapittelet med mest begreper og regning, så strukturen avsløres tidlig.
3. **Bygg Kap 7 og Kap 8** parallelt — strukturen er nå satt.
4. **Iterer på CSS** (animasjon, mobil-layout) når alle tre kapitler er på plass.
5. **Vurder Del 1-kapitlene senere** ([kap1/](../kap1/)–[kap4/](../kap4/) — samme oppskrift, men typisk færre regneoppgaver og flere SQL/RA-snutter på fronten).

---

## 10. Forholdet til andre quiz-/eksamens-deler

- [`<section id="quiz">`](../kap6/index.html) (eksisterende reveal-quiz) beholdes — den er en lett oppvarming. Kapittel-eksamen ligger *etter* den og er den tyngre repetisjonen.
- Underkapitler ([kap6/btrees.html](../kap6/btrees.html), [kap8/recovery.html](../kap8/recovery.html), …) kan ha *mindre* flashcard-stokker fokusert på det underkapittelet — bruk samme HTML/JS, færre kort.
- [eksamen/genererte/](genererte/) eier *fullstendige* eksamenssett (25–30 oppgaver, 100 poeng, blanding av Del 1 og Del 2). Kapittel-eksamen er repetisjon, ikke erstatning — en student som har bla-gjort gjennom alle tre kapittel-stokkene er klar for et fullt sett.
