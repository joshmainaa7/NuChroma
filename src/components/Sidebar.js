"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { logOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

function NavIcon({ page }) {
  const icons = {
    feed: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>,
    discover: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>,
    messages: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/></svg>,
    contracts: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>,
    profile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>,
  };
  return icons[page] || null;
}

export default function Sidebar() {
  const pathname = usePathname();
  const { profile } = useAuth();
  const router = useRouter();

  const initials = (profile?.display_name || "")
    .split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?";

  const links = [
    { href: "/feed", label: "Feed", icon: "feed" },
    { href: "/discover", label: "Discover", icon: "discover" },
    { href: "/messages", label: "Messages", icon: "messages", badge: 2 },
    { href: "/contracts", label: "Contracts", icon: "contracts" },
    { href: "/profile", label: "Profile", icon: "profile" },
  ];

  async function handleLogout(e) {
    e.preventDefault();
    await logOut();
    router.push("/");
  }

  return (
    <aside className="sidebar">
      <Link href="/" className="sb-brand">
        <span className="brand-dot"></span> NuChroma
      </Link>
      <nav className="sb-nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`sb-link${pathname.startsWith(link.href) ? " active" : ""}`}
          >
            <NavIcon page={link.icon} />
            {link.label}
            {link.badge ? <span className="badge-count">{link.badge}</span> : null}
          </Link>
        ))}
      </nav>
      <div className="sb-foot">
        <div className="sb-user">
          <span className="av av-md" style={{ background: "linear-gradient(135deg,var(--c4),var(--c1))" }}>
            {initials}
          </span>
          <div className="sb-user-info">
            <div className="sb-user-name">{profile?.display_name || "User"}</div>
            <div className="sb-user-plan">
              {profile?.is_pro ? (
                <span className="pro-tag" style={{ fontSize: 10, padding: "1px 6px" }}>Pro</span>
              ) : (
                <><span className="chip-gem" style={{ width: 10, height: 10 }}></span> Free &middot; {profile?.chip_count || 0} chip{profile?.chip_count !== 1 ? "s" : ""}</>
              )}
            </div>
          </div>
        </div>
        <Link href="/profile" className="sb-upgrade">Upgrade to Pro</Link>
        <a href="#" className="sb-logout" onClick={handleLogout}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> Log out
        </a>
      </div>
    </aside>
  );
}
