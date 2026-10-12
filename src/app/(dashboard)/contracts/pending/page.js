"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

const ShieldCheck = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;
const Clock = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
const Arrow = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;

export default function ContractPendingPage() {
  const { profile } = useAuth();
  const userName = profile?.display_name || "User";
  const [signed, setSigned] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [signing, setSigning] = useState(false);

  function handleAccept() {
    setSigning(true);
    setTimeout(() => { setSigned(true); setSigning(false); }, 1200);
  }

  function handleDecline() {
    if (confirm("Are you sure you want to decline this brief? The client will be notified.")) {
      setDeclined(true);
    }
  }

  const statusClass = declined ? "draft" : signed ? "active" : "pending";
  const statusText = declined ? "Declined" : signed ? "Active" : "Awaiting signature";

  return (
    <div className="contract-layout">
      <div className="contract-main">
        <Link href="/contracts" className="cd-back">&larr; All projects</Link>

        <div className={`pending-banner${signed ? " banner-done" : ""}`}>
          <Clock />
          <span>{signed ? "You signed this contract. Waiting for the client to fund escrow." : declined ? "Brief declined. The client has been notified." : "This brief is waiting for your review. Read the details below, then accept or decline."}</span>
        </div>

        <div className="contract-head">
          <div className="ch-top">
            <h2 className="ch-title">Safaricom — social media set</h2>
            <span className={`status-badge ${statusClass}`}>{statusText}</span>
          </div>
          <div className="ch-parties">
            <div className="ch-party">
              <span className="av av-sm" style={{ background: "linear-gradient(135deg,var(--c3),var(--c5))" }}>SF</span>
              <div className="who"><b>Safaricom PLC</b><span>Client</span></div>
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
            <div className="jd-item"><span className="jd-label">Project type</span><span className="jd-val">Brand identity</span></div>
            <div className="jd-item"><span className="jd-label">Deadline</span><span className="jd-val">30 Nov 2026</span></div>
            <div className="jd-item"><span className="jd-label">Revisions</span><span className="jd-val">3 rounds</span></div>
            <div className="jd-item"><span className="jd-label">Delivery format</span><span className="jd-val">PNG, JPG, MP4</span></div>
          </div>
        </div>

        <div className="contract-card">
          <h3>Scope of work</h3>
          <p className="scope-text">Design a set of 12 social media assets for Safaricom&apos;s year-end campaign across Instagram, X, and TikTok. Assets should follow the existing brand guidelines with room for creative interpretation.</p>
          <p className="scope-text">Includes static posts, carousel templates, and two short motion graphics (15s each). Three rounds of revisions. Final delivery as ready-to-publish files with a style guide for internal teams.</p>
          <div className="deliverables">
            <h4 className="del-title">Deliverables</h4>
            <ul className="del-list">
              <li><span className="del-check">1</span> 6 static post designs (1080 x 1080px)</li>
              <li><span className="del-check">2</span> 3 carousel templates (up to 10 slides each)</li>
              <li><span className="del-check">3</span> 2 motion graphics (15s, 1080 x 1920px)</li>
              <li><span className="del-check">4</span> 1 TikTok video template</li>
              <li><span className="del-check">5</span> Style guide document</li>
            </ul>
          </div>
        </div>

        <div className="contract-card">
          <h3>Budget &amp; payment</h3>
          <div className="budget-display">
            <div className="budget-amount">KES 90,000</div>
            <div className="budget-label">Proposed project budget</div>
          </div>
          <div className="pay-summary">
            <div className="pay-row"><span className="pr-label">Project total</span><span className="pr-val">KES 90,000</span></div>
            <div className="pay-row"><span className="pr-label">NuChroma fee <span className="fee-note">(5% — mid-tier rate)</span></span><span className="pr-val">&minus; KES 4,500</span></div>
            <div className="pay-row total"><span className="pr-label">You receive</span><span className="pr-val">KES 85,500</span></div>
          </div>
        </div>

        <div className="contract-card">
          <h3>Milestones</h3>
          {[
            { num: 1, name: "Concept & moodboard", sub: "Due 1 week after start", amount: "KES 18,000" },
            { num: 2, name: "Static assets & carousels", sub: "Due 3 weeks after start", amount: "KES 36,000" },
            { num: 3, name: "Motion graphics & final delivery", sub: "Due by deadline", amount: "KES 36,000" },
          ].map((ms) => (
            <div key={ms.num} className="milestone">
              <span className="ms-mark">{ms.num}</span>
              <div className="ms-info"><div className="ms-name">{ms.name}</div><div className="ms-sub">{ms.sub}</div></div>
              <div className="ms-right"><span className="ms-amount">{ms.amount}</span><span className="ms-status held">Pending</span></div>
            </div>
          ))}
        </div>

        <div className="contract-card">
          <h3>Contract terms</h3>
          <div className="terms-grid">
            <div className="term"><span className="term-label">IP ownership</span><span className="term-val">Transfers to Safaricom PLC on final payment</span></div>
            <div className="term"><span className="term-label">Usage rights</span><span className="term-val">All digital channels, 24 months, Safaricom Kenya</span></div>
            <div className="term"><span className="term-label">Cancellation</span><span className="term-val">Either party can cancel. Work completed is paid for, remaining escrow returns to client.</span></div>
            <div className="term"><span className="term-label">Late payment</span><span className="term-val">If client doesn&apos;t respond within 7 days of delivery, funds auto-release.</span></div>
            <div className="term"><span className="term-label">Disputes</span><span className="term-val">NuChroma mediates. Funds stay in escrow until resolved.</span></div>
          </div>
          <div className="signatures">
            <h4 className="sig-title">Signatures</h4>
            <div className="sig-row">
              <div className="sig-party signed"><span className="sig-icon"><ShieldCheck /></span><div className="sig-info"><div className="sig-name">Safaricom PLC</div><div className="sig-meta">Signed 1 day ago &middot; Client</div></div></div>
              <div className={`sig-party ${signed ? "signed" : "unsigned"}`}>
                <span className="sig-icon">{signed ? <ShieldCheck /> : <Clock />}</span>
                <div className="sig-info"><div className="sig-name">{userName}</div><div className="sig-meta">{signed ? "Signed just now · Creative" : "Awaiting your signature · Creative"}</div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="contract-card sign-actions-card">
          <h3>Your decision</h3>
          {!signed && !declined ? (
            <>
              <p className="sign-prompt">By signing, you agree to the scope, milestones, and terms above. The client will be notified and can fund escrow immediately.</p>
              <div className="sign-actions">
                <button className="sign-decline" onClick={handleDecline}>Decline brief</button>
                <button className="sign-accept" onClick={handleAccept} disabled={signing}>{signing ? "Signing..." : "Accept & sign"}</button>
              </div>
            </>
          ) : (
            <div className="sign-done" style={declined ? { background: "rgba(255,91,138,.08)", borderColor: "rgba(255,91,138,.2)" } : undefined}>
              {!declined && <ShieldCheck />}
              <span>{declined ? "Brief declined. The client has been notified." : "Contract signed. The client has been notified to fund escrow."}</span>
            </div>
          )}
        </div>
      </div>

      <aside className="contract-side">
        <div className="side-card">
          <h3>Quick actions</h3>
          <Link href="/messages" className="side-action">Message client</Link>
          <button className="side-action" onClick={() => alert("Contract summary uses 1 chip. Coming soon.")}>Summarize contract</button>
        </div>
        <div className="side-card help-card">
          <h3>Before you sign</h3>
          <b>Read everything carefully.</b> Once you sign, the client can fund escrow and the project begins. Make sure the scope, milestones, and payment match what you discussed. If something looks off, message the client first.
        </div>
      </aside>
    </div>
  );
}
