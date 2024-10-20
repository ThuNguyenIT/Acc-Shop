import Providers from '@/components/layout/providers'
import { Toaster } from '@/components/ui/toaster'
import '@uploadthing/react/styles.css'
import type { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'
import { Inter } from 'next/font/google'
import './globals.css'
import moment from 'moment-timezone'
import './styles.css';
import { auth } from '@/auth';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Đặt múi giờ mặc định cho moment thành UTC+7
  moment.tz.setDefault('Asia/Ho_Chi_Minh')
  const session = await auth()

  return (
    <html lang='en'>
      <body
        className={`${inter.className} overflow-hidden `}
        suppressHydrationWarning={true}
      >
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  )
}
