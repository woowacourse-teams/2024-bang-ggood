import { test } from '@playwright/test';

test('빈 체크리스트를 제출할 수 있다.', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: '방끗 둘러보기' }).click();
  await page.getByRole('button', { name: '전체 보기' }).click();
  await page.getByLabel('add').click();
  await page.getByRole('button', { name: '저장' }).click();
  await page.getByRole('button', { name: '체크리스트 저장하기' }).click();
});
