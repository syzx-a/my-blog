/* 信息架构升级配套交互：阅读进度 / 首页即时搜索 / 归档页标题筛选
   2026-11-05 · 无依赖，所有节点判空，可在任意页面安全加载 */
(function () {
  "use strict";

  var q = function (s, root) { return (root || document).querySelector(s); };
  var qa = function (s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };

  /* ---------- 阅读进度 ---------- */
  function initProgress() {
    var bar = q(".sy-read-progress span");
    var body = q(".post-content") || q("#content") || q(".post-single");
    if (!bar || !body) return;
    var ticking = false;
    function update() {
      var top = window.scrollY || document.documentElement.scrollTop;
      var start = body.getBoundingClientRect().top + top - 90;
      var end = start + body.offsetHeight - window.innerHeight + 180;
      var ratio = (top - start) / Math.max(1, end - start);
      ratio = Math.min(1, Math.max(0, ratio));
      bar.style.transform = "scaleX(" + ratio + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  /* ---------- 首页即时搜索 ---------- */
  function initQuickSearch() {
    var form = q("#sy-quick-form");
    var input = q("#sy-quick-input");
    var list = q("#sy-quick-results");
    var dataNode = q("#sy-quick-index");
    if (!form || !input || !list || !dataNode) return;

    var data = [];
    try { data = JSON.parse(dataNode.textContent || "[]") || []; } catch (e) { data = []; }
    var active = -1;

    function haystack(item) {
      var c = Array.isArray(item.c) ? item.c.join(" ") : (item.c || "");
      var g = Array.isArray(item.g) ? item.g.join(" ") : (item.g || "");
      return (item.t + " " + c + " " + g + " " + (item.d || "")).toLowerCase();
    }
    function mark(text, term) {
      var safe = esc(text);
      if (!term) return safe;
      var lower = safe.toLowerCase();
      var i = lower.indexOf(term);
      if (i < 0) return safe;
      return safe.slice(0, i) + "<mark>" + safe.slice(i, i + term.length) + "</mark>" + safe.slice(i + term.length);
    }
    function close() { list.hidden = true; list.innerHTML = ""; active = -1; }
    function render() {
      var term = input.value.trim().toLowerCase();
      if (!term) { close(); return; }
      var words = term.split(/\s+/);
      var hits = [];
      for (var i = 0; i < data.length && hits.length < 8; i++) {
        var h = haystack(data[i]);
        var ok = true;
        for (var j = 0; j < words.length; j++) { if (h.indexOf(words[j]) < 0) { ok = false; break; } }
        if (ok) hits.push(data[i]);
      }
      if (!hits.length) { close(); return; }
      active = -1;
      list.innerHTML = hits.map(function (it) {
        var c = Array.isArray(it.c) ? it.c.join(" · ") : (it.c || "");
        return '<li><a href="' + esc(it.u) + '"><span>' + mark(it.t, words[0]) + "</span><small>" +
          esc((it.d || "") + (c ? " · " + c : "")) + "</small></a></li>";
      }).join("");
      list.hidden = false;
    }
    function move(step) {
      var links = qa("a", list);
      if (!links.length) return;
      active = (active + step + links.length) % links.length;
      links.forEach(function (a, i) { a.classList.toggle("active", i === active); });
      links[active].scrollIntoView({ block: "nearest" });
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var links = qa("a", list);
      if (active >= 0 && links[active]) { window.location.href = links[active].href; return; }
      var term = input.value.trim();
      if (term) window.location.href = "/search/?q=" + encodeURIComponent(term);
    });
    input.addEventListener("input", render);
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Escape") { close(); input.blur(); }
    });
    document.addEventListener("click", function (e) { if (!form.contains(e.target)) close(); });
  }

  /* ---------- 全部文章：标题筛选 ---------- */
  function initArchiveFilter() {
    var input = q("#sy-archive-filter");
    var count = q("#sy-archive-count");
    var empty = q("#sy-archive-empty");
    var years = qa(".sy-year");
    if (!input || !years.length) return;
    var items = qa(".sy-archive-item");
    var total = items.length;

    function apply() {
      var term = input.value.trim().toLowerCase();
      var shown = 0;
      items.forEach(function (li) {
        var hit = !term || (li.getAttribute("data-title") || "").indexOf(term) > -1;
        li.hidden = !hit;
        if (hit) shown++;
      });
      years.forEach(function (sec) {
        var visible = qa(".sy-archive-item", sec).filter(function (li) { return !li.hidden; }).length;
        sec.hidden = visible === 0;
        var badge = q("h2 span", sec);
        if (badge) badge.textContent = term ? visible + " / " + qa(".sy-archive-item", sec).length + " 篇" : qa(".sy-archive-item", sec).length + " 篇";
      });
      if (count) count.textContent = term ? "筛选出 " + shown + " 篇（共 " + total + " 篇）" : "共 " + total + " 篇";
      if (empty) empty.hidden = shown > 0;
    }
    input.addEventListener("input", apply);
    apply();
  }

  function boot() { initProgress(); initQuickSearch(); initArchiveFilter(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
