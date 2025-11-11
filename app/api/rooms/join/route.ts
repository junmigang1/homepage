import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'
import { getCurrentUserId } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { roomId, userId } = body

    // 세션에서 userId 가져오기 (우선순위)
    const sessionUserId = await getCurrentUserId()
    const finalUserId = sessionUserId || userId

    if (!roomId || !finalUserId) {
      return NextResponse.json(
        { error: 'roomId and userId are required or user must be logged in' },
        { status: 400 }
      )
    }

    const redis = getRedisClient()

    // 방 정보 가져오기
    const roomData = await redis.get(`room:${roomId}`)

    if (!roomData) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 })
    }

    const room = JSON.parse(roomData)

    // 방이 이미 닫혀있는지 확인
    if (room.status === 'closed') {
      return NextResponse.json({ error: 'Room is closed' }, { status: 400 })
    }

    // 이미 참여한 사용자인지 확인
    if (room.members.includes(finalUserId)) {
      return NextResponse.json(
        { error: 'User already in room' },
        { status: 400 }
      )
    }

    // 최대 인원 확인
    if (room.currentMembers >= room.maxMembers) {
      // 최대 인원 도달 시 방 닫기
      room.status = 'closed'
      await redis.set(`room:${roomId}`, JSON.stringify(room))
      return NextResponse.json(
        { error: 'Room is full and has been closed' },
        { status: 400 }
      )
    }

    // 사용자 추가
    room.members.push(finalUserId)
    room.currentMembers = room.members.length

    // 최대 인원 도달 시 방 닫기
    if (room.currentMembers >= room.maxMembers) {
      room.status = 'closed'
    }

    // Redis에 업데이트
    await redis.set(`room:${roomId}`, JSON.stringify(room))

    return NextResponse.json(room)
  } catch (error) {
    console.error('Error joining room:', error)
    return NextResponse.json({ error: 'Failed to join room' }, { status: 500 })
  }
}
