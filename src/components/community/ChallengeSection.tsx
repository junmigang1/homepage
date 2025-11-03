'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Trophy, Target, Users, Calendar, Star } from 'lucide-react'
import Image from 'next/image'

// 목업 데이터
const challenges = [
  {
    id: '1',
    title: '3주 3권 교환 챌린지',
    description: '3주 동안 3권의 책을 교환하고 리뷰를 작성해보세요!',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop',
    participants: 1247,
    maxParticipants: 2000,
    startDate: '2024-01-15',
    endDate: '2024-02-05',
    rewards: ['특별 뱃지', '포인트 1000점', '우수 독자 인증'],
    isParticipating: true,
    progress: 2,
    target: 3,
    status: 'active',
  },
  {
    id: '2',
    title: '장르별 독서 여행',
    description: '소설, 에세이, 자기계발 각 장르에서 1권씩 읽어보세요',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
    participants: 856,
    maxParticipants: 1000,
    startDate: '2024-01-10',
    endDate: '2024-01-31',
    rewards: ['장르 마스터 뱃지', '포인트 500점'],
    isParticipating: false,
    progress: 0,
    target: 3,
    status: 'active',
  },
  {
    id: '3',
    title: '감동 리뷰 작성',
    description: '읽은 책에 대해 감동적인 리뷰 5개를 작성해보세요',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=200&fit=crop',
    participants: 2341,
    maxParticipants: 3000,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    rewards: ['리뷰왕 뱃지', '포인트 2000점', '특별 선물'],
    isParticipating: true,
    progress: 3,
    target: 5,
    status: 'active',
  },
  {
    id: '4',
    title: '지역별 책 여행',
    description: '서울, 부산, 대구, 광주 각 지역에서 책을 교환해보세요',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=200&fit=crop',
    participants: 567,
    maxParticipants: 1000,
    startDate: '2023-12-15',
    endDate: '2024-01-15',
    rewards: ['여행자 뱃지', '포인트 1500점'],
    isParticipating: false,
    progress: 0,
    target: 4,
    status: 'completed',
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge variant="default">진행중</Badge>
    case 'completed':
      return <Badge variant="secondary">완료</Badge>
    case 'upcoming':
      return <Badge variant="outline">예정</Badge>
    default:
      return <Badge variant="outline">알 수 없음</Badge>
  }
}

export function ChallengeSection() {
  return (
    <div className="space-y-6">
      {/* 챌린지 헤더 */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">독서 챌린지</h2>
        <p className="text-muted-foreground">
          다양한 챌린지에 참여하고 특별한 뱃지와 포인트를 획득해보세요!
        </p>
      </div>

      {/* 챌린지 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* 챌린지 이미지 */}
            <div className="relative h-48">
              <Image
                src={challenge.image}
                alt={challenge.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4">
                {getStatusBadge(challenge.status)}
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
                  <h3 className="font-semibold text-lg mb-1">{challenge.title}</h3>
                  <p className="text-sm opacity-90">{challenge.description}</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              {/* 참여자 수 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {challenge.participants.toLocaleString()}명 참여
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {challenge.participants}/{challenge.maxParticipants}
                </div>
              </div>

              {/* 진행률 (참여 중인 경우) */}
              {challenge.isParticipating && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>나의 진행률</span>
                    <span className="font-medium">{challenge.progress}/{challenge.target}</span>
                  </div>
                  <Progress 
                    value={(challenge.progress / challenge.target) * 100} 
                    className="h-2"
                  />
                </div>
              )}

              {/* 기간 */}
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {challenge.startDate} ~ {challenge.endDate}
                </span>
              </div>

              {/* 보상 */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">보상</h4>
                <div className="flex flex-wrap gap-2">
                  {challenge.rewards.map((reward, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {reward}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex gap-2">
                {challenge.isParticipating ? (
                  <>
                    <Button className="flex-1" size="sm">
                      <Target className="mr-2 h-4 w-4" />
                      계속하기
                    </Button>
                    <Button variant="outline" size="sm">
                      상세보기
                    </Button>
                  </>
                ) : challenge.status === 'active' ? (
                  <Button className="flex-1" size="sm">
                    <Trophy className="mr-2 h-4 w-4" />
                    참여하기
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1" size="sm" disabled>
                    {challenge.status === 'completed' ? '완료됨' : '예정됨'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 내 챌린지 현황 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            내 챌린지 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <div className="text-sm text-muted-foreground">참여 중인 챌린지</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5</div>
              <div className="text-sm text-muted-foreground">완료한 챌린지</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground">획득한 뱃지</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
