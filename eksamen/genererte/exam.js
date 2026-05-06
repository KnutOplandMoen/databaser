(function () {
  'use strict';

  const score = {
    earned: 0,
    totalPoints: 0,
    answered: 0,
    totalQuestions: 0,
    el: null,
    earnedEl: null,
    totalEl: null,
    answeredEl: null,
    qTotalEl: null,
    barFillEl: null,
  };

  function init() {
    const articles = document.querySelectorAll('.exam-q');
    if (!articles.length) return;

    articles.forEach((article) => {
      const points = parsePoints(article.querySelector('.exam-q__points'));
      article.dataset.examPoints = String(points);
      score.totalPoints += points;
      score.totalQuestions += 1;
    });

    buildTracker();

    articles.forEach(setupQuestion);
  }

  function setupQuestion(article) {
    setupMultiChoice(article);
    setupTrueFalse(article);
  }

  function parsePoints(el) {
    if (!el) return 0;
    const m = el.textContent.match(/(\d+(?:[.,]\d+)?)/);
    if (!m) return 0;
    return parseFloat(m[1].replace(',', '.'));
  }

  function fmtPoints(n) {
    const rounded = Math.round(n * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  }

  function buildTracker() {
    const wrap = document.createElement('aside');
    wrap.className = 'exam-tracker';
    wrap.setAttribute('aria-label', 'Poengoversikt');
    wrap.innerHTML = [
      '<div class="exam-tracker__row">',
      '  <span class="exam-tracker__label">Poeng</span>',
      '  <span class="exam-tracker__score">',
      '    <span class="exam-tracker__earned">0</span>',
      '    <span class="exam-tracker__sep">/</span>',
      '    <span class="exam-tracker__total">0</span>',
      '  </span>',
      '</div>',
      '<div class="exam-tracker__bar"><div class="exam-tracker__bar-fill"></div></div>',
      '<div class="exam-tracker__row exam-tracker__sub">',
      '  <span>Besvart</span>',
      '  <span><span class="exam-tracker__answered">0</span> / <span class="exam-tracker__qtotal">0</span></span>',
      '</div>',
    ].join('');

    document.body.appendChild(wrap);

    score.el = wrap;
    score.earnedEl = wrap.querySelector('.exam-tracker__earned');
    score.totalEl = wrap.querySelector('.exam-tracker__total');
    score.answeredEl = wrap.querySelector('.exam-tracker__answered');
    score.qTotalEl = wrap.querySelector('.exam-tracker__qtotal');
    score.barFillEl = wrap.querySelector('.exam-tracker__bar-fill');

    score.totalEl.textContent = fmtPoints(score.totalPoints);
    score.qTotalEl.textContent = String(score.totalQuestions);
    updateTracker();
  }

  function updateTracker() {
    if (!score.el) return;
    score.earnedEl.textContent = fmtPoints(score.earned);
    score.answeredEl.textContent = String(score.answered);
    const pct = score.totalPoints > 0
      ? Math.max(0, Math.min(100, (score.earned / score.totalPoints) * 100))
      : 0;
    score.barFillEl.style.width = pct.toFixed(1) + '%';
    if (score.answered >= score.totalQuestions && score.totalQuestions > 0) {
      score.el.classList.add('is-complete');
    }
  }

  function addEarned(points) {
    score.earned += points;
    updateTracker();
  }

  function markAnswered() {
    score.answered += 1;
    updateTracker();
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

      const handler = () => selectAnswer(article, opts, items, li, letter, correctLetter, fasit);
      li.addEventListener('click', handler);
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handler();
        }
      });
    });
  }

  function selectAnswer(article, opts, items, chosenLi, chosenLetter, correctLetter, fasit) {
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

    const points = parseFloat(article.dataset.examPoints) || 0;
    if (isCorrect) addEarned(points);
    markAnswered();

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

    const totalPoints = parseFloat(article.dataset.examPoints) || 0;
    const scoringFields = fields.filter((_, idx) => answers[idx]);
    const pointsPerField = scoringFields.length > 0 ? totalPoints / scoringFields.length : 0;

    fields.forEach((field, idx) => {
      const correct = answers[idx];
      if (!correct) return;
      field.dataset.correct = correct;

      const inputs = field.querySelectorAll('input[type="radio"]');
      inputs.forEach((input) => {
        input.addEventListener('change', () => handleTfChange(field, input, correct, tfList, fasit, pointsPerField));
      });
    });
  }

  function handleTfChange(field, input, correct, tfList, fasit, pointsPerField) {
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

    if (isCorrect) addEarned(pointsPerField);

    const allAnswered = Array.from(tfList.querySelectorAll('.exam-q__tf-field'))
      .every((f) => f.classList.contains('is-answered'));
    if (allAnswered) {
      markAnswered();
      if (fasit && !fasit.open) fasit.open = true;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
