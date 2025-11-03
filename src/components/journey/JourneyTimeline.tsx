'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle, Share2, MapPin, Calendar } from 'lucide-react'
import Image from 'next/image'
import { formatRelativeTime } from '@/lib/utils'

// 목업 데이터
const timelineEvents = [
  {
    id: '1',
    type: 'journey_start',
    date: '2024-01-01T10:00:00Z',
    user: {
      name: '문학청년',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      school: '고려대학교',
    },
    content: '책의 여정이 시작되었습니다! 정말 기대되네요.',
    emotion: '호기심',
    location: '서울 송파구',
    reactions: { heart: 12, message: 3, share: 1 },
  },
  {
    id: '2',
    type: 'review',
    date: '2024-01-05T15:30:00Z',
    user: {
      name: '책벌레영희',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      school: '연세대학교',
    },
    content: '놀라운 통찰력이 담긴 책이네요. 인류의 역사를 완전히 다른 관점에서 바라보게 되었습니다. 특히 농업혁명 부분이 정말 충격적이었어요.',
    emotion: '놀라움',
    location: '서울 마포구',
    rating: 5,
    reactions: { heart: 23, message: 8, share: 3 },
  },
  {
    id: '3',
    type: 'transfer',
    date: '2024-01-10T14:20:00Z',
    user: {
      name: '공부러버',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      school: '성균관대학교',
    },
    content: '책을 받았습니다! 공부에 대한 새로운 관점을 얻을 수 있을 것 같아요.',
    emotion: '영감',
    location: '서울 서초구',
    reactions: { heart: 15, message: 5, share: 2 },
  },
  {
    id: '4',
    type: 'review',
    date: '2024-01-15T09:45:00Z',
    user: {
      name: '독서왕김철수',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      school: '서울대학교',
    },
    content: '정말 인상깊은 책이었어요. 인류의 역사를 새롭게 바라보게 되었습니다. 다음 독자분께서도 좋은 시간 되시길 바라요!',
    emotion: '감동',
    location: '서울 강남구',
    rating: 5,
    reactions: { heart: 31, message: 12, share: 7 },
  },
]

const eventIcons = {
  journey_start: '🚀',
  review: '📖',
  transfer: '📦',
  comment: '💬',
}

const emotionColors = {
  감동: 'bg-red-100 text-red-800 border-red-200',
  영감: 'bg-blue-100 text-blue-800 border-blue-200',
  놀라움: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  호기심: 'bg-green-100 text-green-800 border-green-200',
  기쁨: 'bg-pink-100 text-pink-800 border-pink-200',
  슬픔: 'bg-gray-100 text-gray-800 border-gray-200',
}

export function JourneyTimeline({ bookId }: { bookId: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          여정 타임라인
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="relative">
              {/* 타임라인 라인 */}
              {index < timelineEvents.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-muted"></div>
              )}
              
              <div className="flex gap-4">
                {/* 아바타 */}
                <div className="relative">
                  <Avatar className="w-12 h-12 border-2 border-background shadow-md">
                    <AvatarImage src={event.user.avatar} alt={event.user.name} />
                    <AvatarFallback>{event.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 text-lg">
                    {eventIcons[event.type as keyof typeof eventIcons]}
                  </div>
                </div>

                {/* 콘텐츠 */}
                <div className="flex-1 space-y-3">
                  {/* 헤더 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{event.user.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {event.user.school}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${emotionColors[event.emotion as keyof typeof emotionColors]}`}
                      >
                        {event.emotion}
                      </Badge>
                      {event.rating && (
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-medium">{event.rating}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatRelativeTime(event.date)}
                    </span>
                  </div>

                  {/* 위치 정보 */}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>

                  {/* 콘텐츠 */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm leading-relaxed">{event.content}</p>
                  </div>

                  {/* 반응 버튼들 */}
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Heart className="h-4 w-4" />
                      <span>{event.reactions.heart}</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>{event.reactions.message}</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span>{event.reactions.share}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더 보기 버튼 */}
        <div className="text-center mt-8">
          <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
            더 많은 여정 기록 보기
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
