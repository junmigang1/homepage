'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Mail, Truck, Package, CheckCircle, Clock, MapPin, User } from 'lucide-react'
import Image from 'next/image'
import { formatRelativeTime } from '@/lib/utils'

// 목업 데이터
const exchanges = [
  {
    id: '1',
    book: {
      title: '사피엔스',
      author: '유발 하라리',
      coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop',
    },
    type: 'requested', // 'requested' | 'received'
    status: 'accepted',
    progress: 60,
    requester: '독서왕김철수',
    owner: '공부러버',
    method: '택배',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
    currentStep: 'shipped',
    steps: [
      { id: 'requested', label: '요청', status: 'completed', date: '2024-01-15T10:30:00Z' },
      { id: 'accepted', label: '수락', status: 'completed', date: '2024-01-15T16:45:00Z' },
      { id: 'shipped', label: '배송', status: 'current', date: '2024-01-16T14:20:00Z' },
      { id: 'received', label: '수령', status: 'pending', date: null },
      { id: 'completed', label: '완료', status: 'pending', date: null },
    ],
    trackingNumber: '1234567890',
    estimatedDelivery: '2024-01-18',
  },
  {
    id: '2',
    book: {
      title: '완벽한 공부법',
      author: '이지성',
      coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=150&fit=crop',
    },
    type: 'received',
    status: 'requested',
    progress: 20,
    requester: '책벌레영희',
    owner: '나',
    method: '보관함',
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z',
    currentStep: 'requested',
    steps: [
      { id: 'requested', label: '요청', status: 'current', date: '2024-01-17T09:15:00Z' },
      { id: 'accepted', label: '수락', status: 'pending', date: null },
      { id: 'shipped', label: '배송', status: 'pending', date: null },
      { id: 'received', label: '수령', status: 'pending', date: null },
      { id: 'completed', label: '완료', status: 'pending', date: null },
    ],
    message: '이 책 정말 읽어보고 싶었어요! 교환해주시면 감사하겠습니다.',
  },
  {
    id: '3',
    book: {
      title: '미드나잇 라이브러리',
      author: '매트 헤이그',
      coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=150&fit=crop',
    },
    type: 'requested',
    status: 'completed',
    progress: 100,
    requester: '문학청년',
    owner: '나',
    method: '택배',
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    currentStep: 'completed',
    steps: [
      { id: 'requested', label: '요청', status: 'completed', date: '2024-01-10T14:30:00Z' },
      { id: 'accepted', label: '수락', status: 'completed', date: '2024-01-11T09:20:00Z' },
      { id: 'shipped', label: '배송', status: 'completed', date: '2024-01-12T11:15:00Z' },
      { id: 'received', label: '수령', status: 'completed', date: '2024-01-14T16:45:00Z' },
      { id: 'completed', label: '완료', status: 'completed', date: '2024-01-14T16:45:00Z' },
    ],
    completedAt: '2024-01-14T16:45:00Z',
  },
]

const getStepIcon = (stepId: string, status: string) => {
  if (status === 'completed') {
    return <CheckCircle className="h-5 w-5 text-green-500" />
  }
  if (status === 'current') {
    return <Clock className="h-5 w-5 text-primary" />
  }
  
  switch (stepId) {
    case 'requested':
      return <Mail className="h-5 w-5 text-muted-foreground" />
    case 'accepted':
      return <CheckCircle className="h-5 w-5 text-muted-foreground" />
    case 'shipped':
      return <Truck className="h-5 w-5 text-muted-foreground" />
    case 'received':
      return <Package className="h-5 w-5 text-muted-foreground" />
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-muted-foreground" />
    default:
      return <Clock className="h-5 w-5 text-muted-foreground" />
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

export function ExchangeProgress() {
  return (
    <div className="space-y-6">
      {/* 진행 중인 교환 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">진행 중인 교환</h3>
        {exchanges.filter(ex => ex.status !== 'completed').map((exchange) => (
          <Card key={exchange.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <Image
                    src={exchange.book.coverUrl}
                    alt={exchange.book.title}
                    width={60}
                    height={90}
                    className="rounded-lg shadow-sm"
                  />
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-semibold text-lg">{exchange.book.title}</h4>
                      <p className="text-sm text-muted-foreground">{exchange.book.author}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(exchange.status)}
                      <Badge variant="outline">{exchange.method}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {exchange.type === 'requested' ? (
                        <>
                          <User className="inline h-4 w-4 mr-1" />
                          요청자: {exchange.requester}
                        </>
                      ) : (
                        <>
                          <User className="inline h-4 w-4 mr-1" />
                          소유자: {exchange.owner}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>마지막 업데이트</p>
                  <p>{formatRelativeTime(exchange.updatedAt)}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* 진행률 */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>진행률</span>
                  <span className="font-medium">{exchange.progress}%</span>
                </div>
                <Progress value={exchange.progress} className="h-2" />
              </div>

              {/* 단계별 진행 상황 */}
              <div className="space-y-3">
                <h5 className="text-sm font-medium">진행 단계</h5>
                <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                  {exchange.steps.map((step, index) => (
                    <div key={step.id} className="flex items-center space-x-2 min-w-0">
                      <div className="flex items-center space-x-2">
                        {getStepIcon(step.id, step.status)}
                        <span className={`text-sm ${
                          step.status === 'completed' ? 'text-green-600 font-medium' :
                          step.status === 'current' ? 'text-primary font-medium' :
                          'text-muted-foreground'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                      {index < exchange.steps.length - 1 && (
                        <div className={`w-8 h-px ${
                          step.status === 'completed' ? 'bg-green-500' : 'bg-muted'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 추가 정보 */}
              {exchange.trackingNumber && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">운송장 번호</p>
                      <p className="text-sm text-muted-foreground">{exchange.trackingNumber}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      배송 조회
                    </Button>
                  </div>
                </div>
              )}

              {exchange.estimatedDelivery && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>예상 도착: {exchange.estimatedDelivery}</span>
                </div>
              )}

              {/* 액션 버튼 */}
              <div className="flex gap-2 pt-2">
                {exchange.status === 'requested' && exchange.type === 'received' && (
                  <>
                    <Button size="sm">수락</Button>
                    <Button variant="outline" size="sm">거절</Button>
                  </>
                )}
                {exchange.status === 'shipped' && (
                  <Button size="sm">수령 확인</Button>
                )}
                <Button variant="outline" size="sm">상세 보기</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 완료된 교환 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">완료된 교환</h3>
        {exchanges.filter(ex => ex.status === 'completed').map((exchange) => (
          <Card key={exchange.id} className="opacity-75">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Image
                  src={exchange.book.coverUrl}
                  alt={exchange.book.title}
                  width={50}
                  height={75}
                  className="rounded-lg shadow-sm"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{exchange.book.title}</h4>
                    <Badge variant="success">완료</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {exchange.type === 'requested' ? '요청한' : '받은'} 교환
                  </p>
                  <p className="text-xs text-muted-foreground">
                    완료일: {formatRelativeTime(exchange.completedAt!)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
