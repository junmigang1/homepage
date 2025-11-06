'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Search, Filter, Heart, MessageCircle, Share2, Star, MapPin } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'

const genres = ['전체', '소설', '에세이', '자기계발', '인문학', '경제', '과학', '역사', '철학', '예술', '기타']
const conditions = ['전체', '새책', '양호', '보통', '나쁨']
const schools = ['전체', '서울대학교', '연세대학교', '고려대학교', '성균관대학교', '한양대학교']

export function BookBrowse() {
  const [books, setBooks] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('전체')
  const [selectedCondition, setSelectedCondition] = useState('전체')
  const [selectedSchool, setSelectedSchool] = useState('전체')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [isExchangeDialogOpen, setIsExchangeDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // API에서 책 목록 가져오기
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books')
        if (response.ok) {
          const data = await response.json()
          // API 데이터를 UI에 맞게 변환
          const transformedBooks = data.map((book: any) => ({
            ...book,
            owner: book.owner?.name || '알 수 없음',
            ownerSchool: book.owner?.school || '알 수 없음',
            location: '서울 강남구', // 임시 데이터
            rating: book.reviews?.length > 0 
              ? book.reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / book.reviews.length 
              : 4.5,
            reviewCount: book.reviews?.length || 0,
            exchangeMethod: '택배', // 임시 데이터
          }))
          setBooks(transformedBooks)
        } else {
          toast.error('책 목록을 불러오는데 실패했습니다.')
        }
      } catch (error) {
        console.error('Error fetching books:', error)
        toast.error('책 목록을 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])

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

  const confirmExchange = async () => {
    if (!selectedBook) return

    try {
      const response = await fetch('/api/exchanges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: selectedBook.id,
          requesterId: '1', // 임시로 첫 번째 사용자 ID 사용
          ownerId: selectedBook.ownerId || '1',
          method: selectedBook.exchangeMethod || '택배',
        }),
      })

      if (!response.ok) {
        throw new Error('교환 요청에 실패했습니다.')
      }

      toast.success(`${selectedBook.title} 교환 요청이 전송되었습니다!`)
      setIsExchangeDialogOpen(false)
      setSelectedBook(null)
    } catch (error) {
      console.error('Error creating exchange:', error)
      toast.error('교환 요청에 실패했습니다. 다시 시도해주세요.')
    }
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
      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">책 목록을 불러오는 중...</p>
        </div>
      ) : (
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
      )}

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
