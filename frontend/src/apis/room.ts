import fetcher from '@/apis/fetcher';
import { BASE_URL, ENDPOINT } from '@/apis/url';

export const getRoomCompare = async (roomId1: number, roomId2: number) => {
  const response = await fetcher.get({ url: BASE_URL + ENDPOINT.CHECKLIST_COMPARE(roomId1, roomId2) });
  const data = await response.json();
  return data.checklists;
};
