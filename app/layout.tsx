import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wagi Homes – Virtual Property Tours',
  description: 'Explore South African properties through immersive 360° virtual tours.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white antialiased">
        {children}
      </body>
    </html>
  )
}
