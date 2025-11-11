import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'
import { getCurrentUserId } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { maxMembers = 4, hostId } = body

    // 세션에서 userId 가져오기 (우선순위)
    const sessionUserId = await getCurrentUserId()
    const finalHostId = sessionUserId || hostId

    if (!finalHostId) {
      return NextResponse.json(
        { error: 'hostId is required or user must be logged in' },
        { status: 400 }
      )
    }

    const redis = getRedisClient()

    // 방 ID 생성 (타임스탬프 + 랜덤 문자열)
    const roomId = `room_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    const room = {
      id: roomId,
      hostId: finalHostId,
      maxMembers: Number(maxMembers),
      currentMembers: 1,
      members: [finalHostId],
      status: 'open' as 'open' | 'closed',
      createdAt: new Date().toISOString(),
    }

    // Redis에 저장 (키: room:{roomId})
    await redis.set(`room:${roomId}`, JSON.stringify(room))

    return NextResponse.json(room)
  } catch (error) {
    console.error('Error creating room:', error)
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    )
  }
}
