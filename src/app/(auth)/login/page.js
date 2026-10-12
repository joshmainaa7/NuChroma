"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logIn } from "@/lib/auth";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) router.push("/feed");
  }, [user, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: err } = await logIn({ email, password });

    if (err) {
      if (err.message === "Invalid login credentials") {
        setError("Wrong email or password. Try again.");
      } else if (err.message === "Email not confirmed") {
        setError("Please check your inbox and click the confirmation link first.");
      } else {
        setError(err.message);
      }
      setLoading(false);
      return;
    }

    router.push("/feed");
  }

  return (
    <main className="signup-page form-page">
      <div className="signup-orb orb-a" style={{ background: "var(--c3)" }}></div>
      <div className="signup-orb orb-b" style={{ background: "var(--c4)", opacity: 0.35 }}></div>

      <div className="form-inner">
        <div className="form-header" style={{ textAlign: "center" }}>
          <span className="eyebrow">Welcome back</span>
          <h1 className="form-title">Log in to <span className="gradient-text">NuChroma.</span></h1>
          <p className="signup-sub">Pick up where you left off — your portfolio, messages, and contracts are waiting.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(255,91,138,.12)", border: "1px solid rgba(255,91,138,.25)", color: "#ff5b8a", fontSize: 13, marginBottom: 12 }}>
              {error}
            </div>
          )}

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required placeholder="Email address" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required placeholder="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in…" : "Log in"}
          </button>

          <p className="form-footer-note">
            Don&apos;t have an account? <Link href="/signup" className="inline-link">Sign up</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
