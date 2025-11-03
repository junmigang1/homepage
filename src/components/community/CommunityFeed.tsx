'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle, Share2, Star, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { formatRelativeTime } from '@/lib/utils'

// 목업 데이터
const feedPosts = [
  {
    id: '1',
    user: {
      name: '독서왕김철수',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      school: '서울대학교',
      isVerified: true,
    },
    book: {
      title: '사피엔스',
      author: '유발 하라리',
      coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=60&h=90&fit=crop',
    },
    type: 'review',
    content: '이 책을 읽고 나서 인류의 역사를 완전히 다르게 보게 되었어요. 특히 농업혁명 부분이 정말 충격적이었습니다. 우리가 당연하게 여기는 것들이 사실은 얼마나 최근의 발명인지...',
    rating: 5,
    reactions: { heart: 23, message: 8, share: 3 },
    createdAt: '2024-01-15T14:30:00Z',
    isHot: true,
    tags: ['인문학', '역사', '인사이트'],
  },
  {
    id: '2',
    user: {
      name: '책벌레영희',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      school: '연세대학교',
      isVerified: false,
    },
    book: {
      title: '1984',
      author: '조지 오웰',
      coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=90&fit=crop',
    },
    type: 'journey',
    content: '빅브라더가 당신을 지켜보고 있다... 이 한 줄이 얼마나 무서운지 이제야 알겠어요. 현실과 너무 닮아있어서 소름이 돋았습니다. 다음 독자분께서도 좋은 시간 되시길!',
    reactions: { heart: 18, message: 5, share: 2 },
    createdAt: '2024-01-14T16:45:00Z',
    isHot: false,
    tags: ['소설', '디스토피아', '경고'],
  },
  {
    id: '3',
    user: {
      name: '문학청년',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      school: '고려대학교',
      isVerified: true,
    },
    book: {
      title: '아몬드',
      author: '손원평',
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=60&h=90&fit=crop',
    },
    type: 'review',
    content: '감정을 느끼지 못하는 소년의 이야기인데, 오히려 더 깊은 감동을 받았어요. 우리가 당연하게 여기는 감정들이 얼마나 소중한지, 그리고 그 감정들을 나눌 수 있는 사람들이 얼마나 중요한지...',
    rating: 5,
    reactions: { heart: 31, message: 14, share: 7 },
    createdAt: '2024-01-13T11:20:00Z',
    isHot: true,
    tags: ['소설', '감동', '감정'],
  },
  {
    id: '4',
    user: {
      name: '공부러버',
      avatar: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=40&h=40&fit=crop&crop=face',
      school: '성균관대학교',
      isVerified: false,
    },
    book: {
      title: '완벽한 공부법',
      author: '이지성',
      coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=90&fit=crop',
    },
    type: 'tip',
    content: '이 책에서 배운 공부법을 실제로 적용해봤는데 정말 효과가 있었어요! 특히 25분 집중 + 5분 휴식 사이클이 정말 도움이 됐습니다. 여러분도 한번 시도해보세요!',
    reactions: { heart: 16, message: 9, share: 4 },
    createdAt: '2024-01-12T09:15:00Z',
    isHot: false,
    tags: ['자기계발', '공부법', '팁'],
  },
]

const postTypeLabels = {
  review: '리뷰',
  journey: '여정',
  tip: '팁',
  question: '질문',
}

export function CommunityFeed() {
  return (
    <div className="space-y-6">
      {/* 새 포스트 작성 버튼 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
              <AvatarFallback>나</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="flex-1 justify-start text-muted-foreground">
              오늘 읽은 책에 대해 이야기해보세요...
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 피드 포스트들 */}
      {feedPosts.map((post) => (
        <Card key={post.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            {/* 헤더 */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{post.user.name}</span>
                    {post.user.isVerified && (
                      <Badge variant="default" className="text-xs">
                        인증
                      </Badge>
                    )}
                    {post.isHot && (
                      <Badge variant="destructive" className="text-xs">
                        HOT
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.user.school}</span>
                    <span>•</span>
                    <span>{formatRelativeTime(post.createdAt)}</span>
                    <span>•</span>
                    <span>{postTypeLabels[post.type as keyof typeof postTypeLabels]}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* 책 정보 */}
            <div className="flex gap-4 mb-4">
              <Image
                src={post.book.coverUrl}
                alt={post.book.title}
                width={60}
                height={90}
                className="rounded-lg shadow-sm"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{post.book.title}</h3>
                <p className="text-muted-foreground mb-2">{post.book.author}</p>
                {post.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{post.rating}/5</span>
                  </div>
                )}
              </div>
            </div>

            {/* 콘텐츠 */}
            <div className="mb-4">
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* 반응 버튼들 */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-6">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>{post.reactions.heart}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.reactions.message}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  <span>{post.reactions.share}</span>
                </Button>
              </div>
              <Button variant="outline" size="sm">
                상세 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* 더 보기 버튼 */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          더 많은 포스트 보기
        </Button>
      </div>
    </div>
  )
}
