import { test, expect } from '@playwright/test'

test.describe('홈페이지', () => {
  test('홈페이지가 정상적으로 로드된다', async ({ page }) => {
    await page.goto('/')
    
    // 헤더 확인
    await expect(page.getByRole('heading', { name: '책책' })).toBeVisible()
    
    // 네비게이션 확인
    await expect(page.getByRole('link', { name: '홈' })).toBeVisible()
    await expect(page.getByRole('link', { name: '교환' })).toBeVisible()
    await expect(page.getByRole('link', { name: '여정' })).toBeVisible()
    await expect(page.getByRole('link', { name: '커뮤니티' })).toBeVisible()
    await expect(page.getByRole('link', { name: '마이' })).toBeVisible()
  })

  test('Hero 섹션이 표시된다', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.getByText('책은 떠돌며')).toBeVisible()
    await expect(page.getByText('새로운 이야기를 만납니다')).toBeVisible()
    await expect(page.getByRole('button', { name: '내 책 여정 시작하기' })).toBeVisible()
  })

  test('실시간 여정 피드가 표시된다', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.getByText('지금 이 순간, 책들이 떠돌고 있어요')).toBeVisible()
  })

  test('추천 교환 도서가 표시된다', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.getByText('이번 주 추천 도서')).toBeVisible()
  })
})

test.describe('모바일 반응형', () => {
  test('모바일에서 하단 탭바가 표시된다', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // 모바일 탭바 확인
    await expect(page.locator('[data-testid="mobile-tab-bar"]')).toBeVisible()
  })
})
