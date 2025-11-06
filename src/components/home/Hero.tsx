'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Users, Map } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/20">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* 메인 헤드라인 */}
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            책은 떠돌며
            <br />
            새로운 이야기를 만납니다
          </h1>
          
          {/* 서브 텍스트 */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            교환독서로 책의 여정을 함께하고, 
            <br className="hidden md:block" />
            새로운 독자들과 소통해보세요
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/exchange?tab=register">
                내 책 여정 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/exchange?tab=browse">
                책 둘러보기
              </Link>
            </Button>
          </div>

          {/* 통계 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 border shadow-sm">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary">1,234</div>
              <div className="text-sm text-muted-foreground">등록된 책</div>
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 border shadow-sm">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary">567</div>
              <div className="text-sm text-muted-foreground">활성 독자</div>
            </div>
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 border shadow-sm">
              <Map className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary">89</div>
              <div className="text-sm text-muted-foreground">여정 완료</div>
            </div>
          </div>
        </div>
      </div>

      {/* 배경 장식 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-secondary/20 rounded-full animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  )
}
