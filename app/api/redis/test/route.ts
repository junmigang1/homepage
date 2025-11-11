import { NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'

export async function GET() {
  try {
    const redis = getRedisClient()
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:3001'

    // 연결 상태 확인
    const status = redis.status

    // PING 테스트
    const pingResult = await redis.ping()

    // 간단한 SET/GET 테스트
    const testKey = 'test:connection'
    const testValue = `test_${Date.now()}`

    await redis.set(testKey, testValue, 'EX', 10) // 10초 후 만료
    const retrievedValue = await redis.get(testKey)

    // 기존 키 목록 확인 (샘플)
    const sampleKeys = await redis.keys('*')
    const keyCount = sampleKeys.length

    // Redis 정보
    const info = await redis.info('server')
    const redisVersion =
      info
        .split('\n')
        .find(line => line.startsWith('redis_version:'))
        ?.split(':')[1]
        ?.trim() || 'unknown'

    return NextResponse.json({
      success: true,
      connection: {
        status: status,
        url: redisUrl,
        ping: pingResult,
        version: redisVersion,
      },
      test: {
        set: testValue,
        get: retrievedValue,
        match: retrievedValue === testValue,
      },
      stats: {
        totalKeys: keyCount,
        sampleKeys: sampleKeys.slice(0, 10), // 처음 10개만
      },
      message: 'Redis 연결이 정상적으로 작동합니다! ✅',
    })
  } catch (error: unknown) {
    console.error('Redis 연결 오류:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Redis 연결 실패'
    const errorCode = (error as { code?: string })?.code || 'UNKNOWN'
    const errorStack =
      process.env.NODE_ENV === 'development' && error instanceof Error
        ? error.stack
        : undefined

    return NextResponse.json(
      {
        success: false,
        error: {
          message: errorMessage,
          code: errorCode,
          stack: errorStack,
        },
        connection: {
          url: process.env.REDIS_URL || 'redis://localhost:3001',
          status: 'disconnected',
        },
        message: 'Redis 연결에 실패했습니다. ❌',
        troubleshooting: {
          checkRedisUrl: 'REDIS_URL 환경 변수를 확인하세요',
          checkRedisServer: 'Redis 서버가 실행 중인지 확인하세요',
          defaultPort: '기본 포트는 3001입니다 (redis://localhost:3001)',
        },
      },
      { status: 500 }
    )
  }
}
