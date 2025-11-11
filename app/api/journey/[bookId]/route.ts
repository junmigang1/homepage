import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const bookId = params.bookId

    const redis = getRedisClient()

    // 책 정보 가져오기
    const bookRaw = await redis.get(`book:${bookId}`)
    if (!bookRaw) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }
    const book = JSON.parse(bookRaw)

    // 여정 노드 전부 조회 후 해당 bookId만 필터링
    const keys = await redis.keys('journeyNode:*')
    const nodes = await Promise.all(
      keys.map(async key => JSON.parse((await redis.get(key)) || '{}'))
    )
    const journeyNodes = nodes.filter(n => n.bookId === bookId)

    const calculateTotalDistance = (
      nodes: Array<{ lat?: number; lng?: number }>
    ): number => {
      return nodes.length * 50 // 임시 거리 계산
    }

    return NextResponse.json({
      book: {
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        owner: book.owner, // book 데이터 안에 owner가 있어야 함
      },
      journeyNodes,
      totalReaders: journeyNodes.length,
      totalDistance: calculateTotalDistance(journeyNodes),
    })
  } catch (error) {
    console.error('Error fetching journey:', error)
    return NextResponse.json(
      { error: 'Failed to fetch journey' },
      { status: 500 }
    )
  }
}
