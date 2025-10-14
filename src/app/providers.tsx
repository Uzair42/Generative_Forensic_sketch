'use client';

import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/context/auth-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="theme-zinc"
      enableSystem={false}
    >
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
