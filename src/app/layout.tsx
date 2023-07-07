import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dompaul United Academy',
  description: 'Payment Portal for Dompaul United Academy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
