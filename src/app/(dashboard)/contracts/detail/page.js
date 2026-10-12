"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

const ShieldCheck = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;
const Check = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const Arrow = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
const Shield = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;

export default function ContractDetailPage() {
  const { profile } = useAuth();
  const userName = profile?.display_name || "User";

  return (
    <div className="contract-layout">
      <div className="contract-main">
        <Link href="/contracts" className="cd-back">&larr; All projects</Link>

        <div className="contract-head">
          <div className="ch-top">
            <h2 className="ch-title">Vuka Coffee — campaign illustrations</h2>
            <span className="status-badge active">In progress</span>
          </div>
          <div className="ch-parties">
            <div className="ch-party">
              <span className="av av-sm" style={{ background: "linear-gradient(135deg,var(--c2),var(--c5))" }}>BH</span>
              <div className="who"><b>Bold House Agency</b><span>Client</span></div>
            </div>
            <span className="ch-arrow"><Arrow /></span>
            <div className="ch-party">
              <span className="av av-sm" style={{ background: "linear-gradient(135deg,var(--c4),var(--c1))" }}></span>
              <div className="who"><b>{userName}</b><span>Creative</span></div>
            </div>
          </div>
        </div>

        <div className="contract-card">
          <h3>Job description</h3>
          <div className="jd-row">
            <div className="jd-item"><span className="jd-label">Project type</span><span className="jd-val">Illustration</span></div>
            <div className="jd-item"><span className="jd-label">Deadline</span><span className="jd-val">15 Aug 2026</span></div>
            <div className="jd-item"><span className="jd-label">Revisions</span><span className="jd-val">2 rounds per piece</span></div>
            <div className="jd-item"><span className="jd-label">Delivery format</span><span className="jd-val">Layered PSD, PNG, SVG</span></div>
          </div>
        </div>

        <div className="contract-card">
          <h3>Scope of work</h3>
          <p className="scope-text">Four hero illustrations for the Vuka Coffee launch campaign, optimised for Instagram and X, plus one wide banner for web. Flat colour, hand-drawn style consistent with the samples shared in chat.</p>
          <p className="scope-text">Two rounds of revisions included per illustration. Final delivery as layered source files and exported PNG/SVG. Usage: paid social and web for 12 months across Vuka Coffee channels.</p>
          <div className="deliverables">
            <h4 className="del-title">Deliverables</h4>
            <ul className="del-list">
              <li><span className="del-check done">&#10003;</span> Moodboard and concept direction</li>
              <li><span className="del-check done">&#10003;</span> 4 hero illustrations (1080 x 1080px)</li>
              <li><span className="del-check">3</span> 1 web banner (1920 x 600px)</li>
              <li><span className="del-check">4</span> Source files + exports</li>
            </ul>
          </div>
        </div>

        <div className="contract-card">
          <h3>Budget &amp; payment</h3>
          <div className="budget-display">
            <div className="budget-amount">KES 60,000</div>
            <div className="budget-label">Agreed project budget</div>
          </div>
          <div className="pay-summary">
            <div className="pay-row"><span className="pr-label">Project total</span><span className="pr-val">KES 60,000</span></div>
            <div className="pay-row"><span className="pr-label">NuChroma fee <span className="fee-note">(8% — drops as you earn more)</span></span><span className="pr-val">&minus; KES 4,800</span></div>
            <div className="pay-row total"><span className="pr-label">You receive</span><span className="pr-val">KES 55,200</span></div>
          </div>
          <div className="escrow-box">
            <span className="escrow-shield"><Shield /></span>
            <div className="escrow-info">
              <div className="ei-amount">KES 48,000</div>
              <div className="ei-label">held safely in escrow &middot; KES 12,000 released so far</div>
            </div>
          </div>
        </div>

        <div className="contract-card">
          <h3>Milestones</h3>
          <div className="milestone done" data-amount="12000">
            <span className="ms-mark"><Check /></span>
            <div className="ms-info"><div className="ms-name">Concept &amp; moodboard</div><div className="ms-sub">Approved &middot; released 5 days ago</div></div>
            <div className="ms-right"><span className="ms-amount">KES 12,000</span><span className="ms-status paid">Paid</span></div>
          </div>
          <div className="milestone current" data-amount="24000">
            <span className="ms-mark">2</span>
            <div className="ms-info"><div className="ms-name">First drafts — 4 illustrations</div><div className="ms-sub">Submitted &middot; awaiting client approval</div></div>
            <div className="ms-right"><span className="ms-amount">KES 24,000</span><span className="ms-status held">In escrow</span></div>
          </div>
          <div className="milestone" data-amount="24000">
            <span className="ms-mark">3</span>
            <div className="ms-info"><div className="ms-name">Final files &amp; banner</div><div className="ms-sub">Due in 2 weeks</div></div>
            <div className="ms-right"><span className="ms-amount">KES 24,000</span><span className="ms-status held">In escrow</span></div>
          </div>
        </div>

        <div className="contract-card">
          <h3>Contract terms</h3>
          <div className="terms-grid">
            <div className="term"><span className="term-label">IP ownership</span><span className="term-val">Transfers to client on final payment</span></div>
            <div className="term"><span className="term-label">Usage rights</span><span className="term-val">Paid social &amp; web, 12 months, Vuka Coffee channels</span></div>
            <div className="term"><span className="term-label">Cancellation</span><span className="term-val">Either party can cancel. Work done is paid for, remaining escrow returns to client.</span></div>
            <div className="term"><span className="term-label">Late payment</span><span className="term-val">If client doesn&apos;t respond within 7 days of delivery, funds auto-release.</span></div>
            <div className="term"><span className="term-label">Disputes</span><span className="term-val">NuChroma mediates. Funds stay in escrow until resolved.</span></div>
          </div>
          <div className="signatures">
            <h4 className="sig-title">Signatures</h4>
            <div className="sig-row">
              <div className="sig-party signed"><span className="sig-icon"><ShieldCheck /></span><div className="sig-info"><div className="sig-name">Bold House Agency</div><div className="sig-meta">Signed 6 days ago &middot; Client</div></div></div>
              <div className="sig-party signed"><span className="sig-icon"><ShieldCheck /></span><div className="sig-info"><div className="sig-name">{userName}</div><div className="sig-meta">Signed 6 days ago &middot; Creative</div></div></div>
            </div>
          </div>
        </div>

        <div className="contract-card">
          <h3>Activity</h3>
          <div className="timeline">
            <div className="tl-item"><div className="tl-text"><b>{userName}</b> submitted the first drafts for review</div><div className="tl-time">2 days ago</div></div>
            <div className="tl-item"><div className="tl-text"><b>Bold House Agency</b> funded the remaining <b>KES 48,000</b> into escrow</div><div className="tl-time">2 days ago</div></div>
            <div className="tl-item"><div className="tl-text">You released <b>KES 12,000</b> for &ldquo;Concept &amp; moodboard&rdquo;</div><div className="tl-time">5 days ago</div></div>
            <div className="tl-item muted"><div className="tl-text">Contract signed by both parties</div><div className="tl-time">6 days ago</div></div>
            <div className="tl-item muted"><div className="tl-text">Brief shared from Messages</div><div className="tl-time">6 days ago</div></div>
          </div>
        </div>
      </div>

      <aside className="contract-side">
        <div className="side-card">
          <h3>Quick actions</h3>
          <Link href="/messages" className="side-action">Message client</Link>
          <button className="side-action" onClick={() => alert("Coming soon — contract summary uses 1 chip")}>Summarize contract</button>
          <button className="side-action" onClick={() => alert("Coming soon")}>Submit work</button>
          <button className="side-action danger" onClick={() => alert("Coming soon")}>Raise dispute</button>
        </div>
        <div className="side-card help-card">
          <h3>How escrow works</h3>
          <b>Funds sit safely in escrow</b> until you both agree a milestone is done. The client can&apos;t pull the money back on a whim, and you know you&apos;ll be paid before you hand over finals. NuChroma only takes its fee when money is released.
        </div>
      </aside>
    </div>
  );
}
