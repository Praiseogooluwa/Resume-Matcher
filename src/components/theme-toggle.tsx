import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const darkMode = savedTheme === 'dark';
    setIsDark(darkMode);
    
    if (darkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="glass hover:shadow-glow transition-smooth w-12 h-12 rounded-full"
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-yellow-500 transition-all duration-300 hover:rotate-180" />
      ) : (
        <Moon className="w-6 h-6 text-purple-500 transition-all duration-300 hover:-rotate-12" />
      )}
    </Button>
  );
};