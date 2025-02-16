import { create } from "zustand";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "dark";
}

export const useTheme = create<ThemeState>((set) => ({
  theme: (typeof window !== "undefined" && localStorage.getItem("theme") as Theme) || "system",
  setTheme: (theme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = getSystemTheme();
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));

export type { Theme };