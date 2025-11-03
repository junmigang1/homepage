'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Share2, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// 목업 데이터
const recommendedBooks = [
  {
    id: '1',
    title: '사피엔스',
    author: '유발 하라리',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop',
    genre: '인문학',
    condition: '양호',
    owner: '독서왕',
    rating: 4.8,
    reviewCount: 23,
    isExchangeable: true,
  },
  {
    id: '2',
    title: '완벽한 공부법',
    author: '이지성',
    coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
    genre: '자기계발',
    condition: '새책',
    owner: '공부러버',
    rating: 4.6,
    reviewCount: 15,
    isExchangeable: true,
  },
  {
    id: '3',
    title: '미드나잇 라이브러리',
    author: '매트 헤이그',
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop',
    genre: '소설',
    condition: '양호',
    owner: '책벌레',
    rating: 4.9,
    reviewCount: 31,
    isExchangeable: false,
  },
  {
    id: '4',
    title: '부의 추월차선',
    author: '엠제이 드마코',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop',
    genre: '경제',
    condition: '양호',
    owner: '투자왕',
    rating: 4.5,
    reviewCount: 18,
    isExchangeable: true,
  },
  {
    id: '5',
    title: '아몬드',
    author: '손원평',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop',
    genre: '소설',
    condition: '새책',
    owner: '문학청년',
    rating: 4.7,
    reviewCount: 27,
    isExchangeable: true,
  },
  {
    id: '6',
    title: '마음의 평화',
    author: '달라이 라마',
    coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
    genre: '철학',
    condition: '양호',
    owner: '명상가',
    rating: 4.8,
    reviewCount: 19,
    isExchangeable: true,
  },
]

export function RecommendedGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendedBooks.map((book) => (
        <Card 
          key={book.id} 
          className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* 책 표지 */}
              <div className="relative flex-shrink-0">
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  width={80}
                  height={120}
                  className="rounded-lg shadow-sm"
                />
                {!book.isExchangeable && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 text-xs"
                  >
                    교환중
                  </Badge>
                )}
              </div>

              {/* 책 정보 */}
              <div className="flex-1 min-w-0">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {book.author}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {book.genre}
                    </Badge>
                    <Badge 
                      variant={book.condition === '새책' ? 'success' : 'secondary'}
                      className="text-xs"
                    >
                      {book.condition}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{book.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({book.reviewCount}개 리뷰)
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    소유자: {book.owner}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <div className="flex gap-2 w-full">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                disabled={!book.isExchangeable}
              >
                {book.isExchangeable ? '교환 요청' : '교환 불가'}
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
