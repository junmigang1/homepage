import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 시드 데이터 생성 시작...')

  // 사용자 생성
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: '독서왕김철수',
        email: 'booklover1@example.com',
        school: '서울대학교',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        reputation: 100,
      }
    }),
    prisma.user.create({
      data: {
        name: '책벌레영희',
        email: 'booklover2@example.com',
        school: '연세대학교',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        reputation: 85,
      }
    }),
    prisma.user.create({
      data: {
        name: '문학청년',
        email: 'booklover3@example.com',
        school: '고려대학교',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        reputation: 90,
      }
    }),
    prisma.user.create({
      data: {
        name: '공부러버',
        email: 'booklover4@example.com',
        school: '성균관대학교',
        avatarUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=100&fit=crop&crop=face',
        reputation: 75,
      }
    }),
    prisma.user.create({
      data: {
        name: '투자왕',
        email: 'booklover5@example.com',
        school: '한양대학교',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        reputation: 80,
      }
    })
  ])

  console.log('✅ 사용자 생성 완료')

  // 책 생성
  const books = await Promise.all([
    prisma.book.create({
      data: {
        title: '사피엔스',
        author: '유발 하라리',
        coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop',
        condition: '양호',
        ownerId: users[0].id,
        genre: '인문학',
        isExchangeable: true,
      }
    }),
    prisma.book.create({
      data: {
        title: '1984',
        author: '조지 오웰',
        coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
        condition: '새책',
        ownerId: users[1].id,
        genre: '소설',
        isExchangeable: true,
      }
    }),
    prisma.book.create({
      data: {
        title: '아몬드',
        author: '손원평',
        coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop',
        condition: '양호',
        ownerId: users[2].id,
        genre: '소설',
        isExchangeable: true,
      }
    }),
    prisma.book.create({
      data: {
        title: '완벽한 공부법',
        author: '이지성',
        coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
        condition: '새책',
        ownerId: users[3].id,
        genre: '자기계발',
        isExchangeable: true,
      }
    }),
    prisma.book.create({
      data: {
        title: '부의 추월차선',
        author: '엠제이 드마코',
        coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop',
        condition: '양호',
        ownerId: users[4].id,
        genre: '경제',
        isExchangeable: true,
      }
    }),
    prisma.book.create({
      data: {
        title: '미드나잇 라이브러리',
        author: '매트 헤이그',
        coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop',
        condition: '양호',
        ownerId: users[0].id,
        genre: '소설',
        isExchangeable: false,
      }
    })
  ])

  console.log('✅ 책 생성 완료')

  // 여정 노드 생성
  const journeyNodes = await Promise.all([
    prisma.journeyNode.create({
      data: {
        bookId: books[0].id,
        userId: users[0].id,
        city: '서울 강남구',
        lat: 37.5665,
        lng: 126.9780,
        note: '정말 인상깊은 책이었어요. 인류의 역사를 새롭게 바라보게 되었습니다.',
        emotion: '감동',
      }
    }),
    prisma.journeyNode.create({
      data: {
        bookId: books[1].id,
        userId: users[1].id,
        city: '서울 마포구',
        lat: 37.5663,
        lng: 126.9019,
        note: '빅브라더가 당신을 지켜보고 있다... 이 한 줄이 얼마나 무서운지 이제야 알겠어요.',
        emotion: '놀라움',
      }
    }),
    prisma.journeyNode.create({
      data: {
        bookId: books[2].id,
        userId: users[2].id,
        city: '서울 서초구',
        lat: 37.4947,
        lng: 127.0276,
        note: '감정을 느끼지 못하는 소년의 이야기인데, 오히려 더 깊은 감동을 받았어요.',
        emotion: '호기심',
      }
    })
  ])

  console.log('✅ 여정 노드 생성 완료')

  // 교환 생성
  const exchanges = await Promise.all([
    prisma.exchange.create({
      data: {
        bookId: books[0].id,
        requesterId: users[1].id,
        ownerId: users[0].id,
        method: '택배',
        status: 'accepted',
      }
    }),
    prisma.exchange.create({
      data: {
        bookId: books[1].id,
        requesterId: users[2].id,
        ownerId: users[1].id,
        method: '보관함',
        status: 'requested',
      }
    }),
    prisma.exchange.create({
      data: {
        bookId: books[2].id,
        requesterId: users[3].id,
        ownerId: users[2].id,
        method: '택배',
        status: 'completed',
      }
    })
  ])

  console.log('✅ 교환 생성 완료')

  // 리뷰 생성
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        bookId: books[0].id,
        userId: users[0].id,
        content: '이 책을 읽고 나서 인류의 역사를 완전히 다르게 보게 되었어요. 특히 농업혁명 부분이 정말 충격적이었습니다.',
        rating: 5,
      }
    }),
    prisma.review.create({
      data: {
        bookId: books[1].id,
        userId: users[1].id,
        content: '빅브라더가 당신을 지켜보고 있다... 이 한 줄이 얼마나 무서운지 이제야 알겠어요. 현실과 너무 닮아있어서 소름이 돋았습니다.',
        rating: 5,
      }
    }),
    prisma.review.create({
      data: {
        bookId: books[2].id,
        userId: users[2].id,
        content: '감정을 느끼지 못하는 소년의 이야기인데, 오히려 더 깊은 감동을 받았어요. 우리가 당연하게 여기는 감정들이 얼마나 소중한지...',
        rating: 5,
      }
    })
  ])

  console.log('✅ 리뷰 생성 완료')

  // 뱃지 생성
  const badges = await Promise.all([
    prisma.badge.create({
      data: {
        userId: users[0].id,
        type: '리뷰왕',
      }
    }),
    prisma.badge.create({
      data: {
        userId: users[0].id,
        type: '여정리더',
      }
    }),
    prisma.badge.create({
      data: {
        userId: users[1].id,
        type: '인증독자',
      }
    })
  ])

  console.log('✅ 뱃지 생성 완료')

  console.log('🎉 시드 데이터 생성 완료!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
