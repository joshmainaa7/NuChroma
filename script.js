// Chroma — landing interactions

// Cursor-driven hue position on the gradient text
let huePending = false;
let lastHueX = 50;
document.addEventListener(
  "pointermove",
  (e) => {
    lastHueX = (e.clientX / window.innerWidth) * 100;
    if (!huePending) {
      huePending = true;
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--hue-x", lastHueX + "%");
        huePending = false;
      });
    }
  },
  { passive: true }
);

// Mobile hamburger menu
(function () {
  const nav = document.querySelector("header.nav");
  const navLinks = nav && nav.querySelector(".nav-links");
  if (!nav || !navLinks) return;

  const burger = document.createElement("button");
  burger.className = "nav-hamburger";
  burger.setAttribute("aria-label", "Menu");
  burger.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  nav.appendChild(burger);

  var overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.body.appendChild(overlay);

  function toggle() {
    var isOpen = navLinks.classList.toggle("open");
    overlay.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
    burger.innerHTML = isOpen
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  }

  burger.addEventListener("click", toggle);
  overlay.addEventListener("click", toggle);

  navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (navLinks.classList.contains("open")) toggle();
    });
  });
})();

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const root = document.documentElement;
    const isLight = root.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    if (next === "dark") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", "light");
    }
    localStorage.setItem("nuchroma-theme", next);
  });
}

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Cursor-tracking glow on feature cards
document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const rect = card.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${mx}%`);
    card.style.setProperty("--my", `${my}%`);
  });
});

// Subtle tilt on tilted cards
document.querySelectorAll("[data-tilt]").forEach((el) => {
  el.addEventListener("pointermove", (e) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / rect.height) * -6;
    const ry = ((e.clientX - cx) / rect.width) * 6;
    el.style.transform = `translateY(-6px) perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  el.addEventListener("pointerleave", () => {
    el.style.transform = "";
  });
});

// GSAP hero entrance
if (window.gsap) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".eyebrow", { y: 20, opacity: 0, duration: 0.7 })
    .from(".hero-title .word", { y: 60, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.3")
    .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
    .from(".hero-cta .btn", { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.4")
    .from(".hero-meta", { opacity: 0, duration: 0.6 }, "-=0.2");
}

// Scroll-driven disappearing hero + orb parallax
const heroEl = document.querySelector(".hero");
const heroInner = document.querySelector(".hero-inner");
const orbs = document.querySelectorAll(".hero-orb");

let ticking = false;
function onScroll() {
  if (!heroEl) return;
  const heroHeight = heroEl.offsetHeight;
  const y = window.scrollY;

  // 0 at top of page, 1 when scrolled a full hero height
  const progress = Math.min(Math.max(y / heroHeight, 0), 1);

  if (heroInner) {
    // Fade out, lift up, blur, slightly shrink
    heroInner.style.opacity = String(1 - progress * 1.15);
    heroInner.style.transform = `translateY(${-progress * 80}px) scale(${1 - progress * 0.04})`;
    heroInner.style.filter = `blur(${progress * 6}px)`;
  }

  // Orbs drift further and fade as you leave
  orbs.forEach((orb, i) => {
    const speeds = [0.15, 0.22, 0.1];
    orb.style.transform = `translateY(${y * speeds[i]}px) scale(${1 + progress * 0.1})`;
    orb.style.opacity = String(0.7 - progress * 0.55);
  });

  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  },
  { passive: true }
);

// Video portfolio previews — play snippet on hover (desktop), in-view (touch)
(function () {
  const videoCards = document.querySelectorAll(".work-card--video");
  if (!videoCards.length) return;

  const canHover = window.matchMedia("(hover: hover)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return; // respect reduced motion — leave the static cover

  const PREVIEW_SECONDS = 6; // hover preview length, even when the real video is long

  function getVideo(card) {
    const v = card.querySelector("video.work-video");
    if (v && !v.src && v.dataset.src) {
      v.src = v.dataset.src; // lazy-load on first interaction
      v.muted = true;
      // Keep the hover preview to a short snippet and loop it, so a long
      // video still previews as a teaser. Override per card with data-preview="N".
      const limit = parseFloat(card.dataset.preview) || PREVIEW_SECONDS;
      v.addEventListener("timeupdate", () => {
        if (v.currentTime >= limit) v.currentTime = 0;
      });
    }
    return v;
  }
  function play(card) {
    const v = getVideo(card);
    if (!v) return;
    card.classList.add("is-playing");
    try { v.currentTime = 0; } catch (e) {} // always start the snippet from the top
    const p = v.play();
    if (p && p.catch) p.catch(() => {}); // ignore autoplay rejections
  }
  function stop(card) {
    const v = card.querySelector("video.work-video");
    if (!v) return;
    card.classList.remove("is-playing");
    v.pause();
  }

  if (canHover) {
    videoCards.forEach((card) => {
      card.addEventListener("mouseenter", () => play(card));
      card.addEventListener("mouseleave", () => stop(card));
    });
  } else {
    // Touch / no hover — auto-play whichever card is most in view
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) play(entry.target);
          else stop(entry.target);
        });
      },
      { threshold: [0, 0.6, 1] }
    );
    videoCards.forEach((card) => io.observe(card));
  }
})();

