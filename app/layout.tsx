import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
export const metadata: Metadata = {
  title: 'Aura team',
  description:
    'Aura team ',
  icons: {
    icon: './icon.png'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}><Providers>{children}</Providers></body>
    </html>
  );
}
