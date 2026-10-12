"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth";

export default function SignupAgencyPage() {
  const [agencyName, setAgencyName] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agencySize, setAgencySize] = useState(null);
  const [disciplines, setDisciplines] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  const sizes = ["Solo", "2–10", "11–50", "50+"];
  const disciplineList = ["Design", "Film & Motion", "Photography", "Creative direction", "Editorial", "Mixed"];

  function toggleDiscipline(d) {
    setDisciplines((prev) =>
      prev.includes(d) ? prev.filter((c) => c !== d) : [...prev, d]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: err } = await signUp({
      email,
      password,
      displayName: `${fname} ${lname}`,
      accountType: "agency",
      extras: {
        agency_name: agencyName,
        agency_size: agencySize,
        craft: disciplines.join(", ") || null,
      },
    });

    if (err) {
      setError(err.message && err.message !== "{}" ? err.message : "Something went wrong — please try again.");
      setLoading(false);
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <main className="signup-page form-page">
        <div className="signup-orb orb-a" style={{ background: "var(--c4)" }}></div>
        <div className="signup-orb orb-b" style={{ background: "var(--c5)", opacity: 0.35 }}></div>
        <div className="form-inner">
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>&#9993;&#65039;</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, marginBottom: 8, color: "var(--ink)" }}>Check your email</h2>
            <p style={{ fontSize: 14, color: "var(--ink-dim)", lineHeight: 1.5 }}>
              We sent a confirmation link to <strong>{email}</strong>.<br/>Click it to activate your workspace, then come back and log in.
            </p>
            <Link href="/login" style={{ display: "inline-block", marginTop: 16, padding: "10px 24px", borderRadius: 999, background: "linear-gradient(120deg,var(--c1),var(--c5))", color: "#fff", fontWeight: 600, fontSize: 14 }}>
              Go to login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="signup-page form-page">
      <div className="signup-orb orb-a" style={{ background: "var(--c4)" }}></div>
      <div className="signup-orb orb-b" style={{ background: "var(--c5)", opacity: 0.35 }}></div>

      <div className="form-inner">
        <div className="form-header">
          <Link href="/signup" className="back-chip">&larr; Choose path</Link>
          <span className="eyebrow" style={{ marginTop: 20, display: "inline-block" }}>Studio &amp; agency account</span>
          <h1 className="form-title">Set up your <span className="gradient-text" style={{ "--hue-x": "75%" }}>agency.</span></h1>
          <p className="signup-sub">A shared workspace for your whole team — manage talent, projects, and your agency&apos;s brand in one place.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(255,91,138,.12)", border: "1px solid rgba(255,91,138,.25)", color: "#ff5b8a", fontSize: 13, marginBottom: 12 }}>
              {error}
            </div>
          )}

          <div className="form-field">
            <label htmlFor="agency-name">Agency name</label>
            <input id="agency-name" type="text" required placeholder="Agency name" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="admin-fname">Your first name</label>
              <input id="admin-fname" type="text" required placeholder="First name" autoComplete="given-name" value={fname} onChange={(e) => setFname(e.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="admin-lname">Your last name</label>
              <input id="admin-lname" type="text" required placeholder="Last name" autoComplete="family-name" value={lname} onChange={(e) => setLname(e.target.value)} />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="admin-email">Work email</label>
            <input id="admin-email" type="email" required placeholder="Email address" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-field">
            <label htmlFor="admin-password">Password</label>
            <input id="admin-password" type="password" required placeholder="Password" autoComplete="new-password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-field">
            <label className="field-label-sub">Agency size</label>
            <div className="chip-group" role="group" aria-label="Agency size">
              {sizes.map((s) => (
                <button key={s} type="button" className={`chip${agencySize === s ? " chip--active" : ""}`} onClick={() => setAgencySize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="form-field">
            <label className="field-label-sub">Primary discipline</label>
            <div className="chip-group" role="group" aria-label="Primary discipline">
              {disciplineList.map((d) => (
                <button key={d} type="button" className={`chip chip--blue${disciplines.includes(d) ? " chip--active" : ""}`} onClick={() => toggleDiscipline(d)}>{d}</button>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn submit-btn--agency" disabled={loading}>
            {loading ? "Creating workspace…" : "Create agency workspace"}
          </button>

          <p className="form-footer-note">
            Already have an account? <Link href="/login" className="inline-link">Sign in</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
