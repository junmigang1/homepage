# 책책 - 교환독서 플랫폼

> "책은 떠돌며 새로운 이야기를 만납니다"

교환독서로 책의 여정을 함께하고, 새로운 독자들과 소통하는 플랫폼입니다.

## 🚀 주요 기능

### 📚 교환독서
- **책 등록**: 내가 읽은 책을 다른 독자들과 교환할 수 있도록 등록
- **책 검색**: 장르, 상태, 학교별로 책을 검색하고 필터링
- **교환 진행**: 실시간으로 교환 상태를 추적하고 관리

### 🗺️ 여정 추적
- **여정 지도**: 책이 이동한 경로를 지도로 시각화
- **타임라인**: 각 독자의 감상과 흔적을 시간순으로 기록
- **뱃지 시스템**: 다양한 독서 활동에 대한 성취 뱃지

### 👥 커뮤니티
- **리뷰 & 피드**: 책에 대한 감상을 공유하고 소통
- **챌린지**: 독서 목표 달성을 위한 다양한 챌린지 참여
- **인기 리뷰**: 우수한 리뷰와 활발한 독자들을 확인

### 👤 마이페이지
- **프로필 관리**: 개인 정보와 독서 통계 확인
- **나의 여정**: 내가 보낸/받은 책의 여정 지도
- **독서 분석**: 장르별 독서 패턴과 통계 분석

## 🛠️ 기술 스택

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **UI Components**: shadcn/ui, Radix UI
- **State Management**: Zustand
- **Database**: Prisma + SQLite (개발) / PlanetScale (프로덕션)
- **Styling**: TailwindCSS + class-variance-authority
- **Icons**: Lucide React
- **Testing**: Vitest (유닛), Playwright (E2E)
- **Deployment**: Vercel

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/book-exchange-platform.git
cd book-exchange-platform
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
```bash
cp .env.example .env.local
```

`.env.local` 파일을 열어 필요한 환경 변수를 설정하세요:

```env
# Database
DATABASE_URL="file:./dev.db"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth (개발용)
KAKAO_CLIENT_ID="your-kakao-client-id"
KAKAO_CLIENT_SECRET="your-kakao-client-secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. 데이터베이스 설정
```bash
# Prisma 클라이언트 생성
npx prisma generate

# 데이터베이스 마이그레이션
npx prisma migrate dev --name init

# 시드 데이터 생성
npx prisma db seed
```

### 5. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🧪 테스트

### 유닛 테스트
```bash
npm run test
```

### E2E 테스트
```bash
npm run test:e2e
```

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # 마케팅 페이지
│   ├── exchange/          # 교환존 페이지
│   ├── journey/           # 여정 페이지
│   ├── community/         # 커뮤니티 페이지
│   ├── me/               # 마이페이지
│   └── api/              # API 라우트
├── components/            # React 컴포넌트
│   ├── ui/               # 기본 UI 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── home/             # 홈페이지 컴포넌트
│   ├── exchange/         # 교환존 컴포넌트
│   ├── journey/          # 여정 컴포넌트
│   ├── community/        # 커뮤니티 컴포넌트
│   └── me/               # 마이페이지 컴포넌트
├── lib/                  # 유틸리티 함수
├── store/                # Zustand 스토어
├── types/                # TypeScript 타입 정의
└── hooks/                # 커스텀 훅
```

## 🎨 디자인 시스템

### 컬러 팔레트
- **배경**: `#F5F1E8` (크림색)
- **메인**: `#4A7043` (그린)
- **포인트**: `#FF8C42` (오렌지)
- **보조**: `#E5D3B3` (베이지)

### 타이포그래피
- **헤드라인**: Pretendard
- **본문**: Noto Sans KR

### 간격 시스템
- 8px 베이스 그리드 시스템

## 🚀 배포

### Vercel 배포

1. **Vercel 계정 생성**
   - [Vercel](https://vercel.com)에서 계정 생성

2. **프로젝트 연결**
   ```bash
   npm i -g vercel
   vercel
   ```

3. **환경 변수 설정**
   - Vercel 대시보드에서 환경 변수 설정
   - 프로덕션 데이터베이스 URL 설정

4. **자동 배포**
   - GitHub 저장소와 연결하면 자동 배포

### 데이터베이스 마이그레이션

프로덕션 환경에서는 PlanetScale 또는 Neon을 사용하는 것을 권장합니다:

```bash
# 프로덕션 데이터베이스 URL 설정
DATABASE_URL="postgresql://username:password@host:port/database"

# 마이그레이션 실행
npx prisma migrate deploy
```

## 📱 모바일 지원

- **모바일 우선 설계**: 모바일 화면을 우선으로 한 반응형 디자인
- **하단 탭바**: 모바일에서 쉬운 네비게이션
- **터치 최적화**: 터치 인터페이스에 최적화된 UI/UX

## ♿ 접근성

- **ARIA 라벨**: 모든 인터랙티브 요소에 적절한 라벨 제공
- **키보드 네비게이션**: 키보드만으로 모든 기능 사용 가능
- **색상 대비**: WCAG 2.1 AA 기준 준수
- **스크린 리더**: 스크린 리더 지원

## 🔧 개발 가이드

### 커밋 컨벤션
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가
chore: 빌드 설정 변경
```

### 브랜치 전략
- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발 브랜치
- `hotfix/*`: 긴급 수정 브랜치

## 📄 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

- **이메일**: contact@bookbook.com
- **GitHub Issues**: [Issues](https://github.com/your-username/book-exchange-platform/issues)

---

**책책**과 함께 책의 새로운 여정을 시작해보세요! 📚✨
