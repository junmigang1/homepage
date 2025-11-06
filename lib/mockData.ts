// 더미 데이터 (로컬 개발용)

export const mockUsers = [
  {
    id: '1',
    name: '김독서',
    school: '서울대학교',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    reputation: 100,
  },
  {
    id: '2',
    name: '이책사랑',
    school: '연세대학교',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    reputation: 85,
  },
  {
    id: '3',
    name: '박책벌레',
    school: '고려대학교',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    reputation: 120,
  },
]

export const mockBooks = [
  {
    id: '1',
    title: '해리포터와 마법사의 돌',
    author: 'J.K. 롤링',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200',
    condition: '좋음',
    genre: '판타지',
    ownerId: '1',
    owner: mockUsers[0],
    isExchangeable: true,
    reviews: [{ rating: 5 }],
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: '1984',
    author: '조지 오웰',
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    condition: '보통',
    genre: '소설',
    ownerId: '2',
    owner: mockUsers[1],
    isExchangeable: true,
    reviews: [{ rating: 4 }],
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    title: '노인과 바다',
    author: '어니스트 헤밍웨이',
    coverUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
    condition: '좋음',
    genre: '소설',
    ownerId: '3',
    owner: mockUsers[2],
    isExchangeable: true,
    reviews: [{ rating: 5 }],
    createdAt: new Date('2024-01-25'),
  },
]

export const mockJourneyNodes = [
  {
    id: '1',
    bookId: '1',
    userId: '1',
    user: mockUsers[0],
    city: '서울',
    lat: 37.5665,
    lng: 126.9780,
    note: '정말 재미있는 책이에요!',
    emotion: '기쁨',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    bookId: '1',
    userId: '2',
    user: mockUsers[1],
    city: '부산',
    lat: 35.1796,
    lng: 129.0756,
    note: '마법 같은 세계로 빠져들었어요',
    emotion: '신비',
    createdAt: new Date('2024-01-20'),
  },
]

export const mockExchanges = [
  {
    id: '1',
    bookId: '1',
    book: {
      title: mockBooks[0].title,
      author: mockBooks[0].author,
      coverUrl: mockBooks[0].coverUrl,
    },
    requesterId: '2',
    requester: mockUsers[1],
    ownerId: '1',
    owner: mockUsers[0],
    method: '택배',
    status: 'requested',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
  },
]

export const mockReviews = [
  {
    id: '1',
    bookId: '1',
    book: {
      title: mockBooks[0].title,
      author: mockBooks[0].author,
      coverUrl: mockBooks[0].coverUrl,
    },
    userId: '1',
    user: mockUsers[0],
    content: '정말 재미있는 책입니다! 마법의 세계로 빠져들었어요.',
    rating: 5,
    createdAt: new Date('2024-01-16'),
  },
  {
    id: '2',
    bookId: '2',
    book: {
      title: mockBooks[1].title,
      author: mockBooks[1].author,
      coverUrl: mockBooks[1].coverUrl,
    },
    userId: '2',
    user: mockUsers[1],
    content: '생각보다 깊이 있는 내용이네요.',
    rating: 4,
    createdAt: new Date('2024-01-21'),
  },
]

