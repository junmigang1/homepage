import { NextRequest, NextResponse } from 'next/server'
import { mockReviews } from '@/lib/mockData'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookId = searchParams.get('bookId')
    const limit = searchParams.get('limit')

    let filteredReviews = [...mockReviews]

    if (bookId) {
      filteredReviews = filteredReviews.filter(review => review.bookId === bookId)
    }

    if (limit) {
      filteredReviews = filteredReviews.slice(0, parseInt(limit))
    }

    return NextResponse.json(filteredReviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookId, userId, content, rating } = body

    const newReview = {
      id: String(mockReviews.length + 1),
      bookId,
      book: mockReviews[0].book, // 임시로 첫 번째 책 사용
      userId,
      user: mockReviews[0].user, // 임시로 첫 번째 사용자 사용
      content,
      rating,
      createdAt: new Date(),
    }

    mockReviews.push(newReview)

    return NextResponse.json(newReview)
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}
