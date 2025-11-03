'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Search, Filter, Heart, MessageCircle, Share2, Star, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useToast } from 'react-hot-toast'

// 목업 데이터
const books = [
  {
    id: '1',
    title: '사피엔스',
    author: '유발 하라리',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop',
    genre: '인문학',
    condition: '양호',
    owner: '독서왕김철수',
    ownerSchool: '서울대학교',
    location: '서울 강남구',
    rating: 4.8,
    reviewCount: 23,
    isExchangeable: true,
    exchangeMethod: '택배',
    description: '인류의 역사를 새로운 관점에서 바라본 명작입니다.',
  },
  {
    id: '2',
    title: '완벽한 공부법',
    author: '이지성',
    coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
    genre: '자기계발',
    condition: '새책',
    owner: '공부러버',
    ownerSchool: '연세대학교',
    location: '서울 서초구',
    rating: 4.6,
    reviewCount: 15,
    isExchangeable: true,
    exchangeMethod: '보관함',
    description: '효율적인 공부 방법을 제시하는 실용적인 책입니다.',
  },
  {
    id: '3',
    title: '미드나잇 라이브러리',
    author: '매트 헤이그',
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop',
    genre: '소설',
    condition: '양호',
    owner: '책벌레영희',
    ownerSchool: '고려대학교',
    location: '서울 마포구',
    rating: 4.9,
    reviewCount: 31,
    isExchangeable: false,
    exchangeMethod: '택배',
    description: '인생의 의미를 되돌아보게 하는 감동적인 소설입니다.',
  },
  {
    id: '4',
    title: '부의 추월차선',
    author: '엠제이 드마코',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop',
    genre: '경제',
    condition: '양호',
    owner: '투자왕',
    ownerSchool: '성균관대학교',
    location: '서울 송파구',
    rating: 4.5,
    reviewCount: 18,
    isExchangeable: true,
    exchangeMethod: '택배',
    description: '부를 창출하는 새로운 사고방식을 제시합니다.',
  },
]

const genres = ['전체', '소설', '에세이', '자기계발', '인문학', '경제', '과학', '역사', '철학', '예술', '기타']
const conditions = ['전체', '새책', '양호', '보통', '나쁨']
const schools = ['전체', '서울대학교', '연세대학교', '고려대학교', '성균관대학교', '한양대학교']

export function BookBrowse() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('전체')
  const [selectedCondition, setSelectedCondition] = useState('전체')
  const [selectedSchool, setSelectedSchool] = useState('전체')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [isExchangeDialogOpen, setIsExchangeDialogOpen] = useState(false)
  const toast = useToast()

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === '전체' || book.genre === selectedGenre
    const matchesCondition = selectedCondition === '전체' || book.condition === selectedCondition
    const matchesSchool = selectedSchool === '전체' || book.ownerSchool === selectedSchool

    return matchesSearch && matchesGenre && matchesCondition && matchesSchool
  })

  const handleExchangeRequest = (book: any) => {
    setSelectedBook(book)
    setIsExchangeDialogOpen(true)
  }

  const confirmExchange = () => {
    toast.success(`${selectedBook.title} 교환 요청이 전송되었습니다!`)
    setIsExchangeDialogOpen(false)
    setSelectedBook(null)
  }

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* 검색창 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="책 제목이나 저자명으로 검색하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 필터 버튼 */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                필터
              </Button>
              <span className="text-sm text-muted-foreground">
                {filteredBooks.length}개의 책을 찾았습니다
              </span>
            </div>

            {/* 필터 옵션들 */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <label className="text-sm font-medium">장르</label>
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map(genre => (
                        <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">상태</label>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map(condition => (
                        <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">학교</label>
                  <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {schools.map(school => (
                        <SelectItem key={school} value={school}>{school}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 취향 유사 추천 섹션 */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">취향 유사 추천</h3>
          <div className="text-sm text-muted-foreground">
            당신의 독서 취향을 분석하여 추천하는 책들입니다.
          </div>
        </CardContent>
      </Card>

      {/* 책 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card 
            key={book.id} 
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* 책 표지 */}
                <div className="relative flex-shrink-0">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    width={80}
                    height={120}
                    className="rounded-lg shadow-sm"
                  />
                  {!book.isExchangeable && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-2 -right-2 text-xs"
                    >
                      교환중
                    </Badge>
                  )}
                </div>

                {/* 책 정보 */}
                <div className="flex-1 min-w-0">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {book.author}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {book.genre}
                      </Badge>
                      <Badge 
                        variant={book.condition === '새책' ? 'success' : 'secondary'}
                        className="text-xs"
                      >
                        {book.condition}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{book.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({book.reviewCount}개 리뷰)
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>소유자: {book.owner}</p>
                      <p>{book.ownerSchool}</p>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{book.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <div className="flex gap-2 w-full">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  disabled={!book.isExchangeable}
                  onClick={() => handleExchangeRequest(book)}
                >
                  {book.isExchangeable ? '교환 요청' : '교환 불가'}
                </Button>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 교환 요청 다이얼로그 */}
      <Dialog open={isExchangeDialogOpen} onOpenChange={setIsExchangeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>교환 요청</DialogTitle>
            <DialogDescription>
              {selectedBook?.title} 교환을 요청하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          {selectedBook && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <Image
                  src={selectedBook.coverUrl}
                  alt={selectedBook.title}
                  width={60}
                  height={90}
                  className="rounded-lg"
                />
                <div className="space-y-2">
                  <h4 className="font-semibold">{selectedBook.title}</h4>
                  <p className="text-sm text-muted-foreground">{selectedBook.author}</p>
                  <p className="text-sm">소유자: {selectedBook.owner}</p>
                  <p className="text-sm">교환방식: {selectedBook.exchangeMethod}</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">교환 요청 메시지</label>
                <textarea
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                  placeholder="교환 요청 이유나 메시지를 남겨주세요..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExchangeDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={confirmExchange}>
              교환 요청하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
