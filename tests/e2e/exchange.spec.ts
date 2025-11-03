import { test, expect } from '@playwright/test'

test.describe('교환존', () => {
  test('교환존 페이지가 정상적으로 로드된다', async ({ page }) => {
    await page.goto('/exchange')
    
    await expect(page.getByRole('heading', { name: '교환존' })).toBeVisible()
    await expect(page.getByText('책을 등록하고, 찾고, 교환해보세요')).toBeVisible()
  })

  test('탭 네비게이션이 작동한다', async ({ page }) => {
    await page.goto('/exchange')
    
    // 등록 탭
    await expect(page.getByRole('tab', { name: '책 등록' })).toBeVisible()
    await expect(page.getByRole('tab', { name: '검색 & 추천' })).toBeVisible()
    await expect(page.getByRole('tab', { name: '진행 현황' })).toBeVisible()
    
    // 검색 탭 클릭
    await page.getByRole('tab', { name: '검색 & 추천' }).click()
    await expect(page.getByText('검색 및 필터')).toBeVisible()
  })

  test('책 등록 폼이 표시된다', async ({ page }) => {
    await page.goto('/exchange')
    
    await expect(page.getByText('새로운 책 등록하기')).toBeVisible()
    await expect(page.getByLabel('제목')).toBeVisible()
    await expect(page.getByLabel('저자')).toBeVisible()
  })
})
