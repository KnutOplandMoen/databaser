(function () {
  // Reveal-style quiz
  document.querySelectorAll('[data-quiz]').forEach(function (quiz) {
    var btn = quiz.querySelector('.reveal-btn');
    var answer = quiz.querySelector('.answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      answer.classList.add('show');
      btn.classList.add('used');
      btn.disabled = true;
    });
  });

  // Multiple-choice quiz
  document.querySelectorAll('.quiz.mcq').forEach(function (quiz) {
    var opts = quiz.querySelectorAll('.mcq-opt');
    var fb = quiz.querySelector('.mcq-feedback');
    var letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    opts.forEach(function (opt, i) {
      if (!opt.dataset.letter) opt.dataset.letter = letters[i] || '';
      opt.addEventListener('click', function () {
        if (quiz.dataset.locked === '1') return;
        var correct = opt.dataset.correct === '1';
        opt.classList.add(correct ? 'correct' : 'wrong');
        if (!correct) return; // allow retry on wrong
        quiz.dataset.locked = '1';
        opts.forEach(function (o) {
          o.classList.add('locked');
          if (o.dataset.correct === '1') o.classList.add('correct');
        });
        if (fb) {
          fb.classList.add('show');
          fb.classList.remove('wrong');
        }
      });
    });
  });

  // Animated step controllers for execution order, joins, etc.
  document.querySelectorAll('[data-anim]').forEach(function (root) {
    var btns = root.querySelectorAll('[data-step]');
    var stepDisp = root.querySelector('.anim-step');
    function setStep(n) {
      root.dataset.current = n;
      btns.forEach(function (b) {
        b.classList.toggle('active', b.dataset.step === String(n));
      });
      root.querySelectorAll('[data-show-on]').forEach(function (el) {
        var show = el.dataset.showOn.split(',').map(function (x) { return x.trim(); });
        var visible = show.indexOf(String(n)) !== -1;
        el.style.transition = 'opacity .35s ease';
        el.style.opacity = visible ? '1' : '0';
        // SVG elements need display toggled to fully hide for non-overlapping animations
        if (el.namespaceURI === 'http://www.w3.org/2000/svg') {
          el.style.pointerEvents = visible ? 'auto' : 'none';
        }
      });
      root.querySelectorAll('[data-text-on]').forEach(function (el) {
        var data = JSON.parse(el.dataset.textOn);
        if (data[n]) el.textContent = data[n];
      });
      if (stepDisp && root.dataset.maxStep) {
        stepDisp.textContent = 'Steg ' + n + ' / ' + root.dataset.maxStep;
      }
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () { setStep(Number(b.dataset.step)); });
    });
    var nextBtn = root.querySelector('[data-next]');
    var prevBtn = root.querySelector('[data-prev]');
    var resetBtn = root.querySelector('[data-reset]');
    if (nextBtn) nextBtn.addEventListener('click', function () {
      var cur = Number(root.dataset.current || 1);
      var max = Number(root.dataset.maxStep || 1);
      setStep(cur < max ? cur + 1 : 1);
    });
    if (prevBtn) prevBtn.addEventListener('click', function () {
      var cur = Number(root.dataset.current || 1);
      var max = Number(root.dataset.maxStep || 1);
      setStep(cur > 1 ? cur - 1 : max);
    });
    if (resetBtn) resetBtn.addEventListener('click', function () { setStep(1); });
    setStep(1);
  });

  // Try-it sandbox: evaluate a tiny JS-described query against a sample table
  document.querySelectorAll('.tryit').forEach(function (box) {
    var ta = box.querySelector('textarea');
    var btn = box.querySelector('.tryit-btn');
    var out = box.querySelector('.tryit-out');
    var fnRaw = box.dataset.check; // global fn name on window that takes the textarea text and returns {ok, msg}
    if (!btn || !ta || !out) return;
    btn.addEventListener('click', function () {
      out.classList.remove('err');
      try {
        var fn = fnRaw && window[fnRaw];
        var res = fn ? fn(ta.value) : { ok: true, msg: 'Ingen evaluator definert.' };
        out.textContent = res.msg;
        out.classList.add('show');
        if (!res.ok) out.classList.add('err');
      } catch (e) {
        out.textContent = 'Feil: ' + e.message;
        out.classList.add('show', 'err');
      }
    });
  });
})();
