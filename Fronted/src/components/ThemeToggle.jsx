import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));
  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };
  return <Button type="button" variant="ghost" size="icon" onClick={toggle} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}>{isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}</Button>;
}
