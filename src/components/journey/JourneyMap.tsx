'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation, Clock } from 'lucide-react'

// 목업 데이터 - 실제로는 GeoJSON 데이터를 사용
const journeyNodes = [
  {
    id: '1',
    city: '서울 강남구',
    lat: 37.5665,
    lng: 126.9780,
    reader: '독서왕김철수',
    date: '2024-01-15',
    emotion: '감동',
    note: '정말 인상깊은 책이었어요. 인류의 역사를 새롭게 바라보게 되었습니다.',
    isCurrent: true,
  },
  {
    id: '2',
    city: '서울 서초구',
    lat: 37.4947,
    lng: 127.0276,
    reader: '공부러버',
    date: '2024-01-10',
    emotion: '영감',
    note: '공부에 대한 새로운 관점을 얻었습니다.',
    isCurrent: false,
  },
  {
    id: '3',
    city: '서울 마포구',
    lat: 37.5663,
    lng: 126.9019,
    reader: '책벌레영희',
    date: '2024-01-05',
    emotion: '놀라움',
    note: '놀라운 통찰력이 담긴 책이네요.',
    isCurrent: false,
  },
  {
    id: '4',
    city: '서울 송파구',
    lat: 37.5146,
    lng: 127.1050,
    reader: '문학청년',
    date: '2024-01-01',
    emotion: '호기심',
    note: '여정의 시작! 정말 기대됩니다.',
    isCurrent: false,
  },
]

const emotionColors = {
  감동: 'bg-red-100 text-red-800',
  영감: 'bg-blue-100 text-blue-800',
  놀라움: 'bg-yellow-100 text-yellow-800',
  호기심: 'bg-green-100 text-green-800',
  기쁨: 'bg-pink-100 text-pink-800',
  슬픔: 'bg-gray-100 text-gray-800',
}

export function JourneyMap({ bookId }: { bookId: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          책의 여정 지도
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 간단한 지도 시각화 (실제로는 지도 라이브러리 사용) */}
        <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg h-96 overflow-hidden">
          {/* 배경 패턴 */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-8 w-2 h-2 bg-primary rounded-full"></div>
            <div className="absolute top-12 right-16 w-2 h-2 bg-accent rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-2 h-2 bg-secondary rounded-full"></div>
            <div className="absolute bottom-8 right-8 w-2 h-2 bg-primary rounded-full"></div>
          </div>

          {/* 여정 노드들 */}
          {journeyNodes.map((node, index) => (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + (index * 20)}%`,
                top: `${30 + (index % 2) * 40}%`,
              }}
            >
              <div className={`w-4 h-4 rounded-full border-2 ${
                node.isCurrent 
                  ? 'bg-primary border-primary' 
                  : 'bg-white border-muted-foreground'
              } shadow-lg`}>
                {node.isCurrent && (
                  <div className="w-full h-full rounded-full bg-white animate-ping"></div>
                )}
              </div>
              
              {/* 노드 라벨 */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <div className="bg-white rounded-lg px-2 py-1 shadow-md text-xs">
                  <div className="font-medium">{node.reader}</div>
                  <div className="text-muted-foreground">{node.city}</div>
                </div>
              </div>
            </div>
          ))}

          {/* 연결선 (간단한 SVG) */}
          <svg className="absolute inset-0 w-full h-full">
            {journeyNodes.slice(0, -1).map((_, index) => (
              <line
                key={index}
                x1={`${20 + (index * 20)}%`}
                y1={`${30 + (index % 2) * 40}%`}
                x2={`${20 + ((index + 1) * 20)}%`}
                y2={`${30 + ((index + 1) % 2) * 40}%`}
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

        {/* 여정 노드 상세 정보 */}
        <div className="mt-6 space-y-4">
          <h4 className="font-semibold">여정 기록</h4>
          <div className="space-y-3">
            {journeyNodes.map((node) => (
              <div
                key={node.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  node.isCurrent ? 'border-primary bg-primary/5' : 'border-muted'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${
                  node.isCurrent ? 'bg-primary' : 'bg-muted-foreground'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{node.reader}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${emotionColors[node.emotion as keyof typeof emotionColors]}`}
                    >
                      {node.emotion}
                    </Badge>
                    {node.isCurrent && (
                      <Badge variant="default" className="text-xs">
                        현재
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{node.city}</span>
                    <Clock className="h-3 w-3 ml-2" />
                    <span>{node.date}</span>
                  </div>
                  <p className="text-sm mt-1 text-muted-foreground">
                    {node.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
