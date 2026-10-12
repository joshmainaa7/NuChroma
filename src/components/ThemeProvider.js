"use client";

import { useEffect } from "react";

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const saved = localStorage.getItem("nuchroma-theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
  }, []);

  return children;
}

export function useThemeToggle() {
  return () => {
    const root = document.documentElement;
    const isLight = root.getAttribute("data-theme") === "light";
    if (isLight) root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "light");
    localStorage.setItem("nuchroma-theme", isLight ? "dark" : "light");
  };
}
