"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

const LockIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const ChartIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>;

export default function ProfilePage() {
  const { profile } = useAuth();
  const userName = profile?.display_name || "User";
  const initials = (userName).split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?";
  const [viewersUnlocked, setViewersUnlocked] = useState(false);
  const [analyticsUnlocked, setAnalyticsUnlocked] = useState(false);

  return (
    <>
      <div className="compare-bar">
        <span className="compare-tag free">Free account</span>
        <span>You&apos;re viewing a <strong>normal user</strong>.</span>
      </div>

      <section className="profile-head">
        <div className="avatar-wrap">
          <div className="avatar">{initials}</div>
        </div>
        <div className="identity">
          <div className="name-row">
            <h1 className="profile-name">{userName}</h1>
            <span className="acct-chip free">Free</span>
          </div>
          <p className="profile-role">Editorial Illustrator</p>
          <div className="profile-meta">
            <span>Nairobi, Kenya</span>
            <span className="dot">&bull;</span>
            <span>Joined 2026</span>
          </div>
          <span className="status-open"><span className="status-dot"></span> Open to work</span>
          <p className="profile-bio">I make bold, narrative illustrations for magazines, books, and brands. Ink, risograph, and a lot of colour. Previously with The Continent and Brittle Paper.</p>
          <div className="profile-actions">
            <Link href="/messages" className="btn btn-primary btn-sm">Message</Link>
            <a href="#" className="btn btn-ghost btn-sm">Save</a>
          </div>
        </div>
      </section>

      <section className="stats-row">
        <div className="stat-block"><span className="stat-value">1,240</span><span className="stat-name">Profile views</span></div>
        <div className="stat-block"><span className="stat-value">89</span><span className="stat-name">Saves</span></div>
        <div className="stat-block"><span className="stat-value">14</span><span className="stat-name">Projects</span></div>
      </section>

      <section className="profile-section">
        <h2>Work <span className="section-pill">Unlimited on free</span></h2>
        <div className="work-grid">
          {[
            { cls: "tw-a", title: "Harvest, 2026" },
            { cls: "tw-b", title: "Night Market" },
            { cls: "tw-c", title: "Cover — Issue 12" },
            { cls: "tw-d", title: "Folktales series" },
            { cls: "tw-e", title: "Brand mural" },
            { cls: "tw-f", title: "Editorial spread" },
          ].map((w) => (
            <article key={w.cls} className="work-card">
              <div className={`work-thumb ${w.cls}`}></div>
              <div className="work-meta"><span className="work-title">{w.title}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-section">
        <h2>Insights <span className="section-pill">Spend a chip to peek</span></h2>
        <div className="insight-grid">
          <div className={`insight-card${viewersUnlocked ? "" : " locked"}`}>
            {!viewersUnlocked ? (
              <>
                <div className="locked-content">
                  <h3>Who viewed your profile</h3>
                  <div className="faux-row"><div className="faux-av"></div><div className="faux-lines"><div className="faux-line"></div><div className="faux-line short"></div></div></div>
                  <div className="faux-row"><div className="faux-av"></div><div className="faux-lines"><div className="faux-line"></div><div className="faux-line short"></div></div></div>
                  <div className="faux-row"><div className="faux-av"></div><div className="faux-lines"><div className="faux-line"></div><div className="faux-line short"></div></div></div>
                </div>
                <div className="lock-overlay">
                  <div className="lock-icon"><LockIcon /></div>
                  <p className="lock-text">See who&apos;s been looking at your work</p>
                  <p className="lock-sub">Spend 1 chip for a 24-hour peek</p>
                  <div className="lock-actions">
                    <button className="chip-unlock" onClick={() => setViewersUnlocked(true)}><span className="chip-gem"></span> Unlock with 1 chip</button>
                    <a href="#" className="lock-pro-link">or go Pro for always-on &rarr;</a>
                  </div>
                </div>
              </>
            ) : (
              <div className="unlocked-content" style={{ display: "block" }}>
                <span className="unlock-flag"><span className="status-dot"></span> Unlocked &middot; 24h left</span>
                <h3>Who viewed your profile</h3>
                <div className="viewer-list">
                  {[
                    { letter: "S", name: "Creative Director", role: "Safaricom", gradient: "var(--c1),var(--c2)", time: "2h ago" },
                    { letter: "O", name: "Art Director", role: "Ogilvy Africa", gradient: "var(--c4),var(--c5)", time: "5h ago" },
                    { letter: "T", name: "Founder", role: "Twiga Foods", gradient: "var(--c3),var(--c4)", time: "Yesterday" },
                    { letter: "M", name: "Producer", role: "Showmax", gradient: "var(--c5),var(--c1)", time: "2 days ago" },
                  ].map((v) => (
                    <div key={v.letter} className="viewer">
                      <div className="viewer-av" style={{ background: `linear-gradient(135deg,${v.gradient})` }}>{v.letter}</div>
                      <div className="viewer-info"><div className="viewer-name">{v.name}</div><div className="viewer-role">{v.role}</div></div>
                      <span className="viewer-time">{v.time}</span>
                    </div>
                  ))}
                </div>
                <p className="unlock-upsell">Loved this? Pro shows every viewer, every day. <a href="#">Go Pro &rarr;</a></p>
              </div>
            )}
          </div>

          <div className={`insight-card${analyticsUnlocked ? "" : " locked"}`}>
            {!analyticsUnlocked ? (
              <>
                <div className="locked-content">
                  <h3>Profile analytics</h3>
                  <div className="faux-row"><div className="faux-lines"><div className="faux-line"></div><div className="faux-line short"></div></div></div>
                  <div className="faux-row"><div className="faux-lines"><div className="faux-line"></div><div className="faux-line short"></div></div></div>
                  <div className="faux-row"><div className="faux-lines"><div className="faux-line"></div><div className="faux-line short"></div></div></div>
                </div>
                <div className="lock-overlay">
                  <div className="lock-icon"><ChartIcon /></div>
                  <p className="lock-text">Track your reach &amp; trends</p>
                  <p className="lock-sub">Spend 1 chip for a 24-hour peek</p>
                  <div className="lock-actions">
                    <button className="chip-unlock" onClick={() => setAnalyticsUnlocked(true)}><span className="chip-gem"></span> Unlock with 1 chip</button>
                    <a href="#" className="lock-pro-link">or go Pro for always-on &rarr;</a>
                  </div>
                </div>
              </>
            ) : (
              <div className="unlocked-content" style={{ display: "block" }}>
                <span className="unlock-flag"><span className="status-dot"></span> Unlocked &middot; 24h left</span>
                <h3>Profile views — this week</h3>
                <div className="mini-chart">
                  {[45, 62, 38, 70, 100, 82, 58].map((h, i) => (
                    <div key={i} className={`bar${h === 100 ? " peak" : ""}`} style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <div className="chart-labels"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
                <p className="rank-sub" style={{ marginTop: 12 }}>&uarr; 34% vs last week &middot; peak on Friday</p>
                <p className="unlock-upsell">Want always-on analytics? <a href="#">Go Pro &rarr;</a></p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="upgrade-card reveal">
        <h2>Unlock your <span className="gradient-text">colour.</span></h2>
        <p>You&apos;ve got everything you need to get found and get hired. Pro gives you the edge — see who&apos;s watching, reach beyond your network, and rise in search.</p>
        <a href="#" className="btn btn-primary">Upgrade to Pro</a>
        <p className="price-line"><strong>KES 999</strong> / month &middot; cancel anytime</p>
      </section>
    </>
  );
}
