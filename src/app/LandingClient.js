"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useThemeToggle } from "@/components/ThemeProvider";

export default function LandingPage() {
  const toggleTheme = useThemeToggle();
  const heroRef = useRef(null);
  const heroInnerRef = useRef(null);

  useEffect(() => {
    let huePending = false;
    let lastHueX = 50;
    function onPointerMove(e) {
      lastHueX = (e.clientX / window.innerWidth) * 100;
      if (!huePending) {
        huePending = true;
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--hue-x", lastHueX + "%");
          huePending = false;
        });
      }
    }
    document.addEventListener("pointermove", onPointerMove, { passive: true });

    // Reveal on scroll
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    // Cursor glow on feature cards
    document.querySelectorAll(".feature-card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
      });
    });

    // Tilt
    document.querySelectorAll("[data-tilt]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const rect = el.getBoundingClientRect();
        const rx = ((e.clientY - (rect.top + rect.height / 2)) / rect.height) * -6;
        const ry = ((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 6;
        el.style.transform = `translateY(-6px) perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });

    // GSAP hero
    let gsapLoaded = false;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
    script.onload = () => {
      gsapLoaded = true;
      const tl = window.gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".eyebrow", { y: 20, opacity: 0, duration: 0.7 })
        .from(".hero-title .word", { y: 60, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.3")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-cta .btn", { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.4")
        .from(".hero-meta", { opacity: 0, duration: 0.6 }, "-=0.2");
    };
    document.head.appendChild(script);

    // Scroll parallax
    let ticking = false;
    function onScroll() {
      const heroEl = heroRef.current;
      const heroInner = heroInnerRef.current;
      if (!heroEl) return;
      const progress = Math.min(Math.max(window.scrollY / heroEl.offsetHeight, 0), 1);
      if (heroInner) {
        heroInner.style.opacity = String(1 - progress * 1.15);
        heroInner.style.transform = `translateY(${-progress * 80}px) scale(${1 - progress * 0.04})`;
        heroInner.style.filter = `blur(${progress * 6}px)`;
      }
      document.querySelectorAll(".hero-orb").forEach((orb, i) => {
        const speeds = [0.15, 0.22, 0.1];
        orb.style.transform = `translateY(${window.scrollY * speeds[i]}px) scale(${1 + progress * 0.1})`;
        orb.style.opacity = String(0.7 - progress * 0.55);
      });
      ticking = false;
    }
    function scrollHandler() {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }
    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", scrollHandler);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  function handleWaitlist(e) {
    e.preventDefault();
    e.target.querySelector("button").textContent = "On the list ✦";
  }

  return (
    <div data-gsap="">
      <header className="nav">
        <Link href="/" className="brand">
          <span className="brand-dot"></span>
          <span className="brand-name">NuChroma</span>
        </Link>
        <nav className="nav-links">
          <a href="#discover">Discover</a>
          <a href="#features">Features</a>
          <Link href="/why">Why NuChroma</Link>
          <a href="#creators">Creators</a>
          <Link href="/login">Log in</Link>
          <Link href="/feed" className="nav-cta nav-demo">Try the app</Link>
          <Link href="/signup" className="nav-cta nav-signup">Sign up</Link>
          <button id="themeToggle" className="theme-toggle" aria-label="Toggle theme" title="Toggle light/dark" onClick={toggleTheme}>
            <svg className="icon-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            <svg className="icon-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
          <a href="#join" className="nav-cta">Join the wait-list</a>
        </nav>
      </header>

      <main>
        <section className="hero" ref={heroRef}>
          <div className="hero-orb orb-1"></div>
          <div className="hero-orb orb-2"></div>
          <div className="hero-orb orb-3"></div>
          <div className="hero-inner" ref={heroInnerRef}>
            <span className="eyebrow">A network for makers, not managers</span>
            <h1 className="hero-title">
              <span className="word">Where</span>{" "}
              <span className="word">creatives</span>{" "}
              <span className="word gradient-text">live in color.</span>
            </h1>
            <p className="hero-sub">
              NuChroma is the social home for illustrators, photographers, designers, directors, and everyone in between — a place to share work, find collaborators, and get hired without losing your taste.
            </p>
            <div className="hero-cta">
              <a href="#join" className="btn btn-primary">Claim your handle</a>
              <a href="#discover" className="btn btn-ghost">See the feed &rarr;</a>
            </div>
            <div className="hero-meta">
              <span>Launching soon</span>
              <span className="dot">&bull;</span>
              <span>4,200+ creators on the list</span>
            </div>
          </div>
        </section>

        <section className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {["Illustration","Photography","Direction","3D","Type","Motion","Sound","Editorial"].flatMap((s, i) => [
              <span key={`a${i}`}>{s}</span>, <span key={`d${i}`}>&bull;</span>,
              <span key={`b${i}`}>{s}</span>, <span key={`e${i}`}>&bull;</span>,
            ])}
          </div>
        </section>

        <section id="features" className="features">
          <header className="section-head reveal">
            <span className="eyebrow">What makes it NuChroma</span>
            <h2>Built for portfolios that move.</h2>
          </header>
          <div className="feature-grid">
            <article className="feature-card reveal" data-tilt="">
              <div className="card-glow"></div>
              <div className="card-num">01</div>
              <h3>Living portfolios</h3>
              <p>Drag-and-drop case studies with motion, audio and embeds. Your profile breathes — no more flat PDFs.</p>
            </article>
            <article className="feature-card reveal" data-tilt="">
              <div className="card-glow"></div>
              <div className="card-num">02</div>
              <h3>Honest signal</h3>
              <p>Likes are private. We surface saves, repeats, and reach out — the reactions that actually mean something.</p>
            </article>
            <article className="feature-card reveal" data-tilt="">
              <div className="card-glow"></div>
              <div className="card-num">03</div>
              <h3>Hired in DMs</h3>
              <p>Briefs, rates, and contracts native to chat. A fair, sliding fee that shrinks as you earn — you keep the relationship and most of the cheque.</p>
            </article>
          </div>
        </section>

        <section id="creators" className="creators">
          <header className="section-head reveal">
            <span className="eyebrow">Early voices</span>
            <h2>The first colour palette.</h2>
          </header>
          <div className="creator-row">
            {[
              { name: "Amara O.", role: "Editorial illustrator", city: "Lagos", swatch: "swatch-a" },
              { name: "Theo M.", role: "Motion director", city: "Berlin", swatch: "swatch-b" },
              { name: "Rin K.", role: "Type designer", city: "Kyoto", swatch: "swatch-c" },
              { name: "Sade A.", role: "Photographer", city: "Nairobi", swatch: "swatch-d" },
            ].map((c) => (
              <figure key={c.name} className="creator-card reveal">
                <div className={`swatch ${c.swatch}`}></div>
                <figcaption>
                  <strong>{c.name}</strong><span>{c.role} &middot; {c.city}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="join" className="join">
          <div className="join-inner reveal">
            <h2>Reserve your handle <em>before</em> the world does.</h2>
            <form className="join-form" onSubmit={handleWaitlist}>
              <input type="email" required placeholder="you@studio.com" aria-label="Email address" />
              <button type="submit">Get early access</button>
            </form>
            <p className="fineprint">No spam. One email when NuChroma opens its doors.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-dot"></span>
          <span>NuChroma</span>
        </div>
        <p>&copy; 2026 NuChroma Labs. Made for the people who make things.</p>
      </footer>
    </div>
  );
}
