import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'

export async function GET(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    const redis = getRedisClient()
    const roomData = await redis.get(`room:${params.roomId}`)

    if (!roomData) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 })
    }

    const room = JSON.parse(roomData)
    return NextResponse.json(room)
  } catch (error) {
    console.error('Error fetching room:', error)
    return NextResponse.json({ error: 'Failed to fetch room' }, { status: 500 })
  }
}
