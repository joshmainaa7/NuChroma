"use client";

import { useAuth } from "./AuthProvider";
import { useThemeToggle } from "./ThemeProvider";

export default function Topbar({ searchPlaceholder }) {
  const { profile } = useAuth();
  const toggleTheme = useThemeToggle();

  const initials = (profile?.display_name || "")
    .split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?";

  return (
    <header className="topbar">
      <div className="tb-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="text" placeholder={searchPlaceholder || "Search"} />
      </div>
      <div className="tb-actions">
        <span className="chip-balance" title="Your weekly chips">
          <span className="chip-gem"></span>{profile?.chip_count || 0}
        </span>
        <button className="icon-btn" aria-label="Notifications">
          <span className="dot-notify"></span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
        </button>
        <button className="icon-btn" aria-label="Toggle theme" onClick={toggleTheme}>
          <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "none" }}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <span className="av tb-avatar" style={{ background: "linear-gradient(135deg,var(--c4),var(--c1))" }}>
          {initials}
        </span>
      </div>
    </header>
  );
}
