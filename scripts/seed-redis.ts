import { loadEnvConfig } from '@next/env'
import { getRedisClient, closeRedisConnection } from '../lib/redis'

// Load environment variables from .env.local
const projectDir = process.cwd()
loadEnvConfig(projectDir)

// 책 데이터
const books = [
    {
        id: 'book_1',
        title: '사피엔스',
        author: '유발 하라리',
        coverUrl:
            'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop',
        genre: '인문학',
        condition: '양호',
        ownerId: 'user_1',
        rating: 4.8,
        reviewCount: 23,
        isExchangeable: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'book_2',
        title: '완벽한 공부법',
        author: '이지성',
        coverUrl:
            'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
        genre: '자기계발',
        condition: '새책',
        ownerId: 'user_2',
        rating: 4.6,
        reviewCount: 15,
        isExchangeable: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'book_3',
        title: '미드나잇 라이브러리',
        author: '매트 헤이그',
        coverUrl:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop',
        genre: '소설',
        condition: '양호',
        ownerId: 'user_3',
        rating: 4.9,
        reviewCount: 31,
        isExchangeable: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'book_4',
        title: '부의 추월차선',
        author: '엠제이 드마코',
        coverUrl:
            'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop',
        genre: '경제',
        condition: '양호',
        ownerId: 'user_4',
        rating: 4.5,
        reviewCount: 18,
        isExchangeable: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'book_5',
        title: '아몬드',
        author: '손원평',
        coverUrl:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop',
        genre: '소설',
        condition: '새책',
        ownerId: 'user_5',
        rating: 4.7,
        reviewCount: 27,
        isExchangeable: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'book_6',
        title: '마음의 평화',
        author: '달라이 라마',
        coverUrl:
            'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
        genre: '철학',
        condition: '양호',
        ownerId: 'user_6',
        rating: 4.8,
        reviewCount: 19,
        isExchangeable: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'book_7',
        title: '해리포터와 마법사의 돌',
        author: 'J.K. 롤링',
        coverUrl:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop',
        genre: '소설',
        condition: '양호',
        ownerId: 'user_1',
        rating: 4.9,
        reviewCount: 45,
        isExchangeable: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'book_8',
        title: '1984',
        author: '조지 오웰',
        coverUrl:
            'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
        genre: '소설',
        condition: '양호',
        ownerId: 'user_2',
        rating: 4.8,
        reviewCount: 38,
        isExchangeable: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'book_9',
        title: '작은 아씨들',
        author: '루이자 메이 올컷',
        coverUrl:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop',
        genre: '소설',
        condition: '양호',
        ownerId: 'user_3',
        rating: 4.6,
        reviewCount: 22,
        isExchangeable: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'book_10',
        title: '데미안',
        author: '헤르만 헤세',
        coverUrl:
            'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop',
        genre: '소설',
        condition: '양호',
        ownerId: 'user_4',
        rating: 4.7,
        reviewCount: 29,
        isExchangeable: true,
        createdAt: new Date().toISOString(),
    },
]

// 사용자 데이터
const users = [
    {
        id: 'user_1',
        name: '독서왕',
        email: 'reader1@example.com',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        school: '서울대학교',
        createdAt: new Date().toISOString(),
    },
    {
        id: 'user_2',
        name: '공부러버',
        email: 'studylover@example.com',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        school: '연세대학교',
        createdAt: new Date().toISOString(),
    },
    {
        id: 'user_3',
        name: '책벌레',
        email: 'bookworm@example.com',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        school: '고려대학교',
        createdAt: new Date().toISOString(),
    },
    {
        id: 'user_4',
        name: '투자왕',
        email: 'investor@example.com',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=40&h=40&fit=crop&crop=face',
        school: '성균관대학교',
        createdAt: new Date().toISOString(),
    },
    {
        id: 'user_5',
        name: '문학청년',
        email: 'literature@example.com',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        school: '한양대학교',
        createdAt: new Date().toISOString(),
    },
    {
        id: 'user_6',
        name: '명상가',
        email: 'meditation@example.com',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        school: '이화여자대학교',
        createdAt: new Date().toISOString(),
    },
]

