import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileTabBar } from '@/components/layout/MobileTabBar'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '책책 - 교환독서 플랫폼',
  description:
    '책은 떠돌며 새로운 이야기를 만납니다. 교환독서로 책의 여정을 함께해보세요.',
  keywords: ['교환독서', '책', '독서', '커뮤니티', '여정'],
  authors: [{ name: '책책팀' }],
  openGraph: {
    title: '책책 - 교환독서 플랫폼',
    description: '책은 떠돌며 새로운 이야기를 만납니다.',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${inter.className} h-full bg-background`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pb-16 md:pb-0">{children}</main>
            <Footer />
            <MobileTabBar />
          </div>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#4A7043',
                color: '#FFFFFF',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
