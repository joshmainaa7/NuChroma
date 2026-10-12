"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="signup-page">
      <div className="signup-orb orb-a"></div>
      <div className="signup-orb orb-b"></div>

      <div className="signup-inner">
        <div className="signup-header reveal">
          <span className="eyebrow">Create your account</span>
          <h1 className="signup-title">
            How are you <span className="gradient-text">joining?</span>
          </h1>
          <p className="signup-sub">Choose the path that fits you. You can always expand later.</p>
        </div>

        <div className="path-grid">
          <Link href="/signup/creative" className="path-card reveal" data-tilt="">
            <div className="path-glow path-glow--creative"></div>
            <div className="path-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="path-badge">For clients &amp; brands</div>
            <h2 className="path-title">I&apos;m looking for<br/>a creative</h2>
            <p className="path-desc">Discover and hire illustrators, photographers, directors, and designers. Post briefs, negotiate rates, and collaborate — all in one place.</p>
            <ul className="path-perks">
              <li>Browse living portfolios</li>
              <li>Send briefs directly in DMs</li>
              <li>Track projects and payments</li>
            </ul>
            <span className="path-cta">Get started <span className="path-arrow">&rarr;</span></span>
          </Link>

          <Link href="/signup/agency" className="path-card path-card--agency reveal" data-tilt="">
            <div className="path-glow path-glow--agency"></div>
            <div className="path-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                <rect x="6" y="14" width="36" height="26" rx="4" stroke="currentColor" strokeWidth="2.5"/>
                <path d="M16 14V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M24 26v4M20 28h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="path-badge">For studios &amp; agencies</div>
            <h2 className="path-title">Set up an<br/>agency account</h2>
            <p className="path-desc">Create a shared workspace for your whole team. Manage talent, run multiple projects, and build your agency&apos;s profile on NuChroma.</p>
            <ul className="path-perks">
              <li>Multi-seat team workspace</li>
              <li>Shared project pipelines</li>
              <li>Agency profile &amp; credits</li>
            </ul>
            <span className="path-cta">Set up agency <span className="path-arrow">&rarr;</span></span>
          </Link>
        </div>

        <p className="signup-footer-note reveal">
          Are you a creative yourself?{" "}
          <Link href="/#join" className="inline-link">Join the creator wait-list &rarr;</Link>
        </p>
      </div>
    </main>
  );
}
