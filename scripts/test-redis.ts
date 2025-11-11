import Redis from 'ioredis'

const redisUrl = process.env.REDIS_URL || 'redis://localhost:3001'

console.log('🔍 Redis 연결 테스트 시작...')
console.log('📍 Redis URL:', redisUrl)
console.log('')

const redis = new Redis(redisUrl, {
  retryStrategy: (times: number) => {
    if (times > 3) {
      console.error('❌ Redis 연결 재시도 실패: 최대 재시도 횟수 초과')
      process.exit(1)
    }
    const delay = Math.min(times * 200, 2000)
    console.warn(`⚠️ Redis 연결 재시도 ${times}회 (${delay}ms 후)`)
    return delay
  },
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: false,
})

redis.on('connect', () => {
  console.log('✅ Redis 연결 성공!')
})

redis.on('ready', async () => {
  console.log('✅ Redis 준비 완료')
  console.log('')

  try {
    // PING 테스트
    const pingResult = await redis.ping()
    console.log('✅ PING 테스트:', pingResult)

    // SET/GET 테스트
    const testKey = 'test:connection'
    const testValue = `test_${Date.now()}`
    await redis.set(testKey, testValue, 'EX', 10)
    const retrievedValue = await redis.get(testKey)
    console.log('✅ SET/GET 테스트:', retrievedValue === testValue ? '성공' : '실패')

    // 키 목록 확인
    const keys = await redis.keys('*')
    console.log(`✅ 현재 저장된 키 개수: ${keys.length}`)
    if (keys.length > 0) {
      console.log('   샘플 키:', keys.slice(0, 5).join(', '))
    }

    // Redis 정보
    const info = await redis.info('server')
    const version = info.split('\n').find(line => line.startsWith('redis_version:'))?.split(':')[1]?.trim()
    console.log('✅ Redis 버전:', version || 'unknown')

    // 특정 키 패턴 확인
    const userKeys = await redis.keys('user:*')
    const roomKeys = await redis.keys('room:*')
    console.log(`✅ user:* 키 개수: ${userKeys.length}`)
    console.log(`✅ room:* 키 개수: ${roomKeys.length}`)

    console.log('')
    console.log('🎉 모든 테스트 통과! Redis 연결이 정상적으로 작동합니다.')
    
    await redis.quit()
    process.exit(0)
  } catch (error: any) {
    console.error('❌ 테스트 중 오류 발생:', error.message)
    await redis.quit()
    process.exit(1)
  }
})

redis.on('error', (error) => {
  console.error('❌ Redis 연결 오류:', error.message)
  console.error('')
  console.error('🔧 문제 해결 방법:')
  console.error('1. Redis 서버가 실행 중인지 확인하세요')
  console.error('2. REDIS_URL 환경 변수를 확인하세요 (현재:', redisUrl, ')')
  console.error('3. Redis 포트가 올바른지 확인하세요 (기본: 6379, 현재 설정: 3001)')
  console.error('4. 방화벽 설정을 확인하세요')
  process.exit(1)
})

redis.on('close', () => {
  console.warn('⚠️ Redis 연결 종료')
})

redis.on('reconnecting', () => {
  console.log('🔄 Redis 재연결 시도 중...')
})

// 타임아웃 설정 (10초)
setTimeout(() => {
  console.error('❌ 연결 타임아웃 (10초)')
  redis.quit()
  process.exit(1)
}, 10000)

