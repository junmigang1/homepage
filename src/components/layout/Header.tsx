'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, User, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/app/providers'
import { cn } from '@/lib/utils'

const navigation = [
  { name: '홈', href: '/' },
  { name: '교환', href: '/exchange' },
  { name: '여정', href: '/journey' },
  { name: '커뮤니티', href: '/community' },
  { name: '마이', href: '/me' },
]

export function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">책책</span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* 우측 액션 */}
        <div className="flex items-center space-x-4">
          {/* 다크모드 토글 */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="테마 변경"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* 로그인 버튼 */}
          <Button variant="outline" size="sm">
            <User className="mr-2 h-4 w-4" />
            로그인
          </Button>

          {/* 알림 배지 (개발용) */}
          <Badge variant="destructive" className="hidden sm:flex">
            3
          </Badge>
        </div>
      </div>
    </header>
  )
}
