'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Map, Users, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const mobileNavigation = [
  { name: '홈', href: '/', icon: Home },
  { name: '교환', href: '/exchange', icon: BookOpen },
  { name: '여정', href: '/journey', icon: Map },
  { name: '커뮤니티', href: '/community', icon: Users },
  { name: '마이', href: '/me', icon: User },
]

export function MobileTabBar() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden" data-testid="mobile-tab-bar">
      <nav className="flex items-center justify-around h-16">
        {mobileNavigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn(
                'h-5 w-5',
                isActive && 'text-primary'
              )} />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
