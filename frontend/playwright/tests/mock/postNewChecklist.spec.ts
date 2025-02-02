import { test } from '@playwright/test';

import { ROUTE_PATH } from '@/constants/routePath';

test('빈 체크리스트를 제출할 수 있다.', async ({ page }) => {
  await page.goto(ROUTE_PATH.checklistNew);
  await page.getByRole('button', { name: '저장' }).click();
  await page.getByRole('button', { name: '체크리스트 저장하기' }).click();
  await page.waitForURL(`/checklist/*`);
});
