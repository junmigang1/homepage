import { NextRequest, NextResponse } from 'next/server'
import { mockBooks, mockJourneyNodes, mockReviews } from '@/lib/mockData'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const book = mockBooks.find(b => b.id === params.id)

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    const journeyNodes = mockJourneyNodes.filter(n => n.bookId === params.id)
    const reviews = mockReviews.filter(r => r.bookId === params.id)

    return NextResponse.json({
      ...book,
      journeyNodes,
      reviews,
    })
  } catch (error) {
    console.error('Error fetching book:', error)
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 })
  }
}
