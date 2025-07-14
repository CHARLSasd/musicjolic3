
import * as React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MUSICAHOLIC द Band',
  description: 'Official website of MUSICAHOLIC द Band - Reimagining India\'s Musical Heritage for the Modern Era',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-amber-50 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
// this 
