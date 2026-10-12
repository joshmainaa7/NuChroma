"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/auth";

export default function SignupCreativePage() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [selectedChips, setSelectedChips] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  const chips = ["Illustration", "Photography", "Motion & Video", "3D & CGI", "Typography", "Direction", "Editorial", "Other"];

  function toggleChip(chip) {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
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
      accountType: "client",
      extras: {
        agency_name: company,
        craft: selectedChips.join(", ") || null,
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
        <div className="signup-orb orb-a" style={{ background: "var(--c1)" }}></div>
        <div className="signup-orb orb-b" style={{ background: "var(--c2)", opacity: 0.35 }}></div>
        <div className="form-inner">
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>&#9993;&#65039;</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, marginBottom: 8, color: "var(--ink)" }}>Check your email</h2>
            <p style={{ fontSize: 14, color: "var(--ink-dim)", lineHeight: 1.5 }}>
              We sent a confirmation link to <strong>{email}</strong>.<br/>Click it to activate your account, then come back and log in.
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
      <div className="signup-orb orb-a" style={{ background: "var(--c1)" }}></div>
      <div className="signup-orb orb-b" style={{ background: "var(--c2)", opacity: 0.35 }}></div>

      <div className="form-inner">
        <div className="form-header">
          <Link href="/signup" className="back-chip">&larr; Choose path</Link>
          <span className="eyebrow" style={{ marginTop: 20, display: "inline-block" }}>Client &amp; brand account</span>
          <h1 className="form-title">Find your next <span className="gradient-text">creative.</span></h1>
          <p className="signup-sub">Create an account to browse, hire, and collaborate with world-class creatives.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(255,91,138,.12)", border: "1px solid rgba(255,91,138,.25)", color: "#ff5b8a", fontSize: 13, marginBottom: 12 }}>
              {error}
            </div>
          )}

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="fname">First name</label>
              <input id="fname" type="text" required placeholder="First name" autoComplete="given-name" value={fname} onChange={(e) => setFname(e.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="lname">Last name</label>
              <input id="lname" type="text" required placeholder="Last name" autoComplete="family-name" value={lname} onChange={(e) => setLname(e.target.value)} />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="email">Work email</label>
            <input id="email" type="email" required placeholder="Email address" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-field">
            <label htmlFor="company">Company or brand name</label>
            <input id="company" type="text" required placeholder="Company or brand" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required placeholder="Password" autoComplete="new-password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-field">
            <label className="field-label-sub">What are you hiring for?</label>
            <div className="chip-group" role="group" aria-label="Hiring category">
              {chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className={`chip${selectedChips.includes(chip) ? " chip--active" : ""}`}
                  onClick={() => toggleChip(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </button>

          <p className="form-footer-note">
            Already have an account? <Link href="/login" className="inline-link">Sign in</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
