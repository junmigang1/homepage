// app/api/users/[userId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const redis = getRedisClient()
    const userRaw = await redis.get(`user:${params.userId}`)

    if (!userRaw) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = JSON.parse(userRaw)

    // 선택: 이메일 일부 마스킹 (보안 고려 시)
    // if (user.email) {
    //   user.email = user.email.replace(/(.{3}).+(@.+)/, '$1***$2');
    // }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}