// 여정 데이터 (진행 중인 책)
const journeys = [
    {
        id: 'journey_1',
        bookId: 'book_7',
        currentLocation: '서울 강남구',
        readerCount: 3,
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
        progress: 75,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'journey_2',
        bookId: 'book_8',
        currentLocation: '부산 해운대구',
        readerCount: 5,
        lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30분 전
        progress: 60,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'journey_3',
        bookId: 'book_9',
        currentLocation: '대구 수성구',
        readerCount: 2,
        lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1일 전
        progress: 40,
        createdAt: new Date().toISOString(),
    },
    {
        id: 'journey_4',
        bookId: 'book_10',
        currentLocation: '인천 연수구',
        readerCount: 4,
        lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3시간 전
        progress: 90,
        createdAt: new Date().toISOString(),
    },
]

// 리뷰 데이터
const reviews = [
    {
        id: 'review_1',
        userId: 'user_1',
        bookId: 'book_1',
        content:
            '이 책을 읽고 나서 인류의 역사를 완전히 다르게 보게 되었어요. 특히 농업혁명 부분이 정말 충격적이었습니다...',
        rating: 5,
        reactions: { heart: 23, thumbsUp: 15, message: 8 },
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isHot: true,
    },
    {
        id: 'review_2',
        userId: 'user_2',
        bookId: 'book_8',
        content:
            '빅브라더가 당신을 지켜보고 있다... 이 한 줄이 얼마나 무서운지 이제야 알겠어요. 현실과 너무 닮아있어서 소름이 돋았습니다.',
        rating: 5,
        reactions: { heart: 18, thumbsUp: 12, message: 5 },
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        isHot: false,
    },
    {
        id: 'review_3',
        userId: 'user_5',
        bookId: 'book_5',
        content:
            '감정을 느끼지 못하는 소년의 이야기인데, 오히려 더 깊은 감동을 받았어요. 우리가 당연하게 여기는 감정들이 얼마나 소중한지...',
        rating: 5,
        reactions: { heart: 31, thumbsUp: 22, message: 14 },
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        isHot: true,
    },
    {
        id: 'review_4',
        userId: 'user_2',
        bookId: 'book_2',
        content:
            '공부 방법을 완전히 바꿔야겠어요. 지금까지 잘못된 방법으로 공부하고 있었던 것 같습니다. 추천합니다!',
        rating: 4,
        reactions: { heart: 16, thumbsUp: 9, message: 6 },
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        isHot: false,
    },
]

async function seedRedis() {
    console.log('🌱 Redis 시드 데이터 삽입 시작...\n')

    try {
        const redis = getRedisClient()

        // 1. 사용자 데이터 삽입
        console.log('👥 사용자 데이터 삽입 중...')
        for (const user of users) {
            await redis.set(`user:${user.id}`, JSON.stringify(user))
            console.log(`  ✓ ${user.name} (${user.id})`)
        }

        // 2. 책 데이터 삽입
        console.log('\n📚 책 데이터 삽입 중...')
        for (const book of books) {
            await redis.set(`book:${book.id}`, JSON.stringify(book))
            console.log(`  ✓ ${book.title} (${book.id})`)
        }

        // 3. 여정 데이터 삽입
        console.log('\n🗺️  여정 데이터 삽입 중...')
        for (const journey of journeys) {
            await redis.set(`journey:${journey.id}`, JSON.stringify(journey))
            console.log(`  ✓ Journey ${journey.id} - Book ${journey.bookId}`)
        }

        // 4. 리뷰 데이터 삽입
        console.log('\n⭐ 리뷰 데이터 삽입 중...')
        for (const review of reviews) {
            await redis.set(`review:${review.id}`, JSON.stringify(review))
            console.log(`  ✓ Review ${review.id} by User ${review.userId}`)
        }

        console.log('\n✅ 시드 데이터 삽입 완료!')
        console.log(`\n📊 삽입된 데이터:`)
        console.log(`  - 사용자: ${users.length}명`)
        console.log(`  - 책: ${books.length}권`)
        console.log(`  - 여정: ${journeys.length}개`)
        console.log(`  - 리뷰: ${reviews.length}개`)
    } catch (error) {
        console.error('❌ 시드 데이터 삽입 실패:', error)
        process.exit(1)
    } finally {
        await closeRedisConnection()
    }
}

// 스크립트 실행
seedRedis()
