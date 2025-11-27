import Redis from 'ioredis'

let redis: Redis | null = null

export function getRedisClient(): Redis {
  if (redis) return redis

  const redisUrl = process.env.REDIS_URL || 'redis://localhost:3001'

  redis = new Redis(redisUrl, {
    retryStrategy: (times: number) => {
      if (times > 3) {
        console.error('Redis 연결 재시도 실패: 최대 재시도 횟수 초과')
        return null
      }
      const delay = Math.min(times * 200, 2000)
      console.warn(`Redis 연결 재시도 ${times}회 (${delay}ms 후)`)
      return delay
    },
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: false,
  })

  // 연결 이벤트 리스너
  redis.on('connect', () => {
    console.log('✅ Redis 연결 성공:', redisUrl)
  })

  redis.on('ready', () => {
    console.log('✅ Redis 준비 완료')
  })

  redis.on('error', error => {
    console.error('❌ Redis 연결 오류:', error.message)
  })

  redis.on('close', () => {
    console.warn('⚠️ Redis 연결 종료')
  })

  redis.on('reconnecting', () => {
    console.log('🔄 Redis 재연결 시도 중...')
  })

  return redis
}

export async function closeRedisConnection() {
  if (redis) {
    await redis.quit()
    redis = null
  }
}

export async function getBooksFromRedis() {
  const data = await getRedisClient().get('mocksBooks')
  return data ? JSON.parse(data) : null
}
