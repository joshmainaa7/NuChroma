"use client";

import { useState } from "react";
import Link from "next/link";

const FILTERS = ["All", "Illustration", "Photography", "Motion", "3D", "Design", "Type", "Direction"];

const CREATIVES = [
  { initials: "EN", name: "Eva Njeri", role: "Motion director · Nairobi", gradient: "var(--c1),var(--c5)", pro: true, ring: true, openToWork: true, rate: "KES 4,500", ratePer: "day", covers: ["var(--c1),var(--c5)", "var(--c4),var(--c3)", "var(--c2),var(--c1)"] },
  { initials: "BO", name: "Brian Otieno", role: "Photographer · Kisumu", gradient: "var(--c4),var(--c3)", reply: "~2h", rate: "KES 30,000", ratePer: "project", covers: ["var(--c4),var(--c5)", "var(--c3),var(--c4)", "var(--c1),var(--c2)"] },
  { initials: "WK", name: "Wanjiru Kamau", role: "3D artist · Nakuru", gradient: "var(--c2),var(--c1)", openToWork: true, rate: "KES 3,000", ratePer: "day", covers: ["var(--c2),var(--c1)", "var(--c5),var(--c3)", "var(--c4),var(--c5)"] },
  { initials: "AH", name: "Aisha Hassan", role: "Type designer · Mombasa", gradient: "var(--c5),var(--c2)", reply: "~1d", rate: "KES 60,000", ratePer: "project", covers: ["var(--c5),var(--c2)", "var(--c1),var(--c4)", "var(--c3),var(--c2)"] },
  { initials: "DM", name: "David Mwangi", role: "Filmmaker · Nairobi", gradient: "var(--c3),var(--c4)", openToWork: true, rate: "KES 80,000", ratePer: "project", covers: ["var(--c3),var(--c4)", "var(--c5),var(--c1)", "var(--c2),var(--c3)"] },
  { initials: "NW", name: "Naomi Wairimu", role: "Illustrator · Nairobi", gradient: "var(--c1),var(--c3)", openToWork: true, rate: "KES 20,000", ratePer: "project", covers: ["var(--c1),var(--c3)", "var(--c2),var(--c5)", "var(--c4),var(--c1)"] },
];

export default function DiscoverPage() {
  const [active, setActive] = useState("All");

  return (
    <>
      <div className="page-head">
        <h1>Discover creatives</h1>
        <p>Find the right person by craft, city, availability, and rate.</p>
      </div>

      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button key={f} className={`f-chip${active === f ? " active" : ""}`} onClick={() => setActive(f)} {...(f === "All" ? { "data-all": "" } : {})}>{f}</button>
        ))}
        <span className="f-sep"></span>
        <select className="f-select"><option>All of Kenya</option><option>Nairobi</option><option>Mombasa</option><option>Kisumu</option><option>Remote</option></select>
        <select className="f-select"><option>Any availability</option><option>Open to work</option><option>Available this week</option></select>
        <select className="f-select"><option>Any rate</option><option>Under KES 30k</option><option>KES 30k–80k</option><option>KES 80k+</option></select>
      </div>

      <div className="creative-grid">
        {CREATIVES.map((c) => (
          <article key={c.initials} className="creative-tile">
            <div className="tile-cover">
              {c.covers.map((g, i) => <div key={i} style={{ background: `linear-gradient(135deg,${g})` }}></div>)}
            </div>
            <div className="tile-body">
              <div className="tile-top">
                {c.ring ? (
                  <span className="av-ring"><span className="av av-lg" style={{ background: `linear-gradient(135deg,${c.gradient})` }}>{c.initials}</span></span>
                ) : (
                  <span className="av av-lg" style={{ background: `linear-gradient(135deg,${c.gradient})` }}>{c.initials}</span>
                )}
              </div>
              <div className="tile-name">
                {c.name}
                {c.pro && <> <span className="verified-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span> <span className="pro-tag">Pro</span></>}
              </div>
              <div className="tile-role">{c.role}</div>
              <div className="tile-meta">
                {c.openToWork ? <span className="open-tag">Open to work</span> : <span style={{ fontSize: 13, color: "var(--ink-dim)" }}>Replies in {c.reply}</span>}
                <span className="tile-rate">{c.rate}<span> / {c.ratePer}</span></span>
              </div>
              <div className="tile-actions">
                <Link href="/messages" className="pill-btn pill-primary">Message</Link>
                <Link href="/profile" className="pill-btn pill-ghost">View</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
