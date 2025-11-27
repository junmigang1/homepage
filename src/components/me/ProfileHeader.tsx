'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Edit, Settings, Share2, MapPin, BookOpen, Trophy } from 'lucide-react'

// 목업 데이터
const userProfile = {
  name: '독서왕김철수',
  email: 'booklover@example.com',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  school: '서울대학교',
  isVerified: true,
  bio: '책과 함께하는 삶을 살고 있습니다. 특히 인문학과 소설을 좋아해요.',
  location: '서울 강남구',
  joinDate: '2023-12-01',
  stats: {
    booksRead: 23,
    booksShared: 15,
    reviewsWritten: 18,
    points: 15420,
    rank: 1,
  },
  badges: [
    { name: '리뷰왕', icon: '📝', color: 'bg-blue-100 text-blue-800' },
    { name: '여정리더', icon: '🗺️', color: 'bg-green-100 text-green-800' },
    { name: '인증독자', icon: '✅', color: 'bg-purple-100 text-purple-800' },
  ],
}

export function ProfileHeader() {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* 아바타 및 기본 정보 */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback className="text-2xl">
                  {userProfile.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Trophy className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className="text-center md:text-left mt-4">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-primary">
                  {userProfile.name}
                </h1>
                {userProfile.isVerified && (
                  <Badge variant="default" className="text-xs">
                    인증
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mb-1">{userProfile.school}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{userProfile.location}</span>
              </div>
            </div>
          </div>

          {/* 프로필 정보 */}
          <div className="flex-1 space-y-4">
            {/* 소개 */}
            <div>
              <h3 className="font-semibold mb-2">소개</h3>
              <p className="text-muted-foreground leading-relaxed">
                {userProfile.bio}
              </p>
            </div>

            {/* 뱃지 */}
            <div>
              <h3 className="font-semibold mb-2">뱃지</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.badges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={`${badge.color} border-0`}
                  >
                    {badge.icon} {badge.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {userProfile.stats.booksRead}
                </div>
                <div className="text-sm text-muted-foreground">읽은 책</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {userProfile.stats.booksShared}
                </div>
                <div className="text-sm text-muted-foreground">공유한 책</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {userProfile.stats.reviewsWritten}
                </div>
                <div className="text-sm text-muted-foreground">작성한 리뷰</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {userProfile.stats.points.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">포인트</div>
              </div>
            </div>

            {/* 순위 */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-primary">전체 순위</h4>
                  <p className="text-sm text-muted-foreground">
                    이번 달 활성도 기준
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    #{userProfile.stats.rank}
                  </div>
                  <div className="text-sm text-muted-foreground">위</div>
                </div>
              </div>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              프로필 수정
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              설정
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              공유
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
