/* Chapter 8 — interactive components: tx-stepper and multiple-choice quizzes */

(function () {
  /* ─── Multiple-choice quizzes ─── */
  document.querySelectorAll('[data-mcq]').forEach(function (mcq) {
    var options = mcq.querySelectorAll('.mcq-option');
    var feedback = mcq.querySelector('.mcq-feedback');

    options.forEach(function (opt) {
      opt.addEventListener('click', function () {
        if (mcq.classList.contains('answered')) return;
        var isCorrect = opt.dataset.correct === 'true';

        options.forEach(function (o) { o.classList.add('locked'); });
        opt.classList.add(isCorrect ? 'correct' : 'wrong');

        // Reveal correct option if user picked wrong
        if (!isCorrect) {
          options.forEach(function (o) {
            if (o.dataset.correct === 'true') o.classList.add('correct');
          });
        }

        if (feedback) {
          feedback.classList.add('show');
          if (!isCorrect) feedback.classList.add('wrong-feedback');
        }
        mcq.classList.add('answered');
      });
    });
  });

  /* ─── Transaction steppers ───
     A stepper has:
       - a timeline grid with cells marked data-step="N"
       - controls: prev / next / reset buttons
       - narration: <div class="tx-stepper-narration"> with optional state-display
       - data-narrations on root: JSON array of strings
       - data-states on root: JSON array of {A,B,...} state objects per step (optional)
  */
  document.querySelectorAll('[data-stepper]').forEach(function (root) {
    var cells = Array.from(root.querySelectorAll('.tx-cell.has-op, .tx-cell.write, .tx-cell.commit, .tx-cell.abort'));
    var narration = root.querySelector('.tx-stepper-narration');
    var counter = root.querySelector('.step-counter');
    var btnPrev = root.querySelector('[data-step-prev]');
    var btnNext = root.querySelector('[data-step-next]');
    var btnReset = root.querySelector('[data-step-reset]');
    var stateBoxes = root.querySelectorAll('[data-state]');

    var narrations = [];
    var states = [];
    try { narrations = JSON.parse(root.dataset.narrations || '[]'); } catch (e) {}
    try { states = JSON.parse(root.dataset.states || '[]'); } catch (e) {}

    var totalSteps = cells.length;
    var current = 0; // 0 = nothing applied yet

    function render() {
      cells.forEach(function (cell, i) {
        cell.classList.remove('active', 'past', 'future');
        if (i + 1 === current) cell.classList.add('active');
        else if (i + 1 < current) cell.classList.add('past');
        else cell.classList.add('future');
      });

      if (counter) {
        counter.textContent = 'Steg ' + current + ' / ' + totalSteps;
      }

      if (narration) {
        var idx = current === 0 ? 0 : current; // narrations index aligned: idx 0 = "click next" etc
        narration.textContent = narrations[current] || (current === 0 ? 'Trykk «Neste» for å starte.' : '');
      }

      if (states.length && stateBoxes.length) {
        var s = states[current] || {};
        var prev = states[Math.max(0, current - 1)] || {};
        stateBoxes.forEach(function (box) {
          var key = box.dataset.state;
          var v = s[key];
          var prevV = prev[key];
          var valSpan = box.querySelector('.state-value');
          if (valSpan) valSpan.textContent = (v === undefined || v === null) ? '—' : v;
          if (current > 0 && prevV !== v) {
            box.classList.add('changed');
            setTimeout(function () { box.classList.remove('changed'); }, 600);
          }
        });
      }

      if (btnPrev) btnPrev.disabled = current === 0;
      if (btnNext) btnNext.disabled = current === totalSteps;
    }

    if (btnNext) btnNext.addEventListener('click', function () { if (current < totalSteps) { current++; render(); } });
    if (btnPrev) btnPrev.addEventListener('click', function () { if (current > 0) { current--; render(); } });
    if (btnReset) btnReset.addEventListener('click', function () { current = 0; render(); });

    render();
  });

  /* ─── ARIES phase animator ─── */
  document.querySelectorAll('[data-aries-anim]').forEach(function (root) {
    var phases = root.querySelectorAll('.aries-phase');
    var btn = root.querySelector('[data-aries-play]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      btn.disabled = true;
      var i = 0;
      function step() {
        phases.forEach(function (p) { p.classList.remove('active'); });
        if (i < phases.length) {
          phases[i].classList.add('active');
          i++;
          setTimeout(step, 1400);
        } else {
          setTimeout(function () {
            phases.forEach(function (p) { p.classList.remove('active'); });
            btn.disabled = false;
          }, 800);
        }
      }
      step();
    });
  });

  /* ─── Precedence graph builder ─── */
  document.querySelectorAll('[data-precedence]').forEach(function (root) {
    var ops = Array.from(root.querySelectorAll('[data-op]'));
    var svg = root.querySelector('svg.pgraph');
    var btn = root.querySelector('[data-pg-step]');
    var reset = root.querySelector('[data-pg-reset]');
    var verdict = root.querySelector('[data-pg-verdict]');
    if (!svg || !btn) return;

    var addedEdges = new Set();
    var revealedOps = 0;

    function showOp(idx) {
      if (idx >= ops.length) return;
      var op = ops[idx];
      op.classList.add('revealed');
      var edges = (op.dataset.edges || '').split(',').filter(Boolean);
      edges.forEach(function (e) {
        if (addedEdges.has(e)) return;
        addedEdges.add(e);
        var line = svg.querySelector('[data-edge="' + e + '"]');
        if (line) line.classList.add('shown');
      });
    }

    btn.addEventListener('click', function () {
      if (revealedOps < ops.length) {
        showOp(revealedOps);
        revealedOps++;
      }
      if (revealedOps === ops.length) {
        btn.disabled = true;
        if (verdict) verdict.classList.add('show');
      }
    });

    if (reset) reset.addEventListener('click', function () {
      ops.forEach(function (o) { o.classList.remove('revealed'); });
      svg.querySelectorAll('[data-edge]').forEach(function (e) { e.classList.remove('shown'); });
      addedEdges.clear();
      revealedOps = 0;
      btn.disabled = false;
      if (verdict) verdict.classList.remove('show');
    });
  });
})();
