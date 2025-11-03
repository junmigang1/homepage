'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, User, Calendar, BookOpen } from 'lucide-react'
import Image from 'next/image'

// 목업 데이터
const bookData = {
  id: '1',
  title: '사피엔스',
  author: '유발 하라리',
  coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop',
  currentOwner: '독서왕김철수',
  currentOwnerSchool: '서울대학교',
  currentLocation: '서울 강남구',
  readerCount: 5,
  journeyStartDate: '2024-01-01',
  totalDistance: 245.7, // km
  totalReaders: 5,
  isExchangeable: true,
  nextReader: '책벌레영희',
  nextReaderSchool: '연세대학교',
  estimatedTransfer: '2024-01-20',
}

export function JourneyHeader({ bookId }: { bookId: string }) {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 py-8">
      <div className="container">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* 책 표지 */}
              <div className="relative flex-shrink-0">
                <Image
                  src={bookData.coverUrl}
                  alt={bookData.title}
                  width={150}
                  height={225}
                  className="rounded-lg shadow-lg"
                />
                <Badge 
                  className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-sm px-3 py-1"
                >
                  {bookData.readerCount}번째 독자
                </Badge>
              </div>

              {/* 책 정보 */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">
                    {bookData.title}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-4">
                    {bookData.author}
                  </p>
                </div>

                {/* 현재 소유자 정보 */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-5 w-5 text-primary" />
                    <span className="font-medium">현재 소유자</span>
                  </div>
                  <p className="text-lg font-semibold">{bookData.currentOwner}</p>
                  <p className="text-sm text-muted-foreground">{bookData.currentOwnerSchool}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{bookData.currentLocation}</span>
                  </div>
                </div>

                {/* 여정 통계 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{bookData.totalReaders}</div>
                    <div className="text-sm text-muted-foreground">총 독자 수</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{bookData.totalDistance}km</div>
                    <div className="text-sm text-muted-foreground">총 이동거리</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">23</div>
                    <div className="text-sm text-muted-foreground">일간 여정</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">4.8</div>
                    <div className="text-sm text-muted-foreground">평균 평점</div>
                  </div>
                </div>

                {/* 다음 여정 정보 */}
                {bookData.nextReader && (
                  <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-accent" />
                      <span className="font-medium text-accent">다음 여정</span>
                    </div>
                    <p className="font-semibold">{bookData.nextReader}님에게 전달 예정</p>
                    <p className="text-sm text-muted-foreground">{bookData.nextReaderSchool}</p>
                    <p className="text-sm text-muted-foreground">
                      예상 전달일: {bookData.estimatedTransfer}
                    </p>
                    <Button className="mt-3" size="sm">
                      전달 확인하기
                    </Button>
                  </div>
                )}

                {/* 액션 버튼들 */}
                <div className="flex gap-3 pt-2">
                  <Button variant="outline">
                    <MapPin className="mr-2 h-4 w-4" />
                    여정 지도 보기
                  </Button>
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    타임라인 보기
                  </Button>
                  {bookData.isExchangeable && (
                    <Button>
                      교환 요청하기
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
