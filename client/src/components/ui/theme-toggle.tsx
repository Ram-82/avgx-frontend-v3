import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/theme-store";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="bg-secondary/50 hover:bg-secondary transition-all"
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5 text-accent-teal" />
      ) : (
        <Sun className="h-5 w-5 text-accent-teal" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
