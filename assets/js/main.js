/* Alpine Finance Summit — small progressive enhancements. Site works without JS. */
(function () {
  document.documentElement.classList.add("js");

  // Header turns solid once the hero is scrolled past
  var header = document.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile navigation
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Close desktop dropdowns on outside click / Escape
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".nav details[open]").forEach(function (d) { if (!d.contains(e.target)) d.removeAttribute("open"); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") document.querySelectorAll(".nav details[open]").forEach(function (d) { d.removeAttribute("open"); });
  });

  // Reveal-on-scroll
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  // Highlight current day in the program day-nav
  var dayLinks = document.querySelectorAll(".day-nav a");
  if (dayLinks.length && "IntersectionObserver" in window) {
    var dio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) dayLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    dayLinks.forEach(function (a) { var t = document.querySelector(a.getAttribute("href")); if (t) dio.observe(t); });
  }

  // Lightbox for galleries
  var links = Array.prototype.slice.call(document.querySelectorAll(".gallery a"));
  if (links.length && typeof HTMLDialogElement === "function") {
    var dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.setAttribute("aria-label", "Photo viewer");
    var ic = function (d) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>'; };
    dlg.innerHTML = '<div class="lb-inner"><img alt=""></div>' +
      '<button class="lb-btn lb-close" aria-label="Close">' + ic("M6 6l12 12M18 6L6 18") + '</button>' +
      '<button class="lb-btn lb-prev" aria-label="Previous photo">' + ic("M15 18l-6-6 6-6") + '</button>' +
      '<button class="lb-btn lb-next" aria-label="Next photo">' + ic("M9 18l6-6-6-6") + '</button>' +
      '<div class="lb-count"></div>';
    document.body.appendChild(dlg);
    var img = dlg.querySelector("img"), count = dlg.querySelector(".lb-count"), idx = 0;
    function show(i) {
      idx = (i + links.length) % links.length;
      img.src = links[idx].getAttribute("href");
      img.alt = (links[idx].querySelector("img") || {}).alt || "";
      count.textContent = (idx + 1) + " / " + links.length;
    }
    links.forEach(function (a, i) { a.addEventListener("click", function (e) { e.preventDefault(); show(i); dlg.showModal(); }); });
    dlg.querySelector(".lb-close").addEventListener("click", function () { dlg.close(); });
    dlg.querySelector(".lb-prev").addEventListener("click", function () { show(idx - 1); });
    dlg.querySelector(".lb-next").addEventListener("click", function () { show(idx + 1); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target.classList.contains("lb-inner")) dlg.close(); });
    dlg.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") show(idx - 1); if (e.key === "ArrowRight") show(idx + 1); });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
