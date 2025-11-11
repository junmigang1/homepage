// app/api/exchanges/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'
import { getCurrentUserId } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const exchangeId = params.id
    const body = await request.json()
    const { status } = body

    const redis = getRedisClient()
    const raw = await redis.get(`exchange:${exchangeId}`)
    if (!raw) {
      return NextResponse.json({ error: 'Exchange not found' }, { status: 404 })
    }

    const exchange = JSON.parse(raw)

    // 본인이 참가한 교환만 수정 가능
    if (exchange.ownerId !== userId && exchange.requesterId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 상태 업데이트
    exchange.status = status
    exchange.updatedAt = new Date()

    await redis.set(`exchange:${exchangeId}`, JSON.stringify(exchange))

    return NextResponse.json(exchange)
  } catch (error) {
    console.error('Error updating exchange:', error)
    return NextResponse.json(
      { error: 'Failed to update exchange' },
      { status: 500 }
    )
  }
}
