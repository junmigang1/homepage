import { NextRequest, NextResponse } from 'next/server'
import { mockExchanges } from '@/lib/mockData'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    let filteredExchanges = [...mockExchanges]

    if (userId) {
      filteredExchanges = filteredExchanges.filter(
        exchange => exchange.requesterId === userId || exchange.ownerId === userId
      )
    }

    return NextResponse.json(filteredExchanges)
  } catch (error) {
    console.error('Error fetching exchanges:', error)
    return NextResponse.json({ error: 'Failed to fetch exchanges' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookId, requesterId, ownerId, method } = body

    const newExchange = {
      id: String(mockExchanges.length + 1),
      bookId,
      book: mockExchanges[0].book, // 임시로 첫 번째 책 사용
      requesterId,
      requester: mockExchanges[0].requester,
      ownerId,
      owner: mockExchanges[0].owner,
      method,
      status: 'requested' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockExchanges.push(newExchange)

    return NextResponse.json(newExchange)
  } catch (error) {
    console.error('Error creating exchange:', error)
    return NextResponse.json({ error: 'Failed to create exchange' }, { status: 500 })
  }
}
