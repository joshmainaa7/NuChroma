// NuChroma — in-app interactions (no backend; local state only)

// Theme toggle + pre-paint already handled in <head>
(function theme() {
  const t = document.getElementById("themeToggle");
  if (!t) return;
  t.addEventListener("click", () => {
    const root = document.documentElement;
    const light = root.getAttribute("data-theme") === "light";
    if (light) root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "light");
    localStorage.setItem("nuchroma-theme", light ? "dark" : "light");
  });
})();

// ---- Feed: like / save / follow ----
function bindToggle(selector, onClass, counterSelector) {
  document.querySelectorAll(selector).forEach((btn) => {
    btn.addEventListener("click", () => {
      const on = btn.classList.toggle(onClass);
      if (counterSelector) {
        const c = btn.querySelector(counterSelector);
        if (c) {
          const n = parseInt(c.dataset.count || c.textContent, 10) || 0;
          const next = on ? n + 1 : n - 1;
          c.dataset.count = next;
          c.textContent = next.toLocaleString();
        }
      }
    });
  });
}
bindToggle(".act-btn.like-btn", "liked", ".count");
bindToggle(".act-btn.save-btn", "saved", ".count");

document.querySelectorAll(".post-follow, .suggest-follow").forEach((btn) => {
  btn.addEventListener("click", () => {
    const on = btn.classList.toggle("following");
    btn.textContent = on ? "Following" : "Follow";
  });
});

// ---- Feed: comments ----
document.querySelectorAll(".comment-form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    const text = input.value.trim();
    if (!text) return;
    const list = form.closest(".post-comments");
    const c = document.createElement("div");
    c.className = "comment";
    c.innerHTML =
      '<span class="av av-sm" style="background:linear-gradient(135deg,var(--c4),var(--c1))">JM</span>' +
      '<div class="comment-body"><b>Joshua Maina</b> ' + escapeHtml(text) + "</div>";
    list.insertBefore(c, form);
    input.value = "";
  });
});

// ---- Discover: filter chips ----
document.querySelectorAll(".f-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    if (chip.dataset.all !== undefined) {
      document.querySelectorAll(".f-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      return;
    }
    document.querySelector('.f-chip[data-all]')?.classList.remove("active");
    chip.classList.toggle("active");
  });
});

// ---- Messages: switch conversation + send ----
document.querySelectorAll(".conv").forEach((conv) => {
  conv.addEventListener("click", () => {
    document.querySelectorAll(".conv").forEach((c) => c.classList.remove("active"));
    conv.classList.add("active");
    conv.classList.remove("conv-unread");
    const badge = conv.querySelector(".conv-badge");
    if (badge) badge.remove();
  });
});

const compose = document.querySelector(".thread-compose");
if (compose) {
  const body = document.querySelector(".thread-body");
  const input = compose.querySelector("input");
  const send = () => {
    const text = input.value.trim();
    if (!text) return;
    const b = document.createElement("div");
    b.className = "bubble out";
    b.innerHTML = escapeHtml(text) + '<span class="bubble-time">Just now</span>';
    body.appendChild(b);
    body.scrollTop = body.scrollHeight;
    input.value = "";
    // canned reply for a touch of life
    setTimeout(() => {
      const r = document.createElement("div");
      r.className = "bubble in";
      r.innerHTML = "Sounds good — let me confirm and send the brief over. 👍<span class=\"bubble-time\">Just now</span>";
      body.appendChild(r);
      body.scrollTop = body.scrollHeight;
    }, 1400);
  };
  compose.addEventListener("submit", (e) => { e.preventDefault(); send(); });
  const sbtn = compose.querySelector(".send-btn");
  if (sbtn) sbtn.addEventListener("click", send);
  if (body) body.scrollTop = body.scrollHeight;
}

// ---- Contracts: release milestone payments from escrow ----
(function contracts() {
  const heldEl = document.getElementById("escrowHeld");
  if (!heldEl) return;
  const releasedEl = document.getElementById("escrowReleased");
  const fmt = (n) => "KES " + n.toLocaleString();

  document.querySelectorAll(".ms-action").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ms = btn.closest(".milestone");
      const amount = parseInt(ms.dataset.amount, 10) || 0;

      ms.classList.remove("current");
      ms.classList.add("done");
      ms.querySelector(".ms-mark").innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      const status = ms.querySelector(".ms-status");
      status.className = "ms-status paid";
      status.textContent = "Paid";
      btn.remove();

      // move money: escrow held -> released
      const held = Math.max(0, (parseInt(heldEl.dataset.val, 10) || 0) - amount);
      const released = (parseInt(releasedEl.dataset.val, 10) || 0) + amount;
      heldEl.dataset.val = held; heldEl.textContent = fmt(held);
      releasedEl.dataset.val = released; releasedEl.textContent = fmt(released);

      // advance the next milestone to "current"
      const next = ms.nextElementSibling;
      if (next && next.classList.contains("milestone")) next.classList.add("current");

      // log it
      const log = document.querySelector(".timeline");
      if (log) {
        const item = document.createElement("div");
        item.className = "tl-item";
        item.innerHTML =
          '<div class="tl-text">You released <b>' + fmt(amount) + "</b> for “" +
          ms.querySelector(".ms-name").textContent + "”</div><div class=\"tl-time\">Just now</div>";
        log.insertBefore(item, log.firstChild);
      }
    });
  });
})();

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ---- Hover video previews (feed) ----
(function videoPreview() {
  const cards = document.querySelectorAll(".work-card--video");
  if (!cards.length) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canHover = matchMedia("(hover: hover)").matches;
  const LIMIT = 6;
  function getV(card) {
    const v = card.querySelector(".work-video");
    if (v && !v.src && v.dataset.src) {
      v.src = v.dataset.src; v.muted = true;
      const lim = parseFloat(card.dataset.preview) || LIMIT;
      v.addEventListener("timeupdate", () => { if (v.currentTime >= lim) v.currentTime = 0; });
    }
    return v;
  }
  function play(card) { const v = getV(card); if (!v) return; card.classList.add("is-playing"); try { v.currentTime = 0; } catch (e) {} const p = v.play(); if (p && p.catch) p.catch(() => {}); }
  function stop(card) { const v = card.querySelector(".work-video"); if (!v) return; card.classList.remove("is-playing"); v.pause(); }
  if (canHover) {
    cards.forEach((c) => { c.addEventListener("mouseenter", () => play(c)); c.addEventListener("mouseleave", () => stop(c)); });
  } else {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && e.intersectionRatio >= 0.6) play(e.target); else stop(e.target);
    }), { threshold: [0, 0.6, 1] });
    cards.forEach((c) => io.observe(c));
  }
})();
