import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'
import { getCurrentUserId } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryUserId = searchParams.get('userId')

    const redis = getRedisClient()
    const keys = await redis.keys('exchange:*')
    const exchanges = await Promise.all(
      keys.map(async key => JSON.parse((await redis.get(key)) || '{}'))
    )

    let filteredExchanges = [...exchanges]

    if (queryUserId) {
      filteredExchanges = filteredExchanges.filter(
        exchange =>
          exchange.requesterId === queryUserId ||
          exchange.ownerId === queryUserId
      )
    }

    return NextResponse.json(filteredExchanges)
  } catch (error) {
    console.error('Error fetching exchanges:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exchanges' },
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
    const { bookId, ownerId, method } = body

    const newExchange = {
      id: String(Date.now()),
      bookId,
      book: null,
      requester: null,
      owner: null,
      requesterId: userId, // 로그인한 사용자로 설정
      ownerId, // 요청 본문에서 받음
      method,
      status: 'requested' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const redis = getRedisClient()
    await redis.set(`exchange:${newExchange.id}`, JSON.stringify(newExchange))

    return NextResponse.json(newExchange)
  } catch (error) {
    console.error('Error creating exchange:', error)
    return NextResponse.json(
      { error: 'Failed to create exchange' },
      { status: 500 }
    )
  }
}
