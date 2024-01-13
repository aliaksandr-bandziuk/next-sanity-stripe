import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import CardProvider from './components/Providers'
import ShoppingCartModal from './components/ShoppingCartModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sale Commerce app',
  description: 'Sale Commerce app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CardProvider>
          <Navbar />
          <ShoppingCartModal />
          {children}
        </CardProvider>
      </body>
    </html>
  )
}
