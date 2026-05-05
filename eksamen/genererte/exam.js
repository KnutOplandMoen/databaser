(function () {
  'use strict';

  function init() {
    document.querySelectorAll('.exam-q').forEach(setupQuestion);
  }

  function setupQuestion(article) {
    setupMultiChoice(article);
    setupTrueFalse(article);
  }

  function setupMultiChoice(article) {
    const opts = article.querySelector('.exam-q__opts');
    if (!opts) return;

    const correctSpan = article.querySelector('.fasit-correct');
    if (!correctSpan) return;

    const match = correctSpan.textContent.match(/Riktig svar:\s*([A-Z])/i);
    if (!match) return;
    const correctLetter = match[1].toUpperCase();

    const fasit = article.querySelector('.fasit-details');
    const summary = fasit ? fasit.querySelector('summary') : null;
    if (summary) summary.style.display = 'none';

    opts.classList.add('is-quiz');
    const items = Array.from(opts.querySelectorAll(':scope > li'));

    items.forEach((li) => {
      const labelEl = li.querySelector('.opt-label');
      if (!labelEl) return;
      const letter = labelEl.textContent.trim().toUpperCase();
      li.dataset.letter = letter;
      li.classList.add('is-clickable');
      li.setAttribute('role', 'button');
      li.setAttribute('tabindex', '0');

      const handler = () => selectAnswer(opts, items, li, letter, correctLetter, fasit);
      li.addEventListener('click', handler);
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handler();
        }
      });
    });
  }

  function selectAnswer(opts, items, chosenLi, chosenLetter, correctLetter, fasit) {
    if (opts.classList.contains('is-answered')) return;
    opts.classList.add('is-answered');

    const isCorrect = chosenLetter === correctLetter;

    items.forEach((li) => {
      li.classList.remove('is-clickable');
      li.removeAttribute('tabindex');
      li.removeAttribute('role');
      const letter = li.dataset.letter;
      if (letter === correctLetter) {
        li.classList.add('is-correct');
      }
      if (li === chosenLi && !isCorrect) {
        li.classList.add('is-wrong');
      }
    });

    if (fasit && !fasit.open) fasit.open = true;
  }

  function setupTrueFalse(article) {
    const tfList = article.querySelector('.exam-q__tf');
    if (!tfList) return;

    const fasit = article.querySelector('.fasit-details');
    const fasitOl = fasit ? fasit.querySelector('.fasit-body ol') : null;
    if (!fasitOl) return;

    const answers = Array.from(fasitOl.querySelectorAll(':scope > li')).map((li) => {
      const strong = li.querySelector('strong');
      if (!strong) return null;
      const txt = strong.textContent.trim().toLowerCase();
      if (txt === 'sant') return 'true';
      if (txt === 'usant') return 'false';
      return null;
    });

    const fields = Array.from(tfList.querySelectorAll('.exam-q__tf-field'));
    if (!fields.length) return;

    tfList.classList.add('is-quiz');

    fields.forEach((field, idx) => {
      const correct = answers[idx];
      if (!correct) return;
      field.dataset.correct = correct;

      const inputs = field.querySelectorAll('input[type="radio"]');
      inputs.forEach((input) => {
        input.addEventListener('change', () => handleTfChange(field, input, correct, tfList, fasit));
      });
    });
  }

  function handleTfChange(field, input, correct, tfList, fasit) {
    if (field.classList.contains('is-answered')) return;
    field.classList.add('is-answered');

    const isCorrect = input.value === correct;
    field.classList.add(isCorrect ? 'is-correct' : 'is-wrong');

    field.querySelectorAll('input[type="radio"]').forEach((r) => {
      if (r !== input) r.disabled = true;
    });

    if (!field.querySelector('.exam-q__tf-status')) {
      const status = document.createElement('span');
      status.className = 'exam-q__tf-status';
      status.textContent = isCorrect ? '✓ Riktig' : '✗ Feil';
      field.appendChild(status);
    }

    const allAnswered = Array.from(tfList.querySelectorAll('.exam-q__tf-field'))
      .every((f) => f.classList.contains('is-answered'));
    if (allAnswered && fasit && !fasit.open) fasit.open = true;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
