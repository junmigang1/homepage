import { NextRequest, NextResponse } from 'next/server'
import { mockBooks, mockJourneyNodes, mockUsers } from '@/lib/mockData'

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const journeyNodes = mockJourneyNodes.filter(n => n.bookId === params.bookId)
    const book = mockBooks.find(b => b.id === params.bookId)

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    function calculateTotalDistance(nodes: any[]): number {
      return nodes.length * 50 // 임시값
    }

    return NextResponse.json({
      book: {
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        owner: book.owner,
      },
      journeyNodes,
      totalReaders: journeyNodes.length,
      totalDistance: calculateTotalDistance(journeyNodes),
    })
  } catch (error) {
    console.error('Error fetching journey:', error)
    return NextResponse.json({ error: 'Failed to fetch journey' }, { status: 500 })
  }
}
