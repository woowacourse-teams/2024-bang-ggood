import test, { expect } from '@playwright/test';

import {
  DefaultChecklistTabsNames,
  DefaultQuestionSelectTabsNames,
  FirstAllCategoryQuestion,
  FirstCategoryQuestion,
} from './constants';

test('체크리스트 생성 페이지에 들어가면 기본정보와 질문 탭들이 잘 렌더링된다.', async ({ page }) => {
  await page.goto('/checklist/new');
  const tabs = page.locator('.tab');
  await expect(tabs).toHaveCount(6, { timeout: 3000 });

  for (let i = 2; i < DefaultChecklistTabsNames.length; i++) {
    await expect(tabs.nth(i)).toContainText(DefaultChecklistTabsNames[i].name);
    await tabs.nth(i).click();
    const actualText = await page.locator('.question').nth(0).textContent();
    const expectedText = FirstCategoryQuestion[i - 2].question;

    expect(actualText).toBe(expectedText);
  }
});

test('체크리스트 질문 선택 페이지에 들어가면 기본정보와 질문 탭들이 잘 렌더링된다.', async ({ page }) => {
  await page.goto('/checklist/question-select');
  const tabs = page.locator('.tab');
  await expect(tabs).toHaveCount(5, { timeout: 3000 });

  for (let i = 0; i < DefaultQuestionSelectTabsNames.length; i++) {
    await expect(tabs.nth(i)).toContainText(DefaultQuestionSelectTabsNames[i].name);
    await tabs.nth(i).click();
    const actualText = await page.locator('.question').nth(0).textContent();
    const expectedText = FirstAllCategoryQuestion[i].question;
    expect(actualText).toContain(expectedText);
  }
});

test.skip('체크리스트 편집 페이지에 들어가면 기본정보와 질문 탭들이 잘 렌더링된다.', async ({ page }) => {
  await page.goto('/checklist/1');
  const checklistEditButton = page.locator('button[id="checklistEditButton"]');
  await checklistEditButton.click();

  await expect(page.getByText('체크리스트 편집')).toBeVisible();

  const tabs = page.locator('.tab');
  await expect(tabs).toHaveCount(6, { timeout: 3000 });

  for (let i = 2; i < DefaultChecklistTabsNames.length; i++) {
    await expect(tabs.nth(i)).toContainText(DefaultChecklistTabsNames[i].name);
    await tabs.nth(i).click();
    const actualText = await page.locator('.question').nth(0).textContent();
    const expectedText = FirstCategoryQuestion[i - 2].question;

    expect(actualText).toBe(expectedText);
  }
});
