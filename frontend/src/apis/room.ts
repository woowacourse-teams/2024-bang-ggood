import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';

export const getRoomCompare = async (roomId1: number, roomId2: number) => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.ROOM_COMPARE(roomId1, roomId2) });
  const data = await response.json();
  return data.checklists;
};

export const getRoomCategoryDetail = async ({ roomId, categoryId }: { roomId: number; categoryId: number }) => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.ROOM_CATEGORY_DETAIL(roomId, categoryId) });
  const data = await response.json();
  return data;
};
