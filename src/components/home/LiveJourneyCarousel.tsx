'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react'
import Image from 'next/image'

import { Book } from '@/types'

// 목업 데이터
const journeyBooks: Book[] = [
  {
    id: '1',
    title: '해리포터와 마법사의 돌',
    author: 'J.K. 롤링',
    coverUrl:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop',
    currentLocation: '서울 강남구',
    readerCount: 3,
    lastActivity: '2시간 전',
    progress: 75,
    isExchangeable: true,
  },
  {
    id: '2',
    title: '1984',
    author: '조지 오웰',
    coverUrl:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
    currentLocation: '부산 해운대구',
    readerCount: 5,
    lastActivity: '30분 전',
    progress: 60,
    isExchangeable: true,
  },
  {
    id: '3',
    title: '작은 아씨들',
    author: '루이자 메이 올컷',
    coverUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop',
    currentLocation: '대구 수성구',
    readerCount: 2,
    lastActivity: '1일 전',
    progress: 40,
    isExchangeable: true,
  },
  {
    id: '4',
    title: '데미안',
    author: '헤르만 헤세',
    coverUrl:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop',
    currentLocation: '인천 연수구',
    readerCount: 4,
    lastActivity: '3시간 전',
    progress: 90,
    isExchangeable: true,
  },
]

export function LiveJourneyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % journeyBooks.length)
  }

  const prevSlide = () => {
    setCurrentIndex(
      prev => (prev - 1 + journeyBooks.length) % journeyBooks.length
    )
  }

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {journeyBooks.map(book => (
            <div key={book.id} className="w-full flex-shrink-0 px-4">
              <Card className="bg-background/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* 책 표지 */}
                    <div className="relative">
                      <Image
                        src={book.coverUrl}
                        alt={book.title}
                        width={120}
                        height={180}
                        className="rounded-lg shadow-md"
                      />
                      <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground">
                        {book.readerCount}번째 독자
                      </Badge>
                    </div>

                    {/* 책 정보 */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-1">
                          {book.title}
                        </h3>
                        <p className="text-muted-foreground">{book.author}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>현재 위치: {book.currentLocation}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            마지막 활동: {book.lastActivity}
                          </span>
                        </div>
                      </div>

                      {/* 진행률 */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>여정 진행률</span>
                          <span className="font-medium">{book.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${book.progress}%` }}
                          />
                        </div>
                      </div>

                      <Button className="w-full" variant="outline">
                        여정 지도 보기
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* 인디케이터 */}
      <div className="flex justify-center mt-6 space-x-2">
        {journeyBooks.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
