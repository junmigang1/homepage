'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookRegisterForm } from '@/components/exchange/BookRegisterForm'
import { BookBrowse } from '@/components/exchange/BookBrowse'
import { ExchangeProgress } from '@/components/exchange/ExchangeProgress'

export default function ExchangePage() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState('register')

  useEffect(() => {
    if (
      tabParam === 'register' ||
      tabParam === 'browse' ||
      tabParam === 'progress'
    ) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">교환존</h1>
          <p className="text-muted-foreground">
            책을 등록하고, 찾고, 교환해보세요
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="register">책 등록</TabsTrigger>
            <TabsTrigger value="browse">검색 & 추천</TabsTrigger>
            <TabsTrigger value="progress">진행 현황</TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="mt-6">
            <BookRegisterForm />
          </TabsContent>

          <TabsContent value="browse" className="mt-6">
            <BookBrowse />
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <ExchangeProgress />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
