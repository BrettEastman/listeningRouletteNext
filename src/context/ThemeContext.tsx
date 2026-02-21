"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  systemPreference: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [systemPreference, setSystemPreference] = useState<Theme>("light");

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemPreference(e.matches ? "dark" : "light");
    };

    // Set initial value
    updateTheme(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  const theme = systemPreference;

  return (
    <ThemeContext.Provider value={{ theme, systemPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

