import test, { expect } from '@playwright/test';

import { DefaultChecklistTabsNames } from './constants';

export const FirstCategoryQuestion = [
  { id: 0, question: '곰팡이가 핀 곳 없이 깨끗한가요?' },
  { id: 1, question: '창 밖의 뷰가 가로막힘 없이 트여있나요?' },
  { id: 2, question: '화장실이 깨끗한가요?' },
  { id: 3, question: '잠금장치가 있는 공동 현관문이 있나요?' },
];
test('체크리스트 생성 페이지에 들어가면 기본정보와 질문 탭들이 잘 렌더링된다.', async ({ page }) => {
  await page.goto('/checklist/new');
  const tabs = page.locator('.tab');
  await expect(tabs).toHaveCount(7, { timeout: 3000 });

  for (let i = 2; i < DefaultChecklistTabsNames.length; i++) {
    await expect(tabs.nth(i)).toContainText(DefaultChecklistTabsNames[i].name);
    await tabs.nth(i).click();
    const actualText = await page.locator('.question').nth(0).textContent();
    const expectedText = FirstCategoryQuestion[i - 2].question;

    expect(actualText).toBe(expectedText);
  }
});

test('체크리스트 편집 페이지에 들어가면 기본정보와 질문 탭들이 잘 렌더링된다.', async ({ page }) => {
  await page.goto('/checklist/1');
  const checklistEditButton = page.locator('button[id="checklistEditButton"]');
  await checklistEditButton.click();

  await expect(page.getByText('체크리스트 편집')).toBeVisible();

  const tabs = page.locator('.tab');
  await expect(tabs).toHaveCount(7, { timeout: 3000 });

  for (let i = 2; i < DefaultChecklistTabsNames.length; i++) {
    await expect(tabs.nth(i)).toContainText(DefaultChecklistTabsNames[i].name);
    await tabs.nth(i).click();
    const actualText = await page.locator('.question').nth(0).textContent();
    const expectedText = FirstCategoryQuestion[i - 2].question;

    expect(actualText).toBe(expectedText);
  }
});
