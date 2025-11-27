'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, TrendingUp, Calendar, Star } from 'lucide-react'

// 목업 데이터
const readingStats = {
  monthlyGoal: 5,
  booksRead: 3,
  pagesRead: 1247,
  readingTime: 42, // hours
  favoriteGenres: [
    { name: '소설', count: 8, percentage: 35 },
    { name: '인문학', count: 6, percentage: 26 },
    { name: '자기계발', count: 4, percentage: 17 },
    { name: '에세이', count: 3, percentage: 13 },
    { name: '경제', count: 2, percentage: 9 },
  ],
  monthlyProgress: [
    { month: '1월', books: 3, pages: 1247 },
    { month: '12월', books: 4, pages: 1589 },
    { month: '11월', books: 2, pages: 892 },
    { month: '10월', books: 5, pages: 2103 },
  ],
  readingStreak: 12, // days
  averageRating: 4.6,
  totalReviews: 18,
}

export function ReadingStats() {
  const goalProgress = (readingStats.booksRead / readingStats.monthlyGoal) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          독서 통계
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 이번 달 목표 */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">이번 달 목표</h3>
            <Badge variant="outline">
              {readingStats.booksRead}/{readingStats.monthlyGoal}권
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-3 mb-2">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${goalProgress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {readingStats.monthlyGoal - readingStats.booksRead}권 더 읽으면 목표
            달성!
          </p>
        </div>

        {/* 독서 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {readingStats.booksRead}
            </div>
            <div className="text-sm text-muted-foreground">이번 달 읽은 책</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {readingStats.pagesRead.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">읽은 페이지</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {readingStats.readingTime}
            </div>
            <div className="text-sm text-muted-foreground">독서 시간(시간)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {readingStats.readingStreak}
            </div>
            <div className="text-sm text-muted-foreground">연속 독서일</div>
          </div>
        </div>

        {/* 선호 장르 */}
        <div>
          <h4 className="font-semibold mb-4">선호 장르</h4>
          <div className="space-y-3">
            {readingStats.favoriteGenres.map((genre, index) => (
              <div key={genre.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{genre.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {genre.count}권
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {genre.percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${genre.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 월별 독서 현황 */}
        <div>
          <h4 className="font-semibold mb-4">월별 독서 현황</h4>
          <div className="space-y-3">
            {readingStats.monthlyProgress.map((month, index) => (
              <div
                key={month.month}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{month.month}</div>
                    <div className="text-xs text-muted-foreground">
                      {month.pages}페이지
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {month.books}권
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">
                      {readingStats.averageRating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 리뷰 통계 */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">리뷰 작성</h4>
              <p className="text-sm text-muted-foreground">
                총 {readingStats.totalReviews}개의 리뷰 작성
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {readingStats.averageRating}
              </div>
              <div className="text-sm text-muted-foreground">평균 평점</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
