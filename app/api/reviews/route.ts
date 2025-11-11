// app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'
import { getCurrentUserId } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookId = searchParams.get('bookId')
    const limit = searchParams.get('limit')

    const redis = getRedisClient()
    const keys = await redis.keys('review:*')
    let reviews = await Promise.all(
      keys.map(async key => JSON.parse((await redis.get(key)) || '{}'))
    )

    // 필터링
    if (bookId) {
      reviews = reviews.filter(review => review.bookId === bookId)
    }

    if (limit) {
      reviews = reviews.slice(0, parseInt(limit))
    }

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { bookId, content, rating } = body

    const newReview = {
      id: String(Date.now()),
      bookId,
      userId,
      book: null, // TODO: 나중에 책 정보 불러오기
      user: null, // TODO: 나중에 사용자 프로필 연동
      content,
      rating,
      createdAt: new Date(),
    }

    const redis = getRedisClient()
    await redis.set(`review:${newReview.id}`, JSON.stringify(newReview))

    return NextResponse.json(newReview)
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
