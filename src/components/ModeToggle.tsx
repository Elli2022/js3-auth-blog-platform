import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Field";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed right-4 top-16 z-50">
      <Button
        type="button"
        variant="secondary"
        aria-label="Byt tema"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="h-10 w-10 rounded-full p-0 shadow-lg"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </Button>
    </div>
  );
}
