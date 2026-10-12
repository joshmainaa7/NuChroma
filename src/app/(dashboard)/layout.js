"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import BottomNav from "@/components/BottomNav";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="app" style={{ placeItems: "center", display: "grid", minHeight: "100vh" }}>
        <p style={{ color: "var(--ink-dim)", fontSize: 14 }}>Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="app">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <main className="app-content">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
