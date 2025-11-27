'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Star, MapPin, Users, BookOpen, Heart } from 'lucide-react'

// 목업 데이터
const badges = [
  {
    id: '1',
    title: '5명의 독자 달성',
    description: '5명의 독자가 이 책을 읽었습니다',
    icon: Users,
    isEarned: true,
    earnedAt: '2024-01-15',
    rarity: 'common',
  },
  {
    id: '2',
    title: '여정의 시작',
    description: '첫 번째 독자로 책의 여정을 시작했습니다',
    icon: BookOpen,
    isEarned: true,
    earnedAt: '2024-01-01',
    rarity: 'common',
  },
  {
    id: '3',
    title: '100km 여행',
    description: '책이 100km 이상 이동했습니다',
    icon: MapPin,
    isEarned: true,
    earnedAt: '2024-01-10',
    rarity: 'rare',
  },
  {
    id: '4',
    title: '평점 4.5+ 달성',
    description: '평균 평점 4.5점 이상을 달성했습니다',
    icon: Star,
    isEarned: true,
    earnedAt: '2024-01-12',
    rarity: 'rare',
  },
  {
    id: '5',
    title: '감동의 전달자',
    description: '10개 이상의 감동적인 리뷰를 받았습니다',
    icon: Heart,
    isEarned: false,
    earnedAt: null,
    rarity: 'epic',
    progress: 7,
    target: 10,
  },
  {
    id: '6',
    title: '전국 여행',
    description: '전국 5개 도시를 방문했습니다',
    icon: Trophy,
    isEarned: false,
    earnedAt: null,
    rarity: 'legendary',
    progress: 3,
    target: 5,
  },
]

const rarityColors = {
  common: 'bg-gray-100 text-gray-800 border-gray-200',
  rare: 'bg-blue-100 text-blue-800 border-blue-200',
  epic: 'bg-purple-100 text-purple-800 border-purple-200',
  legendary: 'bg-yellow-100 text-yellow-800 border-yellow-200',
}

const rarityIcons = {
  common: '🥉',
  rare: '🥈',
  epic: '🥇',
  legendary: '👑',
}

export function JourneyBadges({ bookId }: { bookId: string }) {
  const earnedBadges = badges.filter(badge => badge.isEarned)
  const unearnedBadges = badges.filter(badge => !badge.isEarned)

  return (
    <div className="space-y-6">
      {/* 획득한 뱃지 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            획득한 뱃지
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {earnedBadges.map(badge => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 text-sm">
                      {rarityIcons[badge.rarity as keyof typeof rarityIcons]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{badge.title}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${rarityColors[badge.rarity as keyof typeof rarityColors]}`}
                      >
                        {badge.rarity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {badge.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      획득일: {badge.earnedAt}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* 진행 중인 뱃지 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            진행 중인 뱃지
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {unearnedBadges.map(badge => {
              const Icon = badge.icon
              const progress = (badge.progress! / badge.target!) * 100

              return (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-muted/50"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="absolute -top-1 -right-1 text-sm opacity-50">
                      {rarityIcons[badge.rarity as keyof typeof rarityIcons]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-muted-foreground">
                        {badge.title}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs opacity-50 ${rarityColors[badge.rarity as keyof typeof rarityColors]}`}
                      >
                        {badge.rarity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {badge.description}
                    </p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>진행률</span>
                        <span>
                          {badge.progress}/{badge.target}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* 통계 요약 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">여정 통계</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {earnedBadges.length}
              </div>
              <div className="text-sm text-muted-foreground">획득한 뱃지</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {badges.length}
              </div>
              <div className="text-sm text-muted-foreground">전체 뱃지</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
