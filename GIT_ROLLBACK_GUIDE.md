# Git 특정 시점으로 되돌리기 가이드

## 📋 현재 커밋 히스토리

```
d9d6925 - Redis 연동중 및 방 시스템 기능 추가 (10분 전) [1107 브랜치]
ad85050 - dataset 문서 (5일 전)
dd12b31 - 1107 브랜치 코드 업로드 (5일 전)
6d1598e - first commit (6일 전) [현재 HEAD]
3984a82 - first commit (6일 전)
2686a5d - First commit from Cursor (9일 전)
```

## 🔄 되돌리기 방법

### 방법 1: 특정 커밋으로 완전히 되돌리기 (Hard Reset)

⚠️ **주의**: 현재 변경사항이 모두 사라집니다!

```bash
# 특정 커밋으로 되돌리기
git reset --hard <커밋해시>

# 예시: Redis 연동 커밋으로 되돌리기
git reset --hard d9d6925

# 예시: first commit으로 되돌리기
git reset --hard 6d1598e
```

### 방법 2: 특정 커밋으로 되돌리기 (Soft Reset)

✅ **안전**: 변경사항을 스테이징 영역에 유지

```bash
# 변경사항을 유지하면서 되돌리기
git reset --soft <커밋해시>
```

### 방법 3: 특정 커밋 상태 확인 후 되돌리기

✅ **가장 안전**: 먼저 확인 후 결정

```bash
# 1. 특정 커밋의 파일 목록 확인
git show --name-only <커밋해시>

# 2. 특정 커밋의 변경사항 확인
git show <커밋해시>

# 3. 특정 커밋으로 체크아웃 (임시로 확인)
git checkout <커밋해시>

# 4. 확인 후 되돌리기
git reset --hard <커밋해시>
```

### 방법 4: 특정 파일만 되돌리기

✅ **선택적 복원**: 특정 파일만 이전 상태로

```bash
# 특정 파일만 이전 커밋 상태로 복원
git checkout <커밋해시> -- <파일경로>

# 예시: package.json만 되돌리기
git checkout 6d1598e -- package.json
```

## 🎯 추천 방법

### 현재 변경사항을 저장하고 되돌리기

```bash
# 1. 현재 변경사항을 임시 저장
git stash

# 2. 특정 커밋으로 되돌리기
git reset --hard <커밋해시>

# 3. 필요시 저장한 변경사항 복원
git stash pop
```

### 특정 브랜치로 전환

```bash
# 1107 브랜치로 전환 (Redis 연동 포함)
git checkout 1107

# 또는 새 브랜치 생성하며 전환
git checkout -b restore-redis d9d6925
```

## 📝 현재 상태

현재 **6d1598e (first commit)** 위치에 있으며, 많은 파일이 변경되었습니다:

- `src/app/` → `app/` (폴더 이동)
- `prisma/` 폴더 삭제
- `.husky/` 폴더 삭제
- `package.json` 수정

## ⚠️ 주의사항

1. **Hard Reset은 되돌릴 수 없습니다** - 반드시 백업하거나 stash 사용
2. **원격 저장소에 푸시된 커밋은 신중하게 처리** - `git push --force` 필요할 수 있음
3. **협업 중이라면 팀원과 상의** 후 진행

## 🔍 유용한 명령어

```bash
# 변경사항 확인
git status

# 커밋 히스토리 상세 보기
git log --oneline --graph --all

# 특정 커밋의 변경사항 보기
git diff <커밋해시1> <커밋해시2>

# 현재 변경사항 임시 저장
git stash

# 저장된 변경사항 목록
git stash list

# 저장된 변경사항 복원
git stash pop
```
