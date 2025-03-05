import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './providers/theme-provider';
import EnhancedHeader from './components/enhanced-header';
import DecorativeBackground from './components/decorative-background';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gabriels Kokebok',
  description: 'Oppdag nye oppskrifter og lær å lage mat med Gabriels Kokebok.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme='light'>
          <DecorativeBackground />
          <EnhancedHeader />
          <main className='min-h-screen'>{children}</main>
          <footer className='bg-muted py-6'>
            <div className='container mx-auto px-4'>
              <div className='flex flex-col md:flex-row justify-between items-center'>
                <div className='mb-4 md:mb-0'>
                  <p className='text-sm text-muted-foreground'>
                    © {new Date().getFullYear()} Gabriels kokebok. Alle
                    rettigheter reservert.
                  </p>
                </div>
                <div className='flex space-x-4'>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-primary transition-colors'
                  >
                    Personverns vilkår
                  </a>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-primary transition-colors'
                  >
                    Cookies
                  </a>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:text-primary transition-colors'
                  >
                    Kontakt meg
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

import './globals.css';
