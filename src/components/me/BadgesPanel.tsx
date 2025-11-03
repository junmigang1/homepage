'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Trophy, Star, Target, Award } from 'lucide-react'

// 목업 데이터
const badges = [
  {
    id: '1',
    title: '리뷰왕',
    description: '10개 이상의 리뷰를 작성했습니다',
    icon: '📝',
    isEarned: true,
    earnedAt: '2024-01-10',
    rarity: 'rare',
    progress: 18,
    target: 10,
  },
  {
    id: '2',
    title: '여정리더',
    description: '5권 이상의 책을 교환했습니다',
    icon: '🗺️',
    isEarned: true,
    earnedAt: '2024-01-05',
    rarity: 'rare',
    progress: 8,
    target: 5,
  },
  {
    id: '3',
    title: '인증독자',
    description: '학교 인증을 완료했습니다',
    icon: '✅',
    isEarned: true,
    earnedAt: '2023-12-01',
    rarity: 'common',
    progress: 1,
    target: 1,
  },
  {
    id: '4',
    title: '감동의 전달자',
    description: '20개 이상의 감동적인 리뷰를 받았습니다',
    icon: '💝',
    isEarned: false,
    earnedAt: null,
    rarity: 'epic',
    progress: 12,
    target: 20,
  },
  {
    id: '5',
    title: '전국 여행',
    description: '전국 5개 도시에서 책을 교환했습니다',
    icon: '🌍',
    isEarned: false,
    earnedAt: null,
    rarity: 'legendary',
    progress: 3,
    target: 5,
  },
  {
    id: '6',
    title: '독서 마라톤',
    description: '30일 연속으로 독서를 했습니다',
    icon: '🏃',
    isEarned: false,
    earnedAt: null,
    rarity: 'epic',
    progress: 12,
    target: 30,
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

const stats = {
  totalBadges: 3,
  earnedBadges: 3,
  totalPoints: 15420,
  rank: 1,
}

export function BadgesPanel() {
  const earnedBadges = badges.filter(badge => badge.isEarned)
  const unearnedBadges = badges.filter(badge => !badge.isEarned)

  return (
    <div className="space-y-6">
      {/* 뱃지 통계 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            뱃지 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.earnedBadges}</div>
              <div className="text-sm text-muted-foreground">획득한 뱃지</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalBadges}</div>
              <div className="text-sm text-muted-foreground">전체 뱃지</div>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(stats.earnedBadges / stats.totalBadges) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* 포인트 및 순위 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            포인트 & 순위
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">보유 포인트</span>
              <span className="text-lg font-bold text-accent">{stats.totalPoints.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">전체 순위</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">#{stats.rank}</span>
                <Badge variant="default" className="text-xs">위</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 획득한 뱃지 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            획득한 뱃지
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border"
              >
                <div className="text-2xl">{badge.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{badge.title}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${rarityColors[badge.rarity as keyof typeof rarityColors]}`}
                    >
                      {rarityIcons[badge.rarity as keyof typeof rarityIcons]}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    획득일: {badge.earnedAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 진행 중인 뱃지 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            진행 중인 뱃지
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {unearnedBadges.map((badge) => {
              const progress = (badge.progress / badge.target) * 100
              
              return (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-muted/50"
                >
                  <div className="text-2xl opacity-50">{badge.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-muted-foreground">{badge.title}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs opacity-50 ${rarityColors[badge.rarity as keyof typeof rarityColors]}`}
                      >
                        {rarityIcons[badge.rarity as keyof typeof rarityIcons]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>진행률</span>
                        <span>{badge.progress}/{badge.target}</span>
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
    </div>
  )
}
