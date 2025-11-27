# 환경 변수 설정 가이드

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수들을 설정해주세요.

## 필수 환경 변수

```env
# NextAuth 설정
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Kakao OAuth
KAKAO_CLIENT_ID=your-kakao-client-id
KAKAO_CLIENT_SECRET=your-kakao-client-secret

# Redis 설정
REDIS_URL=redis://localhost:3001
```

## 환경 변수 설정 방법

### 1. NEXTAUTH_SECRET 생성

터미널에서 다음 명령어를 실행하여 시크릿 키를 생성하세요:

```bash
openssl rand -base64 32
```

### 2. Google OAuth 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" > "사용자 인증 정보"로 이동
4. "OAuth 2.0 클라이언트 ID" 생성
5. 승인된 리디렉션 URI에 `http://localhost:3000/api/auth/callback/google` 추가
6. 클라이언트 ID와 시크릿을 `.env.local`에 추가

### 3. Kakao OAuth 설정

1. [Kakao Developers](https://developers.kakao.com/)에 접속
2. 내 애플리케이션 만들기
3. "앱 설정" > "플랫폼"에서 Web 플랫폼 추가
4. 사이트 도메인: `http://localhost:3000`
5. "제품 설정" > "카카오 로그인" 활성화
6. Redirect URI: `http://localhost:3000/api/auth/callback/kakao`
7. REST API 키와 시크릿 키를 `.env.local`에 추가

## 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 마세요 (이미 .gitignore에 포함되어 있습니다)
- 프로덕션 환경에서는 실제 도메인으로 `NEXTAUTH_URL`을 변경하세요
- `NEXTAUTH_SECRET`은 반드시 강력한 랜덤 문자열로 설정하세요
