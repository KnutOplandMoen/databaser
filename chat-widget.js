(function () {
  'use strict';
  if (window.__DB_CHAT_WIDGET__) return;
  window.__DB_CHAT_WIDGET__ = true;

  // ─── CDN assets (with SRI) ──────────────────────────────────────────────
  var MARKED_SRC          = 'https://cdn.jsdelivr.net/npm/marked@15.0.7/lib/marked.umd.min.js';
  var MARKED_INTEGRITY    = 'sha384-EjL6IeH3KCXB9dkBQaYqnb/m6V3TOBP++kooL0bl43Vt6eCFJ2Pxck/B/dU4PB8d';
  var DOMPURIFY_SRC       = 'https://cdn.jsdelivr.net/npm/dompurify@3.2.4/dist/purify.min.js';
  var DOMPURIFY_INTEGRITY = 'sha384-eEu5CTj3qGvu9PdJuS+YlkNi7d2XxQROAFYOr59zgObtlcux1ae1Il3u7jvdCSWu';
  var KATEX_VERSION       = '0.16.21';
  var KATEX_CSS_HREF      = 'https://cdn.jsdelivr.net/npm/katex@' + KATEX_VERSION + '/dist/katex.min.css';
  var KATEX_CSS_INTEGRITY = 'sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib';
  var KATEX_JS_SRC        = 'https://cdn.jsdelivr.net/npm/katex@' + KATEX_VERSION + '/dist/katex.min.js';
  var KATEX_JS_INTEGRITY  = 'sha384-Rma6DA2IPUwhNxmrB/7S3Tno0YY7sFu9WSYMCuulLhIqYSGZ2gKCJWIqhBWqMQfh';
  var KATEX_AR_SRC        = 'https://cdn.jsdelivr.net/npm/katex@' + KATEX_VERSION + '/dist/contrib/auto-render.min.js';
  var KATEX_AR_INTEGRITY  = 'sha384-hCXGrW6PitJEwbkoStFjeJxv+fSOOQKOPbJxSfM6G5sWZjAyWhXiTIIAmQqnlLlh';

  var KATEX_DELIMITERS = [
    { left: '$$',  right: '$$',  display: true  },
    { left: '$',   right: '$',   display: false },
    { left: '\\(', right: '\\)', display: false },
    { left: '\\[', right: '\\]', display: true  },
  ];

  function loadScript(src, integrity) {
    return new Promise(function (resolve, reject) {
      if ([].slice.call(document.scripts).some(function (s) { return s.src === src; })) {
        resolve(); return;
      }
      var s = document.createElement('script');
      s.src = src;
      if (integrity) { s.integrity = integrity; s.crossOrigin = 'anonymous'; s.referrerPolicy = 'no-referrer'; }
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  function loadCss(href, integrity) {
    if ([].slice.call(document.styleSheets).some(function (s) { return s.href === href; })) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    if (integrity) { l.integrity = integrity; l.crossOrigin = 'anonymous'; l.referrerPolicy = 'no-referrer'; }
    document.head.appendChild(l);
  }

  // ─── Strings (NO only) ──────────────────────────────────────────────────
  var STR = {
    openChat: 'Spør om databaser',
    title: 'Studieassistent',
    resetAria: 'Tøm samtale',
    resetTitle: 'Start på nytt',
    closeAria: 'Lukk chat',
    closeTitle: 'Lukk',
    placeholder: 'Spør om SQL, normalformer, B+-trær, ARIES…',
    send: 'Send',
    hint: 'Studieassistenten svarer på norsk og bruker pensum (læreboken og notatene). Den kan ta feil – sjekk svar mot kilden.',
    errPrefix: 'Feil',
    presetGroupAria: 'Modellvalg',
    presetTriggerHint: 'Modell',
    presetModelLabel: 'Modell',
    presetPros: 'Fordeler',
    presetCons: 'Ulemper',
    presets: {
      fast:        { lines: ['Rask'],          badge: 'Rask', pros: ['Svarer fort', 'Lav ventetid'], cons: ['Mindre presis', 'Korte svar'] },
      balanced:    { lines: ['Balansert'],     badge: 'Mid',  pros: ['God balanse', 'Rimelig presisjon'], cons: ['Litt tregere enn rask'] },
      quality:     { lines: ['Smart','tregere'], badge: 'Tung', pros: ['Best på vanskelige spørsmål', 'Detaljert'], cons: ['Tregere', 'Kan rate-limites'] },
      quality_alt: { lines: ['Smart (alt.)'],  badge: 'Alt.', pros: ['Alternativ til Smart', 'Annerledes stil'], cons: ['Tregere', 'Variabel kvalitet'] },
    },
  };
  var PRESET_MODEL_NAMES = {
    fast:        'Liquid LFM 2.5 1.2B Instruct',
    balanced:    'Google Gemma 4 26B IT',
    quality:     'NVIDIA Nemotron 3 Super 120B',
    quality_alt: 'OpenAI GPT-OSS 120B',
  };
  var PRESET_KEY = 'db_chat_model_preset';
  var VALID_PRESETS = ['fast', 'balanced', 'quality', 'quality_alt'];

  function getPreset() {
    try {
      var v = localStorage.getItem(PRESET_KEY);
      if (VALID_PRESETS.indexOf(v) >= 0) return v;
    } catch (e) {}
    return 'balanced';
  }
  function setPreset(p) {
    try { localStorage.setItem(PRESET_KEY, p); } catch (e) {}
  }

  // ─── Page context ───────────────────────────────────────────────────────
  function getPageContext() {
    var main = document.querySelector('main');
    var chapter = (main && main.dataset && main.dataset.chapter) || '';
    if (!chapter) {
      var eb = document.querySelector('.eyebrow');
      chapter = (eb && eb.textContent.trim()) || document.title;
    }
    var section = null;
    var secs = document.querySelectorAll('section[id]');
    for (var i = 0; i < secs.length; i++) {
      var r = secs[i].getBoundingClientRect();
      if (r.top < window.innerHeight / 2) {
        var h2 = secs[i].querySelector('h2');
        section = { id: secs[i].id, title: (h2 && h2.textContent.trim()) || secs[i].id };
      }
    }
    var blocks = (main || document.body).querySelectorAll('p, li, h2, h3, h4, h5, td, th, pre, blockquote, dt, dd, figcaption');
    var vh = window.innerHeight;
    var margin = vh * 0.5;
    var visible = [];
    for (var j = 0; j < blocks.length; j++) {
      var rr = blocks[j].getBoundingClientRect();
      if (rr.bottom > -margin && rr.top < vh + margin) {
        var t = blocks[j].innerText.trim();
        if (t) visible.push(t);
      }
    }
    var text = visible.length ? visible.join('\n\n') : (main || document.body).innerText;
    return {
      locale: 'no',
      chapter: chapter,
      section: section,
      url: window.location.pathname,
      visible_text: (text || '').substring(0, 4500),
    };
  }

  // ─── Styles ─────────────────────────────────────────────────────────────
  var css = '' +
    '.dbc-toggle{position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:var(--rust,#1f4e79);color:#fff;border:none;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.18);z-index:9999;display:grid;place-items:center;font-family:var(--sans,system-ui);font-size:24px;transition:transform .15s,background .15s}' +
    '.dbc-toggle:hover{transform:scale(1.06);background:var(--rust-dark,#163758)}' +
    '.dbc-panel{position:fixed;bottom:96px;right:24px;width:420px;max-width:calc(100vw - 32px);height:min(78vh,720px);background:var(--paper,#f4f1ea);border:1px solid var(--line,#c9c0ae);border-radius:10px;box-shadow:0 18px 48px rgba(0,0,0,.22);display:none;flex-direction:column;z-index:9999;overflow:hidden;font-family:var(--serif,Georgia,serif)}' +
    '.dbc-panel.open{display:flex}' +
    '.dbc-header{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--line-soft,#ddd5c4);background:var(--paper-dark,#e8e3d6)}' +
    '.dbc-header h3{margin:0;font-size:1rem;font-weight:500;flex:1}' +
    '.dbc-icon-btn{background:none;border:none;color:var(--ink-faded,#6b6257);cursor:pointer;width:30px;height:30px;border-radius:4px;display:grid;place-items:center;font-size:18px}' +
    '.dbc-icon-btn:hover{background:var(--paper,#f4f1ea);color:var(--ink,#1a1612)}' +
    '.dbc-preset-bar{padding:6px 12px;border-bottom:1px solid var(--line-soft,#ddd5c4);background:var(--paper-dark,#e8e3d6);position:relative}' +
    '.dbc-preset-trigger{font-family:var(--mono,monospace);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-faded,#6b6257);background:none;border:1px solid var(--line,#c9c0ae);padding:4px 10px;border-radius:14px;cursor:pointer}' +
    '.dbc-preset-trigger:hover{border-color:var(--rust,#1f4e79);color:var(--rust,#1f4e79)}' +
    '.dbc-preset-pop{position:absolute;top:calc(100% + 4px);left:12px;right:12px;background:var(--paper,#f4f1ea);border:1px solid var(--line,#c9c0ae);border-radius:6px;box-shadow:0 8px 20px rgba(0,0,0,.12);padding:6px;display:none;z-index:5}' +
    '.dbc-preset-pop.open{display:block}' +
    '.dbc-preset-opt{display:block;width:100%;text-align:left;padding:8px 10px;background:none;border:none;border-radius:4px;cursor:pointer;font-family:var(--serif,Georgia);font-size:.9rem;color:var(--ink,#1a1612)}' +
    '.dbc-preset-opt:hover,.dbc-preset-opt.active{background:var(--paper-dark,#e8e3d6)}' +
    '.dbc-preset-opt small{display:block;font-family:var(--mono,monospace);font-size:.7rem;color:var(--ink-faded,#6b6257);margin-top:2px}' +
    '.dbc-messages{flex:1;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:14px;scroll-behavior:smooth}' +
    '.dbc-msg{font-size:.95rem;line-height:1.55;max-width:95%}' +
    '.dbc-msg.user{align-self:flex-end;background:var(--rust,#1f4e79);color:#fff;padding:8px 12px;border-radius:12px 12px 2px 12px;max-width:80%}' +
    '.dbc-msg.bot{align-self:flex-start;color:var(--ink,#1a1612)}' +
    '.dbc-msg.bot p{margin:0 0 .6rem}.dbc-msg.bot p:last-child{margin-bottom:0}' +
    '.dbc-msg.bot pre{background:var(--paper-dark,#e8e3d6);padding:8px 10px;border-radius:4px;font-size:.82rem;overflow-x:auto}' +
    '.dbc-msg.bot code{background:var(--paper-dark,#e8e3d6);padding:.1em .3em;border-radius:3px;font-size:.88em}' +
    '.dbc-msg.bot pre code{background:none;padding:0}' +
    '.dbc-msg.bot ul,.dbc-msg.bot ol{padding-left:1.2rem;margin:.4rem 0}' +
    '.dbc-msg.error{color:#a02020;font-style:italic}' +
    '.dbc-hint{padding:0 16px 8px;font-size:.78rem;color:var(--ink-faded,#6b6257);font-style:italic;line-height:1.4}' +
    '.dbc-form{display:flex;gap:8px;padding:10px 12px;border-top:1px solid var(--line-soft,#ddd5c4);background:var(--paper-dark,#e8e3d6)}' +
    '.dbc-form textarea{flex:1;font-family:var(--serif,Georgia);font-size:.95rem;background:var(--paper,#f4f1ea);border:1px solid var(--line,#c9c0ae);border-radius:6px;padding:8px 10px;resize:none;min-height:40px;max-height:140px;outline:none}' +
    '.dbc-form textarea:focus{border-color:var(--rust,#1f4e79)}' +
    '.dbc-form button{background:var(--rust,#1f4e79);color:#fff;border:none;border-radius:6px;padding:0 16px;font-family:var(--sans,system-ui);font-size:.9rem;cursor:pointer}' +
    '.dbc-form button:hover{background:var(--rust-dark,#163758)}' +
    '.dbc-form button:disabled{opacity:.5;cursor:wait}' +
    '.dbc-typing{font-size:.85rem;color:var(--ink-faded,#6b6257);font-style:italic}' +
    '@media (max-width:480px){.dbc-panel{right:8px;left:8px;width:auto;bottom:80px;height:calc(100vh - 100px)}.dbc-toggle{bottom:16px;right:16px}}';

  // ─── DOM ────────────────────────────────────────────────────────────────
  var styleEl, toggleBtn, panel, messagesEl, formEl, textareaEl, sendBtn, presetTrigger, presetPop;
  var history = [];
  var busy = false;

  function injectStyle() {
    styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  function buildUI() {
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'dbc-toggle';
    toggleBtn.setAttribute('aria-label', STR.openChat);
    toggleBtn.title = STR.openChat;
    toggleBtn.innerHTML = '?';
    toggleBtn.addEventListener('click', togglePanel);
    document.body.appendChild(toggleBtn);

    panel = document.createElement('div');
    panel.className = 'dbc-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', STR.title);
    panel.innerHTML =
      '<div class="dbc-header">' +
        '<h3>' + STR.title + '</h3>' +
        '<button class="dbc-icon-btn dbc-reset" aria-label="' + STR.resetAria + '" title="' + STR.resetTitle + '">↻</button>' +
        '<button class="dbc-icon-btn dbc-close" aria-label="' + STR.closeAria + '" title="' + STR.closeTitle + '">×</button>' +
      '</div>' +
      '<div class="dbc-preset-bar">' +
        '<button class="dbc-preset-trigger" aria-haspopup="true">' + STR.presetTriggerHint + ': <span class="dbc-preset-label">balansert</span> ▾</button>' +
        '<div class="dbc-preset-pop" role="menu" aria-label="' + STR.presetGroupAria + '"></div>' +
      '</div>' +
      '<div class="dbc-messages"></div>' +
      '<div class="dbc-hint">' + STR.hint + '</div>' +
      '<form class="dbc-form">' +
        '<textarea placeholder="' + STR.placeholder + '" rows="1"></textarea>' +
        '<button type="submit">' + STR.send + '</button>' +
      '</form>';
    document.body.appendChild(panel);

    messagesEl = panel.querySelector('.dbc-messages');
    formEl = panel.querySelector('.dbc-form');
    textareaEl = formEl.querySelector('textarea');
    sendBtn = formEl.querySelector('button');
    presetTrigger = panel.querySelector('.dbc-preset-trigger');
    presetPop = panel.querySelector('.dbc-preset-pop');

    panel.querySelector('.dbc-close').addEventListener('click', togglePanel);
    panel.querySelector('.dbc-reset').addEventListener('click', resetChat);
    formEl.addEventListener('submit', onSubmit);
    textareaEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); formEl.requestSubmit(); }
    });
    textareaEl.addEventListener('input', autosize);

    presetTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      presetPop.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!panel.contains(e.target)) presetPop.classList.remove('open');
    });

    renderPresetPopover();
    updatePresetLabel();
  }

  function renderPresetPopover() {
    var current = getPreset();
    presetPop.innerHTML = VALID_PRESETS.map(function (p) {
      var info = STR.presets[p];
      return '<button class="dbc-preset-opt' + (p === current ? ' active' : '') + '" data-preset="' + p + '">' +
        '<strong>' + info.lines.join(' ') + '</strong>' +
        '<small>' + PRESET_MODEL_NAMES[p] + '</small>' +
        '</button>';
    }).join('');
    presetPop.querySelectorAll('.dbc-preset-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setPreset(btn.dataset.preset);
        renderPresetPopover();
        updatePresetLabel();
        presetPop.classList.remove('open');
      });
    });
  }
  function updatePresetLabel() {
    var p = getPreset();
    var label = panel.querySelector('.dbc-preset-label');
    if (label) label.textContent = STR.presets[p].lines.join(' ').toLowerCase();
  }

  function autosize() {
    textareaEl.style.height = 'auto';
    textareaEl.style.height = Math.min(140, textareaEl.scrollHeight) + 'px';
  }

  function togglePanel() {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
      setTimeout(function () { textareaEl.focus(); }, 100);
    }
  }

  function resetChat() {
    history = [];
    messagesEl.innerHTML = '';
  }

  function appendMsg(role, text, opts) {
    var el = document.createElement('div');
    el.className = 'dbc-msg ' + role + (opts && opts.error ? ' error' : '');
    if (role === 'user') {
      el.textContent = text;
    } else {
      el.innerHTML = '<span class="dbc-typing">…</span>';
    }
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  // ─── Markdown + KaTeX render pipeline ──────────────────────────────────
  function preProcessMath(text) {
    // Recover bare-bracket math: [\n\frac{a}{b}\n] → \[ \frac{a}{b} \]
    text = text.replace(/^\s*\[\s*$([^]*?)^\s*\]\s*$/gm, '\\[\n$1\n\\]');
    text = text.replace(/^\s*\[\s*(\\[a-zA-Z][^\n]*?)\s*\]\s*$/gm, '\\[ $1 \\]');
    return text;
  }
  function renderBot(el, raw) {
    var processed = preProcessMath(raw);
    var html = (window.marked && window.marked.parse) ? window.marked.parse(processed) : processed;
    if (window.DOMPurify) html = window.DOMPurify.sanitize(html);
    el.innerHTML = html;
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(el, { delimiters: KATEX_DELIMITERS, throwOnError: false });
      } catch (e) {}
    }
  }

  // ─── Streaming request ─────────────────────────────────────────────────
  function onSubmit(e) {
    e.preventDefault();
    if (busy) return;
    var q = textareaEl.value.trim();
    if (!q) return;
    textareaEl.value = '';
    autosize();
    appendMsg('user', q);
    history.push({ role: 'user', content: q });
    var botEl = appendMsg('bot', '');
    busy = true;
    sendBtn.disabled = true;
    streamAnswer(q, botEl)
      .catch(function (err) {
        botEl.classList.add('error');
        botEl.textContent = STR.errPrefix + ': ' + (err && err.message ? err.message : err);
      })
      .finally(function () {
        busy = false;
        sendBtn.disabled = false;
        textareaEl.focus();
      });
  }

  function streamAnswer(question, botEl) {
    var payload = {
      question: question,
      preset: getPreset(),
      page_context: getPageContext(),
      history: history.slice(-10),
    };
    return fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(function (resp) {
      if (!resp.ok) {
        return resp.text().then(function (t) {
          var msg = t;
          try { msg = JSON.parse(t).error || t; } catch (e) {}
          throw new Error('HTTP ' + resp.status + ': ' + msg);
        });
      }
      var reader = resp.body.getReader();
      var dec = new TextDecoder();
      var buf = '';
      var acc = '';
      botEl.innerHTML = '';

      function pump() {
        return reader.read().then(function (r) {
          if (r.done) {
            if (buf.trim()) processLine(buf.trim());
            history.push({ role: 'assistant', content: acc });
            return;
          }
          buf += dec.decode(r.value, { stream: true });
          var lines = buf.split('\n');
          buf = lines.pop();
          for (var i = 0; i < lines.length; i++) {
            processLine(lines[i].trim());
          }
          return pump();
        });
      }

      function processLine(line) {
        if (!line) return;
        var obj;
        try { obj = JSON.parse(line); } catch (e) { return; }
        if (obj.t) {
          acc += obj.t;
          renderBot(botEl, acc);
          messagesEl.scrollTop = messagesEl.scrollHeight;
        } else if (obj.e) {
          throw new Error(obj.e);
        }
      }

      return pump();
    });
  }

  // ─── Boot ──────────────────────────────────────────────────────────────
  function boot() {
    injectStyle();
    buildUI();
    loadCss(KATEX_CSS_HREF, KATEX_CSS_INTEGRITY);
    loadScript(MARKED_SRC, MARKED_INTEGRITY)
      .then(function () { return loadScript(DOMPURIFY_SRC, DOMPURIFY_INTEGRITY); })
      .then(function () { return loadScript(KATEX_JS_SRC, KATEX_JS_INTEGRITY); })
      .then(function () { return loadScript(KATEX_AR_SRC, KATEX_AR_INTEGRITY); })
      .catch(function () { /* graceful: chat still posts plain text */ });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
