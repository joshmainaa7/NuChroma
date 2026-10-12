"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = ["Illustration", "Photography", "Motion & Video", "3D & CGI", "Typography", "Direction", "Brand identity", "Editorial", "Other"];
const BUDGET_RANGES = [
  { label: "KES 5,000 – 15,000", sub: "Small project", min: 5000, max: 15000 },
  { label: "KES 15,000 – 50,000", sub: "Mid-size project", min: 15000, max: 50000 },
  { label: "KES 50,000 – 150,000", sub: "Major project", min: 50000, max: 150000 },
  { label: "KES 150,000+", sub: "Enterprise", min: 150000, max: null },
];

function getFee(amount) {
  const pct = amount >= 200000 ? 3 : amount >= 50000 ? 5 : 8;
  return { pct, fee: Math.round(amount * pct / 100) };
}

export default function CreateBriefPage() {
  const [category, setCategory] = useState(null);
  const [deliverables, setDeliverables] = useState([]);
  const [delInput, setDelInput] = useState("");
  const [budget, setBudget] = useState("");
  const [activeRange, setActiveRange] = useState(null);
  const [milestones, setMilestones] = useState([
    { name: "Concept & moodboard", amount: "12000" },
    { name: "First drafts", amount: "24000" },
    { name: "Final delivery", amount: "24000" },
  ]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function addDeliverable() {
    if (!delInput.trim()) return;
    setDeliverables([...deliverables, delInput.trim()]);
    setDelInput("");
  }

  function pickRange(idx) {
    setActiveRange(idx);
    const r = BUDGET_RANGES[idx];
    const amount = r.max ? Math.round((r.min + r.max) / 2) : r.min;
    setBudget(String(amount));
  }

  function addMilestone() {
    setMilestones([...milestones, { name: "", amount: "" }]);
  }

  function updateMilestone(idx, field, value) {
    setMilestones(milestones.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  }

  function removeMilestone(idx) {
    setMilestones(milestones.filter((_, i) => i !== idx));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  }

  const budgetNum = parseInt(budget) || 0;
  const { pct, fee } = getFee(budgetNum);
  const fmt = (n) => "KES " + n.toLocaleString();

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, marginBottom: 8 }}>Brief sent</h2>
        <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.5, marginBottom: 20 }}>The creative will be notified. Once they accept, a contract will be created and you can fund escrow.</p>
        <Link href="/contracts" style={{ display: "inline-block", padding: "10px 24px", borderRadius: 999, background: "linear-gradient(120deg,var(--c4),var(--c5))", color: "#fff", fontWeight: 600, fontSize: 14 }}>Back to projects</Link>
      </div>
    );
  }

  return (
    <div className="brief-layout">
      <div className="brief-main">
        <Link href="/contracts" className="cd-back">&larr; Back to projects</Link>

        <div className="brief-header">
          <h1 className="brief-title">Create a project brief</h1>
          <p className="brief-sub">Describe what you need, set a budget, and send it to a creative. Once they accept, a contract is created automatically.</p>
        </div>

        <form className="brief-form" onSubmit={handleSubmit}>
          <div className="bf-section">
            <h3 className="bf-section-title">Project details</h3>
            <div className="bf-field">
              <label htmlFor="bf-title">Project title</label>
              <input id="bf-title" type="text" required placeholder="e.g. Campaign illustrations for product launch" />
            </div>
            <div className="bf-field">
              <label>Category</label>
              <div className="chip-group" role="group" aria-label="Project category">
                {CATEGORIES.map((c) => (
                  <button key={c} type="button" className={`chip chip--blue${category === c ? " chip--active" : ""}`} onClick={() => setCategory(c)}>{c}</button>
                ))}
              </div>
            </div>
            <div className="bf-field">
              <label htmlFor="bf-desc">Job description</label>
              <textarea id="bf-desc" rows="4" required placeholder="Describe the role and what the creative will be doing on this project"></textarea>
            </div>
            <div className="bf-field">
              <label htmlFor="bf-scope">Scope of work</label>
              <textarea id="bf-scope" rows="4" required placeholder="List what needs to be delivered, file formats, usage rights, number of revisions, etc."></textarea>
            </div>
            <div className="bf-field">
              <label>Deliverables</label>
              <div className="del-builder">
                <div className="del-input-row">
                  <input type="text" className="del-input" placeholder="e.g. 4 hero illustrations (1080 x 1080px)" value={delInput} onChange={(e) => setDelInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addDeliverable(); } }} />
                  <button type="button" className="del-add" onClick={addDeliverable}>+</button>
                </div>
                <ul className="del-items">
                  {deliverables.map((d, i) => (
                    <li key={i} className="del-item">
                      <span>{d}</span>
                      <button type="button" className="del-remove" onClick={() => setDeliverables(deliverables.filter((_, j) => j !== i))}>&times;</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bf-section">
            <h3 className="bf-section-title">Budget</h3>
            <p className="bf-hint">Choose a range or enter a specific amount. This is what the creative will receive — NuChroma&apos;s fee is added on top.</p>
            <div className="budget-picker">
              {BUDGET_RANGES.map((r, i) => (
                <button key={i} type="button" className={`budget-opt${activeRange === i ? " active" : ""}`} onClick={() => pickRange(i)}>
                  <span className="bo-range">{r.label}</span>
                  <span className="bo-label">{r.sub}</span>
                </button>
              ))}
            </div>
            <div className="bf-field" style={{ marginTop: 16 }}>
              <label htmlFor="bf-budget">Or enter a specific amount (KES)</label>
              <input id="bf-budget" type="number" min="1000" step="500" placeholder="60000" value={budget} onChange={(e) => { setBudget(e.target.value); setActiveRange(null); }} />
            </div>
            {budgetNum > 0 && (
              <div className="budget-breakdown">
                <div className="bb-row"><span>Creative receives</span><span>{fmt(budgetNum)}</span></div>
                <div className="bb-row"><span>NuChroma fee ({pct}%)</span><span>{fmt(fee)}</span></div>
                <div className="bb-row total"><span>You pay</span><span>{fmt(budgetNum + fee)}</span></div>
              </div>
            )}
          </div>

          <div className="bf-section">
            <h3 className="bf-section-title">Timeline &amp; milestones</h3>
            <div className="bf-row">
              <div className="bf-field"><label htmlFor="bf-start">Start date</label><input id="bf-start" type="date" required /></div>
              <div className="bf-field"><label htmlFor="bf-deadline">Deadline</label><input id="bf-deadline" type="date" required /></div>
            </div>
            <div className="bf-field">
              <label>Milestones</label>
              <p className="bf-hint">Break the project into checkpoints. Payment is released as each one is approved.</p>
              <div className="ms-builder">
                {milestones.map((ms, i) => (
                  <div key={i} className="ms-build-item">
                    <input type="text" className="ms-build-name" placeholder="Milestone name" value={ms.name} onChange={(e) => updateMilestone(i, "name", e.target.value)} />
                    <input type="number" className="ms-build-amount" placeholder="Amount (KES)" value={ms.amount} onChange={(e) => updateMilestone(i, "amount", e.target.value)} />
                    {milestones.length > 1 && <button type="button" className="ms-remove" onClick={() => removeMilestone(i)}>&times;</button>}
                  </div>
                ))}
              </div>
              <button type="button" className="ms-add-btn" onClick={addMilestone}>+ Add milestone</button>
            </div>
          </div>

          <div className="bf-section">
            <h3 className="bf-section-title">Send to</h3>
            <div className="bf-field">
              <label htmlFor="bf-creative">Creative&apos;s username or email</label>
              <input id="bf-creative" type="text" placeholder="Search for a creative" />
            </div>
          </div>

          <div className="bf-actions">
            <button type="button" className="bf-preview-btn" onClick={() => alert("Contract preview — coming soon.")}>Preview contract</button>
            <button type="submit" className="bf-send-btn" disabled={sending}>{sending ? "Sending brief..." : "Send brief"}</button>
          </div>
        </form>
      </div>

      <aside className="contract-side">
        <div className="side-card help-card">
          <h3>How it works</h3>
          <div className="how-steps">
            {["Describe what you need and set a budget", "Send the brief to a creative", "They review and accept — a contract is created", "Fund escrow via M-Pesa or card", "Approve milestones to release payment"].map((step, i) => (
              <div key={i} className="how-step"><span className="how-num">{i + 1}</span><span>{step}</span></div>
            ))}
          </div>
        </div>
        <div className="side-card">
          <h3>Fee breakdown</h3>
          <p style={{ fontSize: 13, color: "var(--ink-dim)", lineHeight: 1.5 }}>NuChroma charges a small fee on top of the creative&apos;s rate. The fee drops as you spend more:</p>
          <div className="fee-tiers">
            <div className="fee-tier"><span>Under KES 50k</span><span>8%</span></div>
            <div className="fee-tier"><span>KES 50k – 200k</span><span>5%</span></div>
            <div className="fee-tier"><span>Above KES 200k</span><span>3%</span></div>
          </div>
        </div>
      </aside>
    </div>
  );
}
