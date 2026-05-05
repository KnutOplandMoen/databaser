(function () {
  'use strict';

  var PAGES = [
    'kap1/index.html',
    'kap2/relasjonsmodellen.html',
    'kap2/relasjonsalgebra.html',
    'kap3/ddl-og-spoerringer.html',
    'kap3/joins-og-subqueries.html',
    'kap3/views-transaksjoner-integritet.html',
    'kap3/prosedyrer-triggere-rekursjon.html',
    'kap4/er-modellen.html',
    'kap4/er-til-relasjon.html',
    'kap4/normalformer.html',
    'kap6/lagring.html',
    'kap6/btrees.html',
    'kap7/innhold.html',
    'kap8/intro-og-teori.html',
    'kap8/samtidighet-og-laser.html',
    'kap8/recovery.html',
    'reisen/index.html',
    'zero-to-hero/index.html',
  ];

  // Detect depth: chapter pages (/kapN/foo.html, /reisen/, /zero-to-hero/) need '../', root pages need ''
  var PREFIX = /\/(kap\d+|reisen|zero-to-hero|en)\//i.test(window.location.pathname) ? '../' : '';
  var FUSE_SRC = 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js';

  var input = document.getElementById('nav-search');
  var results = document.getElementById('nav-search-results');
  if (!input || !results) return;

  var fuse = null;
  var index = [];
  var activeIdx = -1;
  var debounceTimer = null;

  function loadFuse() {
    return new Promise(function (resolve, reject) {
      if (window.Fuse) return resolve(window.Fuse);
      var s = document.createElement('script');
      s.src = FUSE_SRC;
      s.onload = function () { resolve(window.Fuse); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function buildIndex() {
    return Promise.all(PAGES.map(function (page) {
      return fetch(PREFIX + page)
        .then(function (r) { return r.text(); })
        .then(function (html) {
          var doc = new DOMParser().parseFromString(html, 'text/html');
          var main = doc.querySelector('main');
          var chapter = (main && main.dataset && main.dataset.chapter) || '';
          var h1 = doc.querySelector('h1');
          var pageTitle = h1 ? h1.textContent.trim() : page;
          var sections = doc.querySelectorAll('section[id]');
          var entries = [];
          if (sections.length) {
            sections.forEach(function (sec) {
              var h2 = sec.querySelector('h2');
              entries.push({
                title: (h2 && h2.textContent.trim()) || pageTitle,
                chapter: chapter,
                url: PREFIX + page + '#' + sec.id,
                body: sec.textContent.replace(/\s+/g, ' ').trim(),
              });
            });
          } else {
            var root = main || doc.body;
            entries.push({
              title: pageTitle,
              chapter: chapter,
              url: PREFIX + page,
              body: root ? root.textContent.replace(/\s+/g, ' ').trim() : '',
            });
          }
          return entries;
        })
        .catch(function () { return []; });
    })).then(function (lists) {
      lists.forEach(function (l) { index = index.concat(l); });
      return index;
    });
  }

  function snippet(body, query) {
    var lower = body.toLowerCase();
    var q = query.toLowerCase();
    var pos = lower.indexOf(q);
    var start = pos < 0 ? 0 : Math.max(0, pos - 60);
    var end = Math.min(body.length, start + 160);
    var out = body.slice(start, end);
    if (start > 0) out = '…' + out;
    if (end < body.length) out = out + '…';
    return out;
  }

  function highlight(text, query) {
    var words = query.split(/\s+/).filter(function (w) { return w.length >= 2; });
    if (!words.length) return text;
    var escaped = words.map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|');
    var re = new RegExp('(' + escaped + ')', 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  function render(hits, query) {
    if (!hits.length) {
      results.innerHTML = '<div class="nav-sr-empty">Ingen treff for «' + query + '»</div>';
      results.classList.add('open');
      return;
    }
    var html = hits.slice(0, 8).map(function (h, i) {
      var item = h.item;
      var snip = snippet(item.body, query);
      return '<a class="nav-sr-item' + (i === activeIdx ? ' nav-sr-active' : '') +
        '" href="' + item.url + '" data-idx="' + i + '">' +
        '<div class="nav-sr-chapter">' + (item.chapter || '') + '</div>' +
        '<div class="nav-sr-title">' + highlight(item.title, query) + '</div>' +
        '<div class="nav-sr-body">' + highlight(snip, query) + '</div>' +
        '</a>';
    }).join('');
    results.innerHTML = html;
    results.classList.add('open');
  }

  function search(q) {
    if (!fuse || q.length < 2) { results.classList.remove('open'); return; }
    activeIdx = -1;
    var hits = fuse.search(q);
    render(hits, q);
  }

  function init() {
    input.placeholder = 'Laster…';
    input.disabled = true;
    loadFuse()
      .then(buildIndex)
      .then(function () {
        fuse = new window.Fuse(index, {
          keys: [
            { name: 'title', weight: 0.45 },
            { name: 'body', weight: 0.45 },
            { name: 'chapter', weight: 0.10 },
          ],
          threshold: 0.3,
          ignoreLocation: true,
          includeMatches: true,
          minMatchCharLength: 2,
        });
        input.placeholder = 'Søk i alle kapitler…';
        input.disabled = false;
      })
      .catch(function () {
        input.placeholder = 'Søk utilgjengelig';
      });

    input.addEventListener('input', function (e) {
      clearTimeout(debounceTimer);
      var q = e.target.value.trim();
      debounceTimer = setTimeout(function () { search(q); }, 150);
    });

    input.addEventListener('keydown', function (e) {
      var items = results.querySelectorAll('.nav-sr-item');
      if (!items.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = (activeIdx + 1) % items.length;
        items.forEach(function (it, i) { it.classList.toggle('nav-sr-active', i === activeIdx); });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = (activeIdx - 1 + items.length) % items.length;
        items.forEach(function (it, i) { it.classList.toggle('nav-sr-active', i === activeIdx); });
      } else if (e.key === 'Enter') {
        if (activeIdx >= 0) { e.preventDefault(); items[activeIdx].click(); }
      } else if (e.key === 'Escape') {
        results.classList.remove('open');
        input.blur();
      }
    });

    document.addEventListener('click', function (e) {
      if (!results.contains(e.target) && e.target !== input) {
        results.classList.remove('open');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
