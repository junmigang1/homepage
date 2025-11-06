'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, X, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const conditions = ['새책', '양호', '보통', '나쁨']
const exchangeMethods = ['택배', '보관함']
const genres = ['소설', '에세이', '자기계발', '인문학', '경제', '과학', '역사', '철학', '예술', '기타']

export function BookRegisterForm() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    condition: '',
    exchangeMethod: '',
    genre: '',
    message: '',
    coverFile: null as File | null,
    coverPreview: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        coverFile: file,
        coverPreview: URL.createObjectURL(file)
      }))
    }
  }

  const removeCover = () => {
    setFormData(prev => ({
      ...prev,
      coverFile: null,
      coverPreview: ''
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 폼 검증
    if (!formData.title || !formData.author || !formData.condition || !formData.exchangeMethod) {
      toast.error('필수 항목을 모두 입력해주세요.')
      setIsSubmitting(false)
      return
    }

    try {
      // 이미지 URL 처리 (파일이 있으면 임시로 preview URL 사용, 없으면 기본 이미지)
      let coverUrl = formData.coverPreview || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200'
      
      // API 호출
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          author: formData.author,
          condition: formData.condition,
          genre: formData.genre || undefined,
          exchangeMethod: formData.exchangeMethod,
          message: formData.message || undefined,
          coverUrl: coverUrl,
          ownerId: '1', // 임시로 첫 번째 사용자 ID 사용
        }),
      })

      if (!response.ok) {
        throw new Error('책 등록에 실패했습니다.')
      }

      const newBook = await response.json()
      
      toast.success('책이 여정에 올라탔어요! 📖', {
        duration: 4000,
      })
      
      // 성공 후 여정 페이지로 이동
      router.push(`/journey/${newBook.id}`)
      
      // 폼 초기화
      setFormData({
        title: '',
        author: '',
        condition: '',
        exchangeMethod: '',
        genre: '',
        message: '',
        coverFile: null,
        coverPreview: '',
      })
    } catch (error) {
      console.error('Error creating book:', error)
      toast.error('책 등록에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center">새로운 책 등록하기</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 책 표지 업로드 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">책 표지 *</label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              {formData.coverPreview ? (
                <div className="relative inline-block">
                  <img
                    src={formData.coverPreview}
                    alt="책 표지 미리보기"
                    className="w-32 h-48 object-cover rounded-lg shadow-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={removeCover}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">
                    책 표지를 업로드해주세요
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG 파일만 가능합니다
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="cover-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('cover-upload')?.click()}
                    className="mt-4"
                  >
                    파일 선택
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* 책 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">제목 *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="책 제목을 입력하세요"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">저자 *</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="저자명을 입력하세요"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">장르</label>
              <select
                value={formData.genre}
                onChange={(e) => handleInputChange('genre', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">장르를 선택하세요</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">책 상태 *</label>
              <div className="flex flex-wrap gap-2">
                {conditions.map(condition => (
                  <Badge
                    key={condition}
                    variant={formData.condition === condition ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => handleInputChange('condition', condition)}
                  >
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* 교환 방식 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">교환 방식 *</label>
            <div className="flex gap-4">
              {exchangeMethods.map(method => (
                <label key={method} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="exchangeMethod"
                    value={method}
                    checked={formData.exchangeMethod === method}
                    onChange={(e) => handleInputChange('exchangeMethod', e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 다음 독자에게 남길 메시지 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">다음 독자에게 남길 메시지</label>
            <textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              rows={4}
              placeholder="이 책에 대한 감상이나 다음 독자에게 전하고 싶은 말을 남겨주세요..."
            />
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="px-12"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  등록 중...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  책 등록하기
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
