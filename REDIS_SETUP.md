# Redis 설정 및 연결 확인 가이드

## 🔍 현재 상태

Redis 연결 테스트 결과:

- ❌ Redis 서버가 실행되지 않고 있습니다
- 현재 설정된 URL: `redis://localhost:3001`
- 기본 Redis 포트: `6379`

## 🚀 Redis 서버 설치 및 실행 방법

### Windows

#### 방법 1: WSL2 사용 (권장)

```bash
# WSL2에서 Redis 설치
sudo apt update
sudo apt install redis-server

# Redis 서버 시작
sudo service redis-server start

# Redis 서버 상태 확인
sudo service redis-server status
```

#### 방법 2: Docker 사용 (가장 간단)

```bash
# Docker로 Redis 실행
docker run -d -p 6379:6379 --name redis redis:latest

# 또는 포트 3001로 실행하려면
docker run -d -p 3001:6379 --name redis redis:latest
```

#### 방법 3: Memurai 사용 (Windows 네이티브)

1. [Memurai 다운로드](https://www.memurai.com/get-memurai) (Windows용 Redis 호환 서버)
2. 설치 후 서비스로 실행

### macOS

```bash
# Homebrew로 설치
brew install redis

# Redis 서버 시작
brew services start redis

# 또는 수동 실행
redis-server
```

### Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install redis-server

# Redis 서버 시작
sudo systemctl start redis-server

# 부팅 시 자동 시작
sudo systemctl enable redis-server
```

## ⚙️ 환경 변수 설정

`.env.local` 파일에 Redis URL을 설정하세요:

```env
# 기본 포트 사용 (6379)
REDIS_URL=redis://localhost:6379

# 또는 포트 3001 사용
REDIS_URL=redis://localhost:3001
```

## ✅ 연결 확인

### 방법 1: API 엔드포인트 사용

개발 서버 실행 후 브라우저에서 접속:

```
http://localhost:3000/api/redis/test
```

### 방법 2: 스크립트 사용

```bash
npx tsx scripts/test-redis.ts
```

### 방법 3: Redis CLI 사용

```bash
# Redis CLI로 연결 테스트
redis-cli ping
# 응답: PONG (연결 성공)

# 또는 포트 지정
redis-cli -p 3001 ping
```

## 🔧 문제 해결

### 문제 1: "Connection refused" 오류

- Redis 서버가 실행 중인지 확인
- 포트가 올바른지 확인 (기본: 6379)
- 방화벽 설정 확인

### 문제 2: "ECONNREFUSED" 오류

- Redis 서버가 해당 포트에서 리스닝 중인지 확인
- `netstat -an | grep 6379` (Linux/Mac)
- `netstat -an | findstr 6379` (Windows)

### 문제 3: 포트 충돌

- 다른 포트 사용: `REDIS_URL=redis://localhost:6380`
- 또는 다른 포트로 Redis 실행

## 📝 현재 프로젝트에서 Redis 사용 위치

1. **유저 정보 저장**: `app/api/auth/[...nextauth]/route.ts`
   - 키 형식: `user:{userId}`

2. **방 정보 저장**: `app/api/rooms/create/route.ts`, `app/api/rooms/join/route.ts`
   - 키 형식: `room:{roomId}`

3. **유저 정보 조회**: `app/api/users/[userId]/route.ts`

4. **방 정보 조회**: `app/api/rooms/[roomId]/route.ts`

## 🎯 빠른 시작 (Docker 사용)

```bash
# Redis 컨테이너 실행
docker run -d -p 6379:6379 --name redis redis:latest

# .env.local 파일에 추가
echo "REDIS_URL=redis://localhost:6379" >> .env.local

# 연결 테스트
npx tsx scripts/test-redis.ts
```
