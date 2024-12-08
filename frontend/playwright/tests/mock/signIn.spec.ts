import { test } from '@playwright/test';

import { ROUTE_PATH } from '@/constants/routePath';

test('이메일을 통해 로그인을 할 수 있다.', async ({ page }) => {
  await page.goto(ROUTE_PATH.signIn);
  await page.getByText('비밀번호를 잊으셨나요?').click();
  await page.getByLabel('이메일').click();
  await page.getByLabel('이메일').fill('test@test.com');
  await page.getByRole('button', { name: '전송' }).click();
  await page.getByLabel('다음').click();
  await page.getByLabel('검증 코드').click();
  await page.getByLabel('검증 코드').fill('test@test.com');
  await page.getByRole('button', { name: '확인' }).click();
  await page.getByLabel('다음').click();
  await page.getByLabel('새 비밀번호', { exact: true }).click();
  await page.getByLabel('새 비밀번호', { exact: true }).fill('wagd12');
  await page.getByLabel('새 비밀번호', { exact: true }).press('Tab');
  await page.getByLabel('새 비밀번호 확인').fill('wagd12');
  await page.getByRole('button', { name: '확인' }).click();
});
