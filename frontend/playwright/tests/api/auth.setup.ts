import { test as setup } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../../../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const username = process.env.EMAIL || '';
  const password = process.env.PASSWORD || '';

  await page.goto('/sign-in');
  await page.locator('input[name="email"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: '로그인 하기' }).click();
  await page.waitForURL('/home');
  await page.context().storageState({ path: authFile });
});
