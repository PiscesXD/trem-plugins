'use client';

import { useEffect } from 'react';

import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/noto-sans-tc/400.css';
import '@fontsource/noto-sans-tc/700.css';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TREM 擴充',
  description: 'TREM 擴充套件一覽',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      document.documentElement.classList.add('dark');
    }
    else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <html lang="zh-Hant">
      <body className="flex flex-col">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
