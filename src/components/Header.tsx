"use client";

import { useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => useContext(ThemeContext);

export default function Header() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useAppTheme();

  const isRu = locale === "ru";

  const changeLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.replace(pathname, { locale: e.target.value as "en" | "ru" });
  };
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        borderBottom: "1px solid #ccc",
        alignItems: "center",
        color: "var(--foreground)",
      }}
    >
      <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
        {isRu ? "Главная" : "Main"}
      </Link>
      <Link href="/about" style={{ color: "inherit", textDecoration: "none" }}>
        {isRu ? "О нас" : "About Us"}
      </Link>

      <select
        value={locale}
        onChange={changeLocale}
        style={{
          marginLeft: "auto",
          padding: "5px",
          color: "var(--foreground)",
          background: "var(--background)",
          border: "1px solid var(--foreground)",
        }}
      >
        <option
          value="en"
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          EN
        </option>
        <option
          value="ru"
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          RU
        </option>
      </select>

      <button
        onClick={toggleTheme}
        style={{
          padding: "5px 10px",
          cursor: "pointer",
          color: "var(--foreground)",
          background: "transparent",
          border: "1px solid var(--foreground)",
          borderRadius: "4px",
        }}
      >
        {theme === "light"
          ? isRu
            ? "🌙 Темная"
            : "🌙 Dark"
          : isRu
            ? "☀️ Светлая"
            : "☀️ Light"}
      </button>
    </nav>
  );
}
