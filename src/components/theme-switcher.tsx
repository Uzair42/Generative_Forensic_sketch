'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, Palette } from 'lucide-react';

const themes = [
  { name: 'Zinc', value: 'theme-zinc' },
  { name: 'Slate', value: 'theme-slate' },
  { name: 'Stone', value: 'theme-stone' },
  { name: 'Crimson', value: 'theme-crimson' },
  { name: 'Sapphire', value: 'theme-sapphire' },
  { name: 'Forest', value: 'theme-forest' },
  { name: 'Amber', value: 'theme-amber' },
  { name: 'Violet', value: 'theme-violet' },
  { name: 'Teal', value: 'theme-teal' },
  { name: 'Rose', value: 'theme-rose' },
];

export function ThemeSwitcher() {
  const { setTheme, theme: currentTheme } = useTheme();
  
  const handleThemeChange = (newTheme: string) => {
    const isDark = document.documentElement.classList.contains('dark');
    document.documentElement.className = ''; // Clear all classes
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
  };
  
  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme-mode', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme-mode', 'dark');
    }
     // Re-apply theme to ensure proper class combination
    setTheme(currentTheme || 'theme-zinc');
  };

  React.useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
       document.documentElement.classList.remove('dark');
    }

    // Set a default theme if none is set
    if (!currentTheme) {
      handleThemeChange('theme-zinc');
    } else {
      document.documentElement.classList.add(currentTheme);
    }
  }, [currentTheme]);

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle dark mode</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Palette className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Select theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {themes.map((theme) => (
            <DropdownMenuItem key={theme.value} onClick={() => handleThemeChange(theme.value)}>
              {theme.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
