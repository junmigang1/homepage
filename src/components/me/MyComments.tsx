'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle, Star, BookOpen, Calendar } from 'lucide-react'
import Image from 'next/image'
import { formatRelativeTime } from '@/lib/utils'

// 목업 데이터
const myComments = [
  {
    id: '1',
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
    isPublic: true,
  },
  {
    id: '2',
    book: {
      title: '1984',
      author: '조지 오웰',
      coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=90&fit=crop',
    },
    type: 'journey_note',
    content: '빅브라더가 당신을 지켜보고 있다... 이 한 줄이 얼마나 무서운지 이제야 알겠어요. 현실과 너무 닮아있어서 소름이 돋았습니다. 다음 독자분께서도 좋은 시간 되시길!',
    reactions: { heart: 18, message: 5, share: 2 },
    createdAt: '2024-01-14T16:45:00Z',
    isPublic: true,
  },
  {
    id: '3',
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
    isPublic: true,
  },
  {
    id: '4',
    book: {
      title: '완벽한 공부법',
      author: '이지성',
      coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=90&fit=crop',
    },
    type: 'tip',
    content: '이 책에서 배운 공부법을 실제로 적용해봤는데 정말 효과가 있었어요! 특히 25분 집중 + 5분 휴식 사이클이 정말 도움이 됐습니다. 여러분도 한번 시도해보세요!',
    reactions: { heart: 16, message: 9, share: 4 },
    createdAt: '2024-01-12T09:15:00Z',
    isPublic: true,
  },
  {
    id: '5',
    book: {
      title: '부의 추월차선',
      author: '엠제이 드마코',
      coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=60&h=90&fit=crop',
    },
    type: 'review',
    content: '부를 창출하는 새로운 사고방식을 제시하는 책이네요. 기존의 직장인 사고방식에서 벗어나야 한다는 메시지가 인상적이었습니다.',
    rating: 4,
    reactions: { heart: 12, message: 3, share: 1 },
    createdAt: '2024-01-10T15:30:00Z',
    isPublic: false,
  },
]

const commentTypeLabels = {
  review: '리뷰',
  journey_note: '여정 노트',
  tip: '팁',
  question: '질문',
}

const commentTypeColors = {
  review: 'bg-blue-100 text-blue-800',
  journey_note: 'bg-green-100 text-green-800',
  tip: 'bg-yellow-100 text-yellow-800',
  question: 'bg-purple-100 text-purple-800',
}

export function MyComments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          나의 코멘트
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {myComments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                {/* 책 표지 */}
                <Image
                  src={comment.book.coverUrl}
                  alt={comment.book.title}
                  width={60}
                  height={90}
                  className="rounded-lg shadow-sm"
                />
                
                <div className="flex-1 space-y-3">
                  {/* 헤더 */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">{comment.book.title}</h4>
                      <p className="text-sm text-muted-foreground">{comment.book.author}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${commentTypeColors[comment.type as keyof typeof commentTypeColors]}`}
                      >
                        {commentTypeLabels[comment.type as keyof typeof commentTypeLabels]}
                      </Badge>
                      {!comment.isPublic && (
                        <Badge variant="secondary" className="text-xs">
                          비공개
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* 평점 (리뷰인 경우) */}
                  {comment.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{comment.rating}/5</span>
                    </div>
                  )}

                  {/* 코멘트 내용 */}
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-sm leading-relaxed line-clamp-3">
                      {comment.content}
                    </p>
                  </div>

                  {/* 반응 및 시간 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        <span>{comment.reactions.heart}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span>{comment.reactions.message}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      수정
                    </Button>
                    <Button variant="outline" size="sm">
                      삭제
                    </Button>
                    <Button variant="outline" size="sm">
                      공유
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더 보기 버튼 */}
        <div className="text-center mt-6">
          <Button variant="outline" size="lg">
            더 많은 코멘트 보기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
