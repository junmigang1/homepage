'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, ThumbsUp, User as UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Book, User } from '@/types'

interface CommunityPost {
  id: string
  user: User
  book: Partial<Book>
  content: string
  reactions: {
    heart: number
    thumbsUp: number
    message: number
  }
  createdAt: string
  isHot: boolean
}

// 목업 데이터
const communityPosts: CommunityPost[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: '독서왕김철수',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      school: '서울대학교',
    },
    book: {
      id: 'b1',
      title: '사피엔스',
      author: '유발 하라리',
      coverUrl:
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=60&h=90&fit=crop',
    },
    content:
      '이 책을 읽고 나서 인류의 역사를 완전히 다르게 보게 되었어요. 특히 농업혁명 부분이 정말 충격적이었습니다...',
    reactions: { heart: 23, thumbsUp: 15, message: 8 },
    createdAt: '2시간 전',
    isHot: true,
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: '책벌레영희',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      school: '연세대학교',
    },
    book: {
      id: 'b2',
      title: '1984',
      author: '조지 오웰',
      coverUrl:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=90&fit=crop',
    },
    content:
      '빅브라더가 당신을 지켜보고 있다... 이 한 줄이 얼마나 무서운지 이제야 알겠어요. 현실과 너무 닮아있어서 소름이 돋았습니다.',
    reactions: { heart: 18, thumbsUp: 12, message: 5 },
    createdAt: '5시간 전',
    isHot: false,
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: '문학청년',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      school: '고려대학교',
    },
    book: {
      id: 'b3',
      title: '아몬드',
      author: '손원평',
      coverUrl:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=60&h=90&fit=crop',
    },
    content:
      '감정을 느끼지 못하는 소년의 이야기인데, 오히려 더 깊은 감동을 받았어요. 우리가 당연하게 여기는 감정들이 얼마나 소중한지...',
    reactions: { heart: 31, thumbsUp: 22, message: 14 },
    createdAt: '1일 전',
    isHot: true,
  },
  {
    id: '4',
    user: {
      id: 'u4',
      name: '공부러버',
      avatar:
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=40&h=40&fit=crop&crop=face',
      school: '성균관대학교',
    },
    book: {
      id: 'b4',
      title: '완벽한 공부법',
      author: '이지성',
      coverUrl:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=90&fit=crop',
    },
    content:
      '공부 방법을 완전히 바꿔야겠어요. 지금까지 잘못된 방법으로 공부하고 있었던 것 같습니다. 추천합니다!',
    reactions: { heart: 16, thumbsUp: 9, message: 6 },
    createdAt: '2일 전',
    isHot: false,
  },
]

export function CommunityHighlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {communityPosts.map(post => (
        <Card
          key={post.id}
          className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <CardContent className="p-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Image
                  src={post.user.avatar || '/placeholder-avatar.png'}
                  alt={post.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{post.user.name}</span>
                    {post.isHot && (
                      <Badge variant="destructive" className="text-xs">
                        HOT
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {post.user.school}
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {post.createdAt}
              </span>
            </div>

            {/* 책 정보 */}
            <div className="flex gap-3 mb-4">
              <Image
                src={post.book.coverUrl || '/placeholder-book.png'}
                alt={post.book.title || '책 표지'}
                width={60}
                height={90}
                className="rounded-lg shadow-sm"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{post.book.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {post.book.author}
                </p>
              </div>
            </div>

            {/* 리뷰 내용 */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {post.content}
            </p>

            {/* 반응 버튼들 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Heart className="h-4 w-4 mr-1" />
                  {post.reactions.heart}
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {post.reactions.thumbsUp}
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {post.reactions.message}
                </Button>
              </div>
              <Button variant="outline" size="sm">
                전체 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
