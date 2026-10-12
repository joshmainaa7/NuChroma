"use client";

import { useState } from "react";
import Link from "next/link";

const CONTRACTS = [
  { id: "vuka-coffee", title: "Vuka Coffee — campaign illustrations", client: "Bold House Agency", clientInitials: "BH", gradient: "var(--c2),var(--c5)", status: "active", badge: "In progress", amount: "KES 60,000", progress: 33, milestone: "1 of 3 milestones", date: "Started 6 days ago", href: "/contracts/detail" },
  { id: "safaricom", title: "Safaricom — social media set", client: "Safaricom PLC", clientInitials: "SF", gradient: "var(--c3),var(--c5)", status: "pending", badge: "Awaiting signature", amount: "KES 90,000", progress: 0, milestone: "Not started", date: "Brief received 1 day ago", href: "/contracts/pending" },
  { id: "maisha", title: "Maisha Magazine — editorial covers", client: "Maisha Media", clientInitials: "MM", gradient: "var(--c1),var(--c4)", status: "active", badge: "In progress", amount: "KES 45,000", progress: 66, milestone: "2 of 3 milestones", date: "Started 2 weeks ago", href: "/contracts/detail" },
  { id: "david", title: "David Mwangi — title cards for documentary", client: "David Mwangi", clientInitials: "DM", gradient: "var(--c4),var(--c2)", status: "completed", badge: "Completed", amount: "KES 35,000", progress: 100, milestone: "All milestones paid", date: "Completed 3 weeks ago", href: "/contracts/detail" },
  { id: "kilimani", title: "Kilimani Roasters — brand identity", client: "Kilimani Roasters", clientInitials: "KR", gradient: "var(--c5),var(--c3)", status: "completed", badge: "Completed", amount: "KES 25,000", progress: 100, milestone: "All milestones paid", date: "Completed 2 months ago", href: "/contracts/detail" },
  { id: "nft", title: "Afro-future NFT set — personal project", client: "Personal", clientInitials: "ME", gradient: "var(--c1),var(--c5)", status: "draft", badge: "Draft", amount: "KES 0", progress: 0, milestone: "Not sent", date: "Last edited 4 days ago", href: "/contracts/detail" },
];

const TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
  { key: "draft", label: "Drafts" },
];

export default function ContractsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? CONTRACTS : CONTRACTS.filter((c) => c.status === filter);

  return (
    <div className="contracts-dash">
      <div className="cd-header">
        <div>
          <h1 className="cd-title">Your projects</h1>
          <p className="cd-sub">Track briefs, contracts, and payments in one place.</p>
        </div>
        <Link href="/contracts/create-brief" className="cd-create-btn">+ Create brief</Link>
      </div>

      <div className="cd-stats">
        <div className="cd-stat"><div className="cd-stat-val">KES 155,000</div><div className="cd-stat-label">Total earned</div></div>
        <div className="cd-stat"><div className="cd-stat-val">KES 48,000</div><div className="cd-stat-label">In escrow</div></div>
        <div className="cd-stat"><div className="cd-stat-val">3</div><div className="cd-stat-label">Active projects</div></div>
        <div className="cd-stat"><div className="cd-stat-val">5</div><div className="cd-stat-label">Completed</div></div>
      </div>

      <div className="cd-tabs">
        {TABS.map((tab) => (
          <button key={tab.key} className={`cd-tab${filter === tab.key ? " active" : ""}`} onClick={() => setFilter(tab.key)}>{tab.label}</button>
        ))}
      </div>

      <div className="cd-list">
        {filtered.map((c) => (
          <Link key={c.id} href={c.href} className="cd-card" data-status={c.status}>
            <div className="cd-card-top">
              <div className="cd-card-info">
                <h3 className="cd-card-title">{c.title}</h3>
                <div className="cd-card-parties">
                  <span className="av av-xs" style={{ background: `linear-gradient(135deg,${c.gradient})` }}>{c.clientInitials}</span>
                  <span className="cd-card-client">{c.client}</span>
                </div>
              </div>
              <span className={`status-badge ${c.status}`}>{c.badge}</span>
            </div>
            <div className="cd-card-bottom">
              <div className="cd-card-amount">{c.amount}</div>
              <div className="cd-card-progress">
                <div className="cd-bar"><div className={`cd-bar-fill${c.progress === 100 ? " full" : ""}`} style={{ width: `${c.progress}%` }}></div></div>
                <span className="cd-bar-label">{c.milestone}</span>
              </div>
              <div className="cd-card-date">{c.date}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
