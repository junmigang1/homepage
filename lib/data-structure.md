# 프로젝트 데이터 구조 분석

## 📊 현재 프로젝트의 주요 데이터 변수들

### 1. **Users (사용자)** - `mockUsers`
```typescript
{
  id: string              // 사용자 ID
  name: string            // 이름
  school: string          // 학교
  avatarUrl: string       // 프로필 이미지 URL
  reputation: number      // 평판 점수
}
```

### 2. **Books (책)** - `mockBooks`
```typescript
{
  id: string              // 책 ID
  title: string           // 제목
  author: string          // 저자
  coverUrl: string        // 표지 이미지 URL
  condition: string       // 상태 ('좋음', '보통', '나쁨')
  genre: string           // 장르 ('판타지', '소설', 등)
  ownerId: string         // 소유자 ID
  owner: User            // 소유자 정보
  isExchangeable: boolean // 교환 가능 여부
  reviews: Review[]       // 리뷰 배열
  createdAt: Date        // 생성일
}
```

### 3. **Exchanges (교환)** - `mockExchanges`
```typescript
{
  id: string              // 교환 ID
  bookId: string          // 책 ID
  book: {                 // 책 정보
    title: string
    author: string
    coverUrl: string
  }
  requesterId: string     // 요청자 ID
  requester: User        // 요청자 정보
  ownerId: string        // 소유자 ID
  owner: User            // 소유자 정보
  method: string         // 교환 방법 ('택배', '보관함', 등)
  status: string         // 상태 ('requested', 'accepted', 'shipped', 'received', 'completed')
  createdAt: Date        // 생성일
  updatedAt: Date        // 수정일
}
```

### 4. **Reviews (리뷰)** - `mockReviews`
```typescript
{
  id: string              // 리뷰 ID
  bookId: string         // 책 ID
  book: {                 // 책 정보
    title: string
    author: string
    coverUrl: string
  }
  userId: string         // 사용자 ID
  user: User            // 사용자 정보
  content: string        // 리뷰 내용
  rating: number         // 평점 (1-5)
  createdAt: Date       // 생성일
}
```

### 5. **JourneyNodes (여정 노드)** - `mockJourneyNodes`
```typescript
{
  id: string              // 노드 ID
  bookId: string         // 책 ID
  userId: string         // 사용자 ID
  user: User            // 사용자 정보
  city: string          // 도시
  lat: number           // 위도
  lng: number           // 경도
  note: string          // 메모
  emotion: string       // 감정
  createdAt: Date      // 생성일
}
```

## 🔄 API 엔드포인트별 데이터 흐름

### `/api/books`
- **GET**: 책 목록 조회 (필터링: genre, condition, search)
- **POST**: 새 책 등록
- **사용 변수**: `mockBooks`

### `/api/books/[id]`
- **GET**: 특정 책 상세 정보
- **사용 변수**: `mockBooks`, `mockJourneyNodes`, `mockReviews`

### `/api/exchanges`
- **GET**: 교환 목록 조회 (필터링: userId)
- **POST**: 새 교환 요청 생성
- **사용 변수**: `mockExchanges`

### `/api/exchanges/[id]`
- **PATCH**: 교환 상태 업데이트
- **사용 변수**: `mockExchanges`

### `/api/reviews`
- **GET**: 리뷰 목록 조회 (필터링: bookId, limit)
- **POST**: 새 리뷰 작성
- **사용 변수**: `mockReviews`

### `/api/journey/[bookId]`
- **GET**: 특정 책의 여정 정보 조회
- **사용 변수**: `mockJourneyNodes`, `mockBooks`, `mockUsers`

## 💾 Redis에 저장할 수 있는 데이터 추천

### 1. **캐싱 대상 (자주 조회되는 데이터)**
- ✅ **책 목록** (`books:*`) - 검색/필터링 결과 캐싱
- ✅ **책 상세 정보** (`book:{id}`) - 자주 조회되는 책 정보
- ✅ **여정 정보** (`journey:{bookId}`) - 지도 표시용 데이터
- ✅ **리뷰 목록** (`reviews:{bookId}`) - 책별 리뷰 목록

### 2. **세션/상태 관리**
- ✅ **사용자 세션** (`session:{userId}`) - 로그인 상태
- ✅ **교환 진행 상태** (`exchange:{id}`) - 실시간 교환 추적

### 3. **실시간 데이터**
- ✅ **활성 교환 목록** (`exchanges:active`) - 진행 중인 교환
- ✅ **최근 등록된 책** (`books:recent`) - 최신 책 목록

### 4. **통계/집계 데이터**
- ✅ **책별 평균 평점** (`book:rating:{bookId}`)
- ✅ **사용자별 교환 통계** (`user:stats:{userId}`)

## 📝 Redis 키 네이밍 컨벤션 제안

```
# 책 관련
books:all                    # 전체 책 목록
books:{id}                   # 특정 책 정보
books:genre:{genre}          # 장르별 책 목록
books:recent                 # 최근 등록된 책

# 교환 관련
exchanges:all                # 전체 교환 목록
exchanges:{id}               # 특정 교환 정보
exchanges:user:{userId}      # 사용자별 교환 목록
exchanges:active             # 진행 중인 교환

# 리뷰 관련
reviews:book:{bookId}        # 책별 리뷰 목록
reviews:{id}                 # 특정 리뷰 정보

# 여정 관련
journey:{bookId}             # 책별 여정 정보
journey:nodes:{bookId}       # 책별 여정 노드 목록

# 사용자 관련
user:{id}                    # 사용자 정보
user:stats:{userId}          # 사용자 통계
session:{userId}             # 사용자 세션
```

## 🎯 우선순위 추천

1. **High Priority** (즉시 구현 권장)
   - `books:{id}` - 책 상세 정보 캐싱
   - `journey:{bookId}` - 여정 정보 캐싱
   - `exchanges:{id}` - 교환 상태 실시간 추적

2. **Medium Priority** (성능 개선)
   - `books:genre:{genre}` - 장르별 검색 결과 캐싱
   - `reviews:book:{bookId}` - 리뷰 목록 캐싱
   - `exchanges:user:{userId}` - 사용자별 교환 목록

3. **Low Priority** (추가 기능)
   - `user:stats:{userId}` - 통계 데이터
   - `session:{userId}` - 세션 관리

