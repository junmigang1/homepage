'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle, Star, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { formatRelativeTime } from '@/lib/utils'

// 목업 데이터
const popularReviews = [
  {
    id: '1',
    user: {
      name: '독서왕김철수',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      school: '서울대학교',
      isVerified: true,
    },
    book: {
      title: '사피엔스',
      author: '유발 하라리',
      coverUrl:
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=60&h=90&fit=crop',
    },
    rating: 5,
    content:
      '이 책을 읽고 나서 인류의 역사를 완전히 다르게 보게 되었어요. 특히 농업혁명 부분이 정말 충격적이었습니다...',
    reactions: { heart: 89, message: 23, share: 12 },
    createdAt: '2024-01-15T14:30:00Z',
    isTrending: true,
    rank: 1,
  },
  {
    id: '2',
    user: {
      name: '문학청년',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      school: '고려대학교',
      isVerified: true,
    },
    book: {
      title: '아몬드',
      author: '손원평',
      coverUrl:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=60&h=90&fit=crop',
    },
    rating: 5,
    content:
      '감정을 느끼지 못하는 소년의 이야기인데, 오히려 더 깊은 감동을 받았어요. 우리가 당연하게 여기는 감정들이...',
    reactions: { heart: 67, message: 18, share: 8 },
    createdAt: '2024-01-13T11:20:00Z',
    isTrending: true,
    rank: 2,
  },
  {
    id: '3',
    user: {
      name: '책벌레영희',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      school: '연세대학교',
      isVerified: false,
    },
    book: {
      title: '1984',
      author: '조지 오웰',
      coverUrl:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=90&fit=crop',
    },
    rating: 5,
    content:
      '빅브라더가 당신을 지켜보고 있다... 이 한 줄이 얼마나 무서운지 이제야 알겠어요. 현실과 너무 닮아있어서...',
    reactions: { heart: 45, message: 12, share: 5 },
    createdAt: '2024-01-14T16:45:00Z',
    isTrending: false,
    rank: 3,
  },
  {
    id: '4',
    user: {
      name: '공부러버',
      avatar:
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=40&h=40&fit=crop&crop=face',
      school: '성균관대학교',
      isVerified: false,
    },
    book: {
      title: '완벽한 공부법',
      author: '이지성',
      coverUrl:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=90&fit=crop',
    },
    rating: 4,
    content:
      '이 책에서 배운 공부법을 실제로 적용해봤는데 정말 효과가 있었어요! 특히 25분 집중 + 5분 휴식 사이클이...',
    reactions: { heart: 34, message: 9, share: 4 },
    createdAt: '2024-01-12T09:15:00Z',
    isTrending: false,
    rank: 4,
  },
]

const topUsers = [
  {
    name: '독서왕김철수',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    school: '서울대학교',
    reviews: 23,
    points: 15420,
    rank: 1,
  },
  {
    name: '문학청년',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    school: '고려대학교',
    reviews: 18,
    points: 12890,
    rank: 2,
  },
  {
    name: '책벌레영희',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    school: '연세대학교',
    reviews: 15,
    points: 11200,
    rank: 3,
  },
]

export function PopularReviews() {
  return (
    <div className="space-y-6">
      {/* 인기 리뷰 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            인기 리뷰
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {popularReviews.map(review => (
            <div
              key={review.id}
              className="space-y-3 p-4 rounded-lg border hover:bg-muted/30 transition-colors"
            >
              {/* 순위 */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    review.rank === 1
                      ? 'bg-yellow-100 text-yellow-800'
                      : review.rank === 2
                        ? 'bg-gray-100 text-gray-800'
                        : review.rank === 3
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {review.rank}
                </div>
                {review.isTrending && (
                  <Badge variant="destructive" className="text-xs">
                    HOT
                  </Badge>
                )}
              </div>

              {/* 사용자 정보 */}
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={review.user.avatar}
                    alt={review.user.name}
                  />
                  <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      {review.user.name}
                    </span>
                    {review.user.isVerified && (
                      <Badge variant="default" className="text-xs">
                        인증
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {review.user.school}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{review.rating}</span>
                </div>
              </div>

              {/* 책 정보 */}
              <div className="flex gap-3">
                <Image
                  src={review.book.coverUrl}
                  alt={review.book.title}
                  width={40}
                  height={60}
                  className="rounded-lg shadow-sm"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{review.book.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {review.book.author}
                  </p>
                </div>
              </div>

              {/* 리뷰 내용 */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {review.content}
              </p>

              {/* 반응 및 시간 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Heart className="h-3 w-3" />
                    <span>{review.reactions.heart}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MessageCircle className="h-3 w-3" />
                    <span>{review.reactions.message}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(review.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 우수 이용자 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            우수 이용자
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topUsers.map(user => (
            <div
              key={user.rank}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  user.rank === 1
                    ? 'bg-yellow-100 text-yellow-800'
                    : user.rank === 2
                      ? 'bg-gray-100 text-gray-800'
                      : user.rank === 3
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-muted text-muted-foreground'
                }`}
              >
                {user.rank}
              </div>
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{user.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{user.school}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs text-muted-foreground">
                    리뷰 {user.reviews}개
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user.points.toLocaleString()}점
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 더 보기 버튼 */}
      <Button variant="outline" className="w-full">
        더 많은 리뷰 보기
      </Button>
    </div>
  )
}
