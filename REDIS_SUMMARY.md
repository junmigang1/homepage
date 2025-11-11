# 🔍 Redis 연결 및 프로젝트 구조 점검 요약

## 🔑 Redis에 저장된 키 목록 예시

### 현재 프로젝트에서 사용하는 Redis 키 패턴

| 키 패턴 | 설명 | 예시 | 사용 위치 |
|---------|------|------|-----------|
| `user:{userId}` | 사용자 정보 | `user_user_example_1234567890` | `app/api/auth/[...nextauth]/route.ts` |
| `room:{roomId}` | 방 정보 | `room_1234567890_abc123` | `app/api/rooms/*` |
| `book:{bookId}` | 책 정보 | `book_1234567890` | `app/api/books/route.ts` |
| `exchange:{exchangeId}` | 교환 정보 | `exchange_1234567890` | `app/api/exchanges/*` |
| `review:{reviewId}` | 리뷰 정보 | `review_1234567890` | `app/api/reviews/route.ts` |
| `journeyNode:{nodeId}` | 여정 노드 | `journeyNode_1234567890` | `app/api/journey/[bookId]/route.ts` |

### 데이터 구조 예시

<details>
<summary><b>User 데이터 구조</b></summary>

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
</details>

<details>
<summary><b>Room 데이터 구조</b></summary>

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
</details>

<details>
<summary><b>Book 데이터 구조</b></summary>

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
</details>

## ✅ Redis 연결 상태 및 설정 확인

### 현재 설정
- **기본 URL**: `redis://localhost:3001` (환경 변수 없을 때)
- **환경 변수**: `REDIS_URL` (`.env.local`에서 설정)
- **클라이언트**: `ioredis` ✅
- **연결 상태**: ⚠️ Redis 서버 미실행 (연결 테스트 필요)

### 설정 파일
- **Redis 클라이언트**: `lib/redis.ts` ✅
- **환경 변수 파일**: `.env.local` (프로젝트 루트에 생성 필요)

### Redis 클라이언트 설정 확인
```typescript
// lib/redis.ts
export function getRedisClient(): Redis {
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:3001'
  // ✅ 재시도 전략 설정됨
  // ✅ 이벤트 리스너 설정됨 (connect, ready, error, close, reconnecting)
  // ✅ 연결 상태 로깅 설정됨
}
```

### 연결 테스트 방법
1. **API 엔드포인트**: `http://localhost:3000/api/redis/test`
2. **스크립트**: `npx tsx scripts/test-redis.ts`
3. **Redis CLI**: `redis-cli ping` (또는 `redis-cli -p 3001 ping`)

## ⚠️ 중복된 키 네이밍 / 충돌 의심 항목

### 1. ID 생성 방식 불일치 ⚠️

| 타입 | ID 형식 | 예시 | 위치 |
|------|---------|------|------|
| **User** | `user_{email}_{timestamp}` | `user_example_1234567890` | `app/api/auth/[...nextauth]/route.ts:42` |
| **Room** | `room_{timestamp}_{random}` | `room_1234567890_abc123` | `app/api/rooms/create/route.ts:21` |
| **Book** | `String(Date.now())` | `1234567890` | `app/api/books/route.ts:55` |
| **Exchange** | `String(Date.now())` | `1234567890` | `app/api/exchanges/route.ts:42` |
| **Review** | `String(Date.now())` | `1234567890` | `app/api/reviews/route.ts:44` |

#### 문제점
- ⚠️ **타임스탬프 기반 ID 충돌 가능성**: 동시에 여러 요청이 들어오면 같은 ID가 생성될 수 있음
- ⚠️ **형식 불일치**: User와 Room은 접두사 포함, 나머지는 숫자만

#### 권장 사항
```typescript
// UUID 사용 (권장)
import { randomUUID } from 'crypto'
const id = randomUUID()

// 또는 타임스탬프 + 랜덤 문자열 조합
const id = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
```

### 2. 키 네이밍 일관성 ✅

모든 키는 일관된 패턴을 따릅니다:
- ✅ `{type}:{id}` 형식
- ✅ 소문자 사용
- ✅ 콜론(`:`)으로 구분
- ✅ 충돌 없음

### 3. 데이터 구조 충돌 없음 ✅

각 키 타입은 고유한 데이터 구조를 가지며 충돌 없음

## 🧱 Redis 클라이언트 사용 방식 일관성 점검 결과

### ✅ 수정 완료된 파일 (11개)

| 파일 | 상태 | 이전 방식 | 수정 후 |
|------|------|-----------|---------|
| `app/api/books/route.ts` | ✅ | `getRedisClient()` | ✅ |
| `app/api/exchanges/route.ts` | ✅ | `getRedisClient()` | ✅ |
| `app/api/exchanges/[id]/route.ts` | ✅ | `getRedisClient()` | ✅ |
| `app/api/rooms/create/route.ts` | ✅ | `getRedisClient()` | ✅ |
| `app/api/rooms/join/route.ts` | ✅ | `getRedisClient()` | ✅ |
| `app/api/rooms/[roomId]/route.ts` | ✅ | `getRedisClient()` | ✅ |
| `app/api/users/[userId]/route.ts` | ✅ | `import redis from` → `getRedisClient()` | ✅ |
| `app/api/auth/[...nextauth]/route.ts` | ✅ | `getRedisClient()` | ✅ |
| `app/api/redis/test/route.ts` | ✅ | `getRedisClient()` | ✅ |
| `app/api/journey/[bookId]/route.ts` | ✅ | `import redis from` → `getRedisClient()` | ✅ |
| `app/api/reviews/route.ts` | ✅ | `import redis from` → `getRedisClient()` | ✅ |

### 📊 사용 방식 통계

- **올바른 방식** (`getRedisClient()`): 11개 파일 ✅
- **잘못된 방식** (`import redis from`): 0개 파일 ✅
- **일관성**: 100% ✅

### 🔧 함수 사용 일관성

- ✅ `getCurrentUserId()` 사용: 모든 인증이 필요한 API
- ✅ `getRedisClient()` 사용: 모든 Redis 접근
- ✅ `getUserIdFromSession()` 제거: 존재하지 않는 함수였음

## 📋 요약 및 권장 사항

### ✅ 잘 작동하는 부분
1. ✅ Redis 클라이언트 설정이 일관되게 사용됨
2. ✅ 키 네이밍 패턴이 일관됨
3. ✅ 데이터 구조가 명확함
4. ✅ 모든 파일이 올바른 방식으로 수정됨

### ⚠️ 개선이 필요한 부분
1. **ID 생성 방식 통일**: UUID 또는 더 안전한 방식 사용 권장
2. **Redis 서버 실행**: 현재 연결되지 않음
3. **환경 변수 설정**: `.env.local` 파일 생성 필요

### 🎯 다음 단계
1. ✅ Redis 클라이언트 사용 방식 통일 완료
2. 🔄 Redis 서버 실행 (Docker 권장)
3. 🔄 `.env.local` 파일 생성 및 `REDIS_URL` 설정
4. ⚠️ ID 생성 방식 통일 (선택사항)

## 🔧 빠른 시작 가이드

### 1. Redis 서버 실행 (Docker)
```bash
docker run -d -p 6379:6379 --name redis redis:latest
```

### 2. 환경 변수 설정
`.env.local` 파일 생성:
```env
REDIS_URL=redis://localhost:6379
```

### 3. 연결 테스트
```bash
npx tsx scripts/test-redis.ts
```

또는 브라우저에서:
```
http://localhost:3000/api/redis/test
```

