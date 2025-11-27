import { getRedisClient, closeRedisConnection } from '../lib/redis'

async function clearRedis() {
    console.log('🗑️  Redis 데이터 삭제 시작...\n')

    try {
        const redis = getRedisClient()

        // 모든 키 패턴 가져오기
        const patterns = ['user:*', 'book:*', 'journey:*', 'review:*']

        for (const pattern of patterns) {
            const keys = await redis.keys(pattern)
            if (keys.length > 0) {
                console.log(`🔍 ${pattern} 패턴: ${keys.length}개 키 발견`)
                await redis.del(...keys)
                console.log(`  ✓ 삭제 완료`)
            } else {
                console.log(`🔍 ${pattern} 패턴: 키 없음`)
            }
        }

        console.log('\n✅ Redis 데이터 삭제 완료!')
    } catch (error) {
        console.error('❌ Redis 데이터 삭제 실패:', error)
        process.exit(1)
    } finally {
        await closeRedisConnection()
    }
}

// 스크립트 실행
clearRedis()
