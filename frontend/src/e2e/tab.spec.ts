import test, { expect } from '@playwright/test';

test('체크리스트 생성 페이지에 들어가면 기본정보와 질문 탭들이 잘 렌더링된다.', async ({ page }) => {
  await page.goto('/');
  // await page.getByRole('button', { name: '방끗 둘러보기' }).click();
  await page.getByRole('button', { name: '전체 보기' }).click();
  await page.getByLabel('add').click();

  const tabs = page.locator('.tab');
  await expect(tabs).toHaveCount(7, { timeout: 3000 });

  await expect(tabs.nth(0)).toContainText('기본정보');
  await expect(tabs.nth(1)).toContainText('옵션');
  await expect(tabs.nth(2)).toContainText('방 컨디션');
  await expect(tabs.nth(3)).toContainText('창문');
  await expect(tabs.nth(4)).toContainText('화장실');
  await expect(tabs.nth(5)).toContainText('보안');
  await expect(tabs.nth(6)).toContainText('외부');
});

test('체크리스트 편집 페이지에 들어가면 기본정보와 질문 탭들이 잘 렌더링된다.', async ({ page }) => {
  await page.goto('/checklist/1');
  const checklistEditButton = page.locator('button[id="checklistEditButton"]');
  await checklistEditButton.click();

  await expect(page.getByText('체크리스트 편집')).toBeVisible();

  const tabs = page.locator('.tab');
  await expect(tabs).toHaveCount(7, { timeout: 3000 });

  await expect(tabs.nth(0)).toContainText('기본정보');
  await expect(tabs.nth(1)).toContainText('옵션');
  await expect(tabs.nth(2)).toContainText('방 컨디션');
  await expect(tabs.nth(3)).toContainText('창문');
  await expect(tabs.nth(4)).toContainText('화장실');
  await expect(tabs.nth(5)).toContainText('보안');
  await expect(tabs.nth(6)).toContainText('외부');
});
