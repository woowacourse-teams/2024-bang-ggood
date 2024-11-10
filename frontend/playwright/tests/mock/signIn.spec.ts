import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/sign-in');
  await page.getByText('비밀번호를 잊으셨나요?').click();
  await page.getByLabel('이메일').click();
  await page.getByLabel('이메일').fill('test@test.com');
  await page.getByRole('button', { name: '전송' }).click();
  await page.getByLabel('다음').click();
  await page.getByLabel('검증 코드').click();
  await page.getByLabel('검증 코드').fill('test@test.com');
  await page.getByRole('button', { name: '전송' }).click();
  await page.getByLabel('다음').click();
  await page.getByLabel('새 비밀번호', { exact: true }).click();
  await page.getByLabel('새 비밀번호', { exact: true }).fill('wagd12');
  await page.getByLabel('새 비밀번호', { exact: true }).press('Tab');
  await page.getByLabel('새 비밀번호 확인').fill('wagd12');
  await page.getByLabel('다음').click();
});
