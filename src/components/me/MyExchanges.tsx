'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Mail,
  Truck,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  User,
} from 'lucide-react'
import Image from 'next/image'
import { formatRelativeTime } from '@/lib/utils'

// 목업 데이터
const exchanges = {
  inProgress: [
    {
      id: '1',
      book: {
        title: '사피엔스',
        author: '유발 하라리',
        coverUrl:
          'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=60&h=90&fit=crop',
      },
      type: 'requested',
      status: 'accepted',
      progress: 60,
      otherParty: '독서왕김철수',
      method: '택배',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-16T14:20:00Z',
      currentStep: 'shipped',
      trackingNumber: '1234567890',
    },
    {
      id: '2',
      book: {
        title: '1984',
        author: '조지 오웰',
        coverUrl:
          'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=90&fit=crop',
      },
      type: 'received',
      status: 'requested',
      progress: 20,
      otherParty: '책벌레영희',
      method: '보관함',
      createdAt: '2024-01-17T09:15:00Z',
      updatedAt: '2024-01-17T09:15:00Z',
      currentStep: 'requested',
    },
  ],
  completed: [
    {
      id: '3',
      book: {
        title: '미드나잇 라이브러리',
        author: '매트 헤이그',
        coverUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=90&fit=crop',
      },
      type: 'requested',
      status: 'completed',
      progress: 100,
      otherParty: '문학청년',
      method: '택배',
      createdAt: '2024-01-10T14:30:00Z',
      completedAt: '2024-01-14T16:45:00Z',
      rating: 5,
    },
    {
      id: '4',
      book: {
        title: '완벽한 공부법',
        author: '이지성',
        coverUrl:
          'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=90&fit=crop',
      },
      type: 'received',
      status: 'completed',
      progress: 100,
      otherParty: '공부러버',
      method: '택배',
      createdAt: '2024-01-05T11:20:00Z',
      completedAt: '2024-01-09T15:30:00Z',
      rating: 4,
    },
  ],
}

const getStepIcon = (stepId: string, status: string) => {
  if (status === 'completed') {
    return <CheckCircle className="h-4 w-4 text-green-500" />
  }
  if (status === 'current') {
    return <Clock className="h-4 w-4 text-primary" />
  }

  switch (stepId) {
    case 'requested':
      return <Mail className="h-4 w-4 text-muted-foreground" />
    case 'accepted':
      return <CheckCircle className="h-4 w-4 text-muted-foreground" />
    case 'shipped':
      return <Truck className="h-4 w-4 text-muted-foreground" />
    case 'received':
      return <Package className="h-4 w-4 text-muted-foreground" />
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-muted-foreground" />
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'requested':
      return <Badge variant="secondary">요청됨</Badge>
    case 'accepted':
      return <Badge variant="default">수락됨</Badge>
    case 'shipped':
      return <Badge variant="default">배송중</Badge>
    case 'received':
      return <Badge variant="success">수령됨</Badge>
    case 'completed':
      return <Badge variant="success">완료</Badge>
    default:
      return <Badge variant="outline">알 수 없음</Badge>
  }
}

export function MyExchanges() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          교환 기록
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="in-progress" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="in-progress">진행 중</TabsTrigger>
            <TabsTrigger value="completed">완료</TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress" className="mt-6">
            <div className="space-y-4">
              {exchanges.inProgress.map(exchange => (
                <div
                  key={exchange.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <Image
                      src={exchange.book.coverUrl}
                      alt={exchange.book.title}
                      width={60}
                      height={90}
                      className="rounded-lg shadow-sm"
                    />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">
                            {exchange.book.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {exchange.book.author}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(exchange.status)}
                          <Badge variant="outline">{exchange.method}</Badge>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {exchange.type === 'requested' ? (
                          <>
                            <User className="inline h-4 w-4 mr-1" />
                            요청한 사람: {exchange.otherParty}
                          </>
                        ) : (
                          <>
                            <User className="inline h-4 w-4 mr-1" />
                            소유자: {exchange.otherParty}
                          </>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>진행률</span>
                          <span className="font-medium">
                            {exchange.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${exchange.progress}%` }}
                          />
                        </div>
                      </div>

                      {exchange.trackingNumber && (
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">운송장 번호</p>
                              <p className="text-sm text-muted-foreground">
                                {exchange.trackingNumber}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              배송 조회
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button size="sm">상세 보기</Button>
                        {exchange.status === 'requested' &&
                          exchange.type === 'received' && (
                            <>
                              <Button size="sm">수락</Button>
                              <Button variant="outline" size="sm">
                                거절
                              </Button>
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {exchanges.completed.map(exchange => (
                <div
                  key={exchange.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <Image
                      src={exchange.book.coverUrl}
                      alt={exchange.book.title}
                      width={60}
                      height={90}
                      className="rounded-lg shadow-sm"
                    />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">
                            {exchange.book.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {exchange.book.author}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(exchange.status)}
                          {exchange.rating && (
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              <span className="text-sm font-medium">
                                {exchange.rating}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {exchange.type === 'requested' ? '요청한' : '받은'} 교환
                      </div>

                      <div className="text-sm text-muted-foreground">
                        완료일: {formatRelativeTime(exchange.completedAt!)}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          리뷰 작성
                        </Button>
                        <Button size="sm" variant="outline">
                          상세 보기
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
