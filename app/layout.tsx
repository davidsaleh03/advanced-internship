'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles.css'
import Providers from '@/components/Providers'
import Login from '@/components/Login'


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>

            {children}
            <Login />

        </Providers>
      </body>
    </html>
  )
}