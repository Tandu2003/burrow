import './globals.css'

import Header from '@/components/common/header'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Luxury Couch for Real Life | Burrow',
  description:
    'The most clever, comfortable sofa designed for your ever-changing life and living room. Enjoy a cozy 30-day risk-free trial',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="relative bg-white">
        <Header />
        {children}
      </body>
    </html>
  )
}
