'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { mockBooks } from '@/lib/mockData'

export default function JourneyListPage() {
  const router = useRouter()

  useEffect(() => {
    // 첫 번째 책의 여정 페이지로 리다이렉트
    if (mockBooks.length > 0) {
      router.push(`/journey/${mockBooks[0].id}`)
    }
  }, [router])

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-muted-foreground">여정 페이지로 이동 중...</p>
      </div>
    </div>
  )
}

