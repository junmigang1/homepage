'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, BookOpen, Navigation } from 'lucide-react'

// 목업 데이터
const myJourneys = [
  {
    id: '1',
    book: {
      title: '사피엔스',
      author: '유발 하라리',
      coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=60&h=90&fit=crop',
    },
    type: 'sent', // 'sent' | 'received'
    status: 'completed',
    location: '서울 강남구',
    date: '2024-01-15',
    recipient: '독서왕김철수',
  },
  {
    id: '2',
    book: {
      title: '1984',
      author: '조지 오웰',
      coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=60&h=90&fit=crop',
    },
    type: 'received',
    status: 'completed',
    location: '서울 마포구',
    date: '2024-01-10',
    sender: '책벌레영희',
  },
  {
    id: '3',
    book: {
      title: '아몬드',
      author: '손원평',
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=60&h=90&fit=crop',
    },
    type: 'sent',
    status: 'in_progress',
    location: '서울 서초구',
    date: '2024-01-20',
    recipient: '문학청년',
  },
]

const journeyStats = {
  totalBooks: 15,
  sentBooks: 8,
  receivedBooks: 7,
  totalDistance: 245.7,
  cities: ['서울', '부산', '대구', '인천'],
}

export function MyJourneyMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          나의 여정 지도
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 간단한 지도 시각화 */}
        <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg h-64 overflow-hidden mb-6">
          {/* 배경 패턴 */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-8 left-12 w-3 h-3 bg-primary rounded-full"></div>
            <div className="absolute top-16 right-20 w-3 h-3 bg-accent rounded-full"></div>
            <div className="absolute bottom-16 left-24 w-3 h-3 bg-secondary rounded-full"></div>
            <div className="absolute bottom-8 right-12 w-3 h-3 bg-primary rounded-full"></div>
          </div>

          {/* 여정 노드들 */}
          {myJourneys.map((journey, index) => (
            <div
              key={journey.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + (index * 25)}%`,
                top: `${30 + (index % 2) * 30}%`,
              }}
            >
              <div className={`w-6 h-6 rounded-full border-2 ${
                journey.status === 'completed' 
                  ? 'bg-green-500 border-green-500' 
                  : 'bg-yellow-500 border-yellow-500'
              } shadow-lg`}>
                {journey.status === 'in_progress' && (
                  <div className="w-full h-full rounded-full bg-white animate-ping"></div>
                )}
              </div>
              
              {/* 노드 라벨 */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <div className="bg-white rounded-lg px-2 py-1 shadow-md text-xs">
                  <div className="font-medium">{journey.location}</div>
                  <div className="text-muted-foreground">{journey.date}</div>
                </div>
              </div>
            </div>
          ))}

          {/* 연결선 */}
          <svg className="absolute inset-0 w-full h-full">
            {myJourneys.slice(0, -1).map((_, index) => (
              <line
                key={index}
                x1={`${20 + (index * 25)}%`}
                y1={`${30 + (index % 2) * 30}%`}
                x2={`${20 + ((index + 1) * 25)}%`}
                y2={`${30 + ((index + 1) % 2) * 30}%`}
                stroke="#4A7043"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            ))}
          </svg>

          {/* 현재 위치 표시 */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-primary" />
              <div>
                <div className="text-sm font-medium">현재 위치</div>
                <div className="text-xs text-muted-foreground">서울 강남구</div>
              </div>
            </div>
          </div>
        </div>

        {/* 여정 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{journeyStats.totalBooks}</div>
            <div className="text-sm text-muted-foreground">총 교환</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{journeyStats.sentBooks}</div>
            <div className="text-sm text-muted-foreground">보낸 책</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{journeyStats.receivedBooks}</div>
            <div className="text-sm text-muted-foreground">받은 책</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{journeyStats.totalDistance}km</div>
            <div className="text-sm text-muted-foreground">총 거리</div>
          </div>
        </div>

        {/* 최근 여정 */}
        <div className="space-y-3">
          <h4 className="font-semibold">최근 여정</h4>
          {myJourneys.map((journey) => (
            <div
              key={journey.id}
              className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors"
            >
              <div className="relative">
                <img
                  src={journey.book.coverUrl}
                  alt={journey.book.title}
                  className="w-12 h-16 rounded-lg shadow-sm object-cover"
                />
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
                  journey.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-medium text-sm">{journey.book.title}</h5>
                  <Badge 
                    variant={journey.status === 'completed' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {journey.status === 'completed' ? '완료' : '진행중'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{journey.book.author}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" />
                  <span>{journey.location}</span>
                  <span>•</span>
                  <span>{journey.date}</span>
                </div>
                {journey.type === 'sent' && journey.recipient && (
                  <p className="text-xs text-muted-foreground mt-1">
                    받은 사람: {journey.recipient}
                  </p>
                )}
                {journey.type === 'received' && journey.sender && (
                  <p className="text-xs text-muted-foreground mt-1">
                    보낸 사람: {journey.sender}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 방문한 도시 */}
        <div className="mt-6">
          <h4 className="font-semibold mb-3">방문한 도시</h4>
          <div className="flex flex-wrap gap-2">
            {journeyStats.cities.map((city) => (
              <Badge key={city} variant="outline" className="text-sm">
                <MapPin className="h-3 w-3 mr-1" />
                {city}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
