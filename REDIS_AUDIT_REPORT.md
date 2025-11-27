# 🔍 Redis 연결 및 프로젝트 구조 점검 리포트

생성일: 2024년

## 🔑 Redis에 저장된 키 목록 예시

### 현재 프로젝트에서 사용하는 Redis 키 패턴

```
user:{userId}              # 사용자 정보
  예: user_user_example_1234567890

room:{roomId}              # 방 정보
  예: room_1234567890_abc123

book:{bookId}              # 책 정보
  예: book_1234567890

exchange:{exchangeId}      # 교환 정보
  예: exchange_1234567890

review:{reviewId}          # 리뷰 정보
  예: review_1234567890

journeyNode:{nodeId}       # 여정 노드 정보
  예: journeyNode_1234567890
```

### 데이터 구조 예시

#### 1. User (`user:{userId}`)

```json
{
  "id": "user_example_1234567890",
  "email": "user@example.com",
  "name": "사용자 이름",
  "image": "https://...",
  "provider": "google|kakao",
  "providerId": "...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 2. Room (`room:{roomId}`)

```json
{
  "id": "room_1234567890_abc123",
  "hostId": "user_example_1234567890",
  "maxMembers": 4,
  "currentMembers": 2,
  "members": ["user_1", "user_2"],
  "status": "open|closed",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### 3. Book (`book:{bookId}`)

```json
{
  "id": "1234567890",
  "title": "책 제목",
  "author": "저자명",
  "coverUrl": "https://...",
  "condition": "좋음|보통|나쁨",
  "genre": "소설|판타지|...",
  "ownerId": "user_example_1234567890",
  "isExchangeable": true,
  "reviews": [],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### 4. Exchange (`exchange:{exchangeId}`)

```json
{
  "id": "1234567890",
  "bookId": "1234567890",
  "requesterId": "user_1",
  "ownerId": "user_2",
  "method": "택배|보관함",
  "status": "requested|accepted|shipped|received|completed",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 5. Review (`review:{reviewId}`)

```json
{
  "id": "1234567890",
  "bookId": "1234567890",
  "userId": "user_example_1234567890",
  "content": "리뷰 내용",
  "rating": 5,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### 6. JourneyNode (`journeyNode:{nodeId}`)

```json
{
  "id": "1234567890",
  "bookId": "1234567890",
  "userId": "user_example_1234567890",
  "city": "서울",
  "lat": 37.5665,
  "lng": 126.978,
  "note": "메모",
  "emotion": "기쁨",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## ✅ Redis 연결 상태 및 설정 확인

### 현재 설정

- **기본 URL**: `redis://localhost:3001` (환경 변수 없을 때)
- **환경 변수**: `REDIS_URL` (`.env.local`에서 설정)
- **클라이언트**: `ioredis`

### 연결 상태

- ⚠️ **현재 상태**: Redis 서버가 실행되지 않음
- 🔧 **해결 방법**: `REDIS_SETUP.md` 참고

### 설정 파일 위치

- **Redis 클라이언트**: `lib/redis.ts`
- **환경 변수**: `.env.local` (프로젝트 루트)

### Redis 클라이언트 설정

```typescript
// lib/redis.ts
export function getRedisClient(): Redis {
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:3001'
  // 재시도 전략, 이벤트 리스너 등 설정됨
}
```

## ⚠️ 중복된 키 네이밍 / 충돌 의심 항목

### 1. ID 생성 방식 불일치 ⚠️

#### User ID

- **형식**: `user_{email_prefix}_{timestamp}`
- **예**: `user_example_1234567890`
- **위치**: `app/api/auth/[...nextauth]/route.ts:42`

#### Room ID

- **형식**: `room_{timestamp}_{random}`
- **예**: `room_1234567890_abc123`
- **위치**: `app/api/rooms/create/route.ts:21`

#### Book/Exchange/Review ID

- **형식**: `String(Date.now())`
- **예**: `1234567890`
- **위치**:
  - `app/api/books/route.ts:55`
  - `app/api/exchanges/route.ts:42`
  - `app/api/reviews/route.ts:44`

#### 문제점

- ⚠️ **타임스탬프 기반 ID 충돌 가능성**: 동시에 여러 요청이 들어오면 같은 ID가 생성될 수 있음
- ⚠️ **형식 불일치**: User와 Room은 접두사 포함, 나머지는 숫자만

#### 권장 사항

```typescript
// UUID 또는 더 안전한 ID 생성 방식 사용
import { randomUUID } from 'crypto'
const id = randomUUID()

// 또는 타임스탬프 + 랜덤 문자열 조합
const id = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
```

### 2. 키 네이밍 일관성 ✅

모든 키는 일관된 패턴을 따릅니다:

- `{type}:{id}` 형식
- 소문자 사용
- 콜론(`:`)으로 구분

### 3. 데이터 구조 충돌 없음 ✅

각 키 타입은 고유한 데이터 구조를 가지며 충돌 없음

## 🧱 Redis 클라이언트 사용 방식 일관성 점검 결과

### ✅ 수정 완료된 파일

다음 파일들이 올바르게 `getRedisClient()`를 사용하도록 수정되었습니다:

1. ✅ `app/api/books/route.ts`
2. ✅ `app/api/exchanges/route.ts`
3. ✅ `app/api/exchanges/[id]/route.ts`
4. ✅ `app/api/rooms/create/route.ts`
5. ✅ `app/api/rooms/join/route.ts`
6. ✅ `app/api/rooms/[roomId]/route.ts`
7. ✅ `app/api/users/[userId]/route.ts`
8. ✅ `app/api/auth/[...nextauth]/route.ts`
9. ✅ `app/api/redis/test/route.ts`
10. ✅ `app/api/journey/[bookId]/route.ts` (수정됨)
11. ✅ `app/api/reviews/route.ts` (수정됨)

### 📊 사용 방식 통계

- **올바른 방식** (`getRedisClient()`): 11개 파일 ✅
- **잘못된 방식** (`import redis from`): 0개 파일 ✅

### 🔧 함수 사용 일관성

- ✅ `getCurrentUserId()` 사용: 모든 인증이 필요한 API
- ✅ `getRedisClient()` 사용: 모든 Redis 접근

## 📋 요약 및 권장 사항

### ✅ 잘 작동하는 부분

1. Redis 클라이언트 설정이 일관되게 사용됨
2. 키 네이밍 패턴이 일관됨
3. 데이터 구조가 명확함

### ⚠️ 개선이 필요한 부분

1. **ID 생성 방식 통일**: UUID 또는 더 안전한 방식 사용 권장
2. **Redis 서버 실행**: 현재 연결되지 않음
3. **환경 변수 설정**: `.env.local` 파일 생성 필요

### 🎯 다음 단계

1. Redis 서버 실행 (Docker 권장)
2. `.env.local` 파일 생성 및 `REDIS_URL` 설정
3. ID 생성 방식 통일 (선택사항)
