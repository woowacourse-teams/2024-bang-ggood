import { test } from '@playwright/test';

import { ROUTE_PATH } from '@/constants/routePath';

test('빈 체크리스트를 제출할 수 있다.', async ({ page }) => {
  await page.goto(ROUTE_PATH.checklistNew);
  await page.getByRole('button', { name: '저장' }).click();
  await page.getByRole('button', { name: '체크리스트 저장하기' }).click();
});

test('체크리스트가 잘 작성된다.', async ({ page }) => {
  await page.goto('/');
  // await page.getByRole('button', { name: '방끗 둘러보기' }).click();
  await page.getByRole('button', { name: '전체 보기' }).click();
  await page.getByLabel('add').click();

  const tabs = page.locator('.tab');
  const roomInfoTab = tabs.nth(0);

  await roomInfoTab.click();

  await page.getByLabel('방 이름').fill('테스트 방');

  await page.getByLabel('보증금').fill('1000');
  await page.getByLabel('월세').fill('50');
  await page.getByLabel('관리비').fill('10');

  //관리비 포함 항목
  await page.getByRole('button', { name: '수도' }).click();
  await page.getByRole('button', { name: '인터넷' }).click();

  await page.evaluate(() => window.scrollBy(0, 1000));

  //층수
  await page.locator('input[name="floor"]').fill('5');

  // 방 구조
  await page.locator('button[name="분리형 원룸"]').click();
  await page.locator('button[name="오픈형 원룸"]').click();

  await page.getByText('부동산 이름').scrollIntoViewIfNeeded();

  //방 크기
  await page.locator('input[name="size"]').fill('5');
  //계약 기간
  await page.locator('input[name="contractTerm"]').fill('12');

  //입주 가능일
  await page.locator('input[name="occupancyMonth"]').fill('10');
  await page.locator('div[id="occupancyPeriod"]').click();
  await page.locator('li[id="말"]').click();

  //부동산
  await page.locator('input[name="realEstate"]').fill('방끗 부동산');

  //옵션 탭 클릭
  const optionTab = tabs.nth(1);
  optionTab.click();

  await page.locator('button[id="refrigerator"]').click();
  await page.locator('button[id="sink"]').click();

  //질문 탭(방 컨디션)
  const categoryTab1 = tabs.nth(2);
  categoryTab1.click();
  await page.getByLabel('좋아요 버튼').nth(0).click();
  await page.getByLabel('좋아요 버튼').nth(1).click();

  //질문 탭(방 컨디션)
  const categoryTab2 = tabs.nth(3);
  categoryTab2.click();
  await page.getByLabel('싫어요 버튼').nth(2).click();
  await page.getByLabel('좋아요 버튼').nth(2).click();

  //저장
  await page.getByRole('button', { name: '저장' }).click();
  await page.getByRole('button', { name: '체크리스트 저장하기' }).click();

  //TODO: 이후 일반 로그인이 되면 저장되는 것도 확인
  //디테일 페이지 이동
  // await expect(page).toHaveURL(/\/detail\/\d+/);
});
