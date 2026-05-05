(function () {
  'use strict';

  function init() {
    document.querySelectorAll('[data-flashcards]').forEach(setupDeck);
  }

  function setupDeck(deck) {
    const cards = Array.from(deck.querySelectorAll('.flashcard'));
    if (!cards.length) return;

    let order = cards.map((_, i) => i);
    let current = 0;

    const totalEl = deck.querySelector('[data-fc-total]');
    const currentEl = deck.querySelector('[data-fc-current]');
    if (totalEl) totalEl.textContent = String(cards.length);

    cards.forEach(setupCard);

    function show(idx) {
      const visibleCardIdx = order[idx];
      cards.forEach((c, i) => {
        c.style.display = i === visibleCardIdx ? '' : 'none';
      });
      if (currentEl) currentEl.textContent = String(idx + 1);
      const visible = cards[visibleCardIdx];
      if (visible) {
        // Move keyboard focus to visible card so arrow keys work
        // without losing scroll position.
        try { visible.focus({ preventScroll: true }); } catch (e) { visible.focus(); }
      }
    }

    function next() {
      current = (current + 1) % order.length;
      show(current);
    }
    function prev() {
      current = (current - 1 + order.length) % order.length;
      show(current);
    }
    function shuffle() {
      // Fisher-Yates
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = order[i]; order[i] = order[j]; order[j] = tmp;
      }
      current = 0;
      resetAllCardState();
      show(current);
    }
    function reset() {
      order = cards.map((_, i) => i);
      current = 0;
      resetAllCardState();
      show(current);
    }

    function resetAllCardState() {
      cards.forEach((c) => {
        const inner = c.querySelector('.flashcard__inner');
        if (inner) inner.classList.remove('is-flipped');
        const opts = c.querySelector('.fc-opts');
        if (opts) {
          opts.classList.remove('is-answered');
          opts.querySelectorAll(':scope > li').forEach((li) => {
            li.classList.remove('is-correct', 'is-wrong');
            li.classList.add('is-clickable');
          });
        }
      });
    }

    const prevBtn = deck.querySelector('[data-fc-prev]');
    const nextBtn = deck.querySelector('[data-fc-next]');
    const shuffleBtn = deck.querySelector('[data-fc-shuffle]');
    const resetBtn = deck.querySelector('[data-fc-reset]');

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (shuffleBtn) shuffleBtn.addEventListener('click', shuffle);
    if (resetBtn) resetBtn.addEventListener('click', reset);

    deck.addEventListener('keydown', (e) => {
      if (e.target.closest('.fc-opts')) return;
      if (e.target.closest('.flashcard-toolbar')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key === 's' || e.key === 'S') { e.preventDefault(); shuffle(); }
      else if (e.key === 'r' || e.key === 'R') { e.preventDefault(); reset(); }
    });

    show(0);
  }

  function setupCard(card) {
    const inner = card.querySelector('.flashcard__inner');
    if (!inner) return;

    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Flashcard — klikk eller trykk Enter for å snu');

    function flip() {
      inner.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', inner.classList.contains('is-flipped') ? 'true' : 'false');
    }

    card.addEventListener('click', (e) => {
      // Ignore clicks on MC options or links inside the back side
      if (e.target.closest('.fc-opts')) return;
      if (e.target.closest('a')) return;
      flip();
    });

    card.addEventListener('keydown', (e) => {
      if (e.target.closest('.fc-opts')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip();
      }
    });

    setupMcOptions(card, inner);
  }

  function setupMcOptions(card, inner) {
    const optsList = card.querySelector('.fc-opts');
    if (!optsList) return;

    const correctEl = card.querySelector('.fc-correct');
    if (!correctEl) return;
    const match = correctEl.textContent.match(/Riktig svar:\s*([A-Z])/i);
    if (!match) return;
    const correctLetter = match[1].toUpperCase();

    const items = Array.from(optsList.querySelectorAll(':scope > li'));
    items.forEach((li) => {
      const labelEl = li.querySelector('.opt-label');
      if (!labelEl) return;
      const letter = labelEl.textContent.trim().toUpperCase();
      li.dataset.letter = letter;
      li.classList.add('is-clickable');
      li.setAttribute('role', 'button');
      li.setAttribute('tabindex', '0');

      const choose = (e) => {
        if (e) e.stopPropagation();
        if (optsList.classList.contains('is-answered')) return;
        optsList.classList.add('is-answered');

        items.forEach((o) => {
          o.classList.remove('is-clickable');
          if (o.dataset.letter === correctLetter) o.classList.add('is-correct');
        });
        if (letter !== correctLetter) li.classList.add('is-wrong');

        // Auto-flip to back so the explanation is shown
        setTimeout(() => {
          if (!inner.classList.contains('is-flipped')) {
            inner.classList.add('is-flipped');
            card.setAttribute('aria-pressed', 'true');
          }
        }, 350);
      };

      li.addEventListener('click', choose);
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          choose(e);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
