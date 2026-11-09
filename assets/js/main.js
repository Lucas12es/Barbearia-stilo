(function () {
  "use strict";
  var cfg = window.STILO || {};
  var doc = document;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };

  /* Header: fundo sólido ao rolar */
  var header = $(".header");
  function onScroll() { if (header) header.classList.toggle("is-solid", window.scrollY > 24); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Menu mobile */
  var toggle = $(".menu-toggle"), nav = $("#nav");
  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") { setMenu(false); toggle.focus(); } });
  }

  /* Reveal ao rolar */
  var items = $$(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add("is-in"); }); }


  /* Lightbox da galeria */
  var lb = $("#lightbox");
  if (lb) {
    var tiles = $$(".tile"), cur = 0, big = $("img", lb);
    var show = function (i) {
      cur = (i + tiles.length) % tiles.length;
      var t = tiles[cur];
      big.src = t.getAttribute("data-full");
      big.alt = $("img", t).alt;
      big.width = +t.getAttribute("data-w"); big.height = +t.getAttribute("data-h");
    };
    tiles.forEach(function (t, i) { t.addEventListener("click", function () { show(i); if (lb.showModal) lb.showModal(); else lb.setAttribute("open", ""); }); });
    $(".lb-close", lb).addEventListener("click", function () { lb.close(); });
    $(".lb-prev", lb).addEventListener("click", function () { show(cur - 1); });
    $(".lb-next", lb).addEventListener("click", function () { show(cur + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); });
  }

  /* Ano no rodapé */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* Formulário → WhatsApp */
  var form = $("#contact-form");
  if (form) {
    var status = $("#form-status");
    var fields = {
      nome: { el: $("#f-nome"), err: $("#e-nome"), check: function (v) { return v.trim().length >= 2 ? "" : "Informe seu nome."; } },
      msg: { el: $("#f-msg"), err: $("#e-msg"), check: function (v) { return v.trim().length >= 5 ? "" : "Escreva uma mensagem curta."; } }
    };
    function validate(k) {
      var f = fields[k], m = f.check(f.el.value);
      f.err.textContent = m;
      f.el.setAttribute("aria-invalid", m ? "true" : "false");
      return !m;
    }
    Object.keys(fields).forEach(function (k) { fields[k].el.addEventListener("blur", function () { validate(k); }); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = Object.keys(fields).map(validate).every(Boolean);
      if (!ok) { status.textContent = ""; var bad = $("[aria-invalid='true']", form); if (bad) bad.focus(); return; }
      var servico = $("#f-servico").value;
      var txt = "Olá! Meu nome é " + fields.nome.el.value.trim() + "." +
        (servico ? "\nTenho interesse em: " + servico + "." : "") +
        "\n" + fields.msg.el.value.trim();
      var url = "https://wa.me/" + cfg.whatsapp + "?text=" + encodeURIComponent(txt);
      window.open(url, "_blank", "noopener");
      status.textContent = "Abrindo o WhatsApp com a sua mensagem…";
    });
  }

  /* Google Analytics com consentimento (só se gaId estiver configurado) */
  if (cfg.gaId) {
    var KEY = "stilo-consent";
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    var loadGA = function () {
      if (doc.getElementById("ga-s")) return;
      var s = doc.createElement("script"); s.id = "ga-s"; s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.gaId);
      doc.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", cfg.gaId, { anonymize_ip: true });
    };
    if (saved === "yes") loadGA();
    else if (saved !== "no") {
      var b = doc.createElement("div");
      b.className = "cookie is-open"; b.setAttribute("role", "dialog"); b.setAttribute("aria-label", "Aviso de cookies");
      b.innerHTML = '<p>Usamos cookies de medição (Google Analytics) para entender como o site é usado e melhorá-lo. Saiba mais na <a href="/politica-de-privacidade/">Política de Privacidade</a>.</p>' +
        '<div class="cookie-actions"><button class="btn btn-ghost btn-sm" type="button" data-c="no">Recusar</button><button class="btn btn-primary btn-sm" type="button" data-c="yes">Aceitar</button></div>';
      doc.body.appendChild(b);
      b.addEventListener("click", function (e) {
        var c = e.target.closest("[data-c]"); if (!c) return;
        try { localStorage.setItem(KEY, c.getAttribute("data-c")); } catch (x) {}
        if (c.getAttribute("data-c") === "yes") loadGA();
        b.remove();
      });
    }
  }
})();
