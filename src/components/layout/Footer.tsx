import Link from 'next/link'
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  about: [
    { name: '서비스 소개', href: '/about' },
    { name: '이용 가이드', href: '/guide' },
    { name: '안전거래', href: '/safety' },
  ],
  support: [
    { name: '자주 묻는 질문', href: '/faq' },
    { name: '문의하기', href: '/contact' },
    { name: '공지사항', href: '/notice' },
  ],
  legal: [
    { name: '이용약관', href: '/terms' },
    { name: '개인정보처리방침', href: '/privacy' },
    { name: '청소년보호정책', href: '/youth' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 정보 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary">책책</span>
            </div>
            <p className="text-sm text-muted-foreground">
              책은 떠돌며 새로운 이야기를 만납니다.
              <br />
              교환독서로 책의 여정을 함께해보세요.
            </p>
            <div className="flex space-x-4">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Phone className="h-4 w-4 text-muted-foreground" />
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* 링크 섹션들 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">서비스</h3>
            <ul className="space-y-2">
              {footerLinks.about.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">고객지원</h3>
            <ul className="space-y-2">
              {footerLinks.support.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">법적 고지</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 책책. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <span className="text-sm text-muted-foreground">
                사업자등록번호: 123-45-67890
              </span>
              <span className="text-sm text-muted-foreground">
                통신판매업신고: 2024-서울강남-1234
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
