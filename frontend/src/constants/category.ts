import homeUrl from '@/assets/image/home.png';
import outdoorUrl from '@/assets/image/outdoor.png';
import securityUrl from '@/assets/image/security.png';
import toiletUrl from '@/assets/image/toilet.png';
import windowUrl from '@/assets/image/window.png';

export const CATEGORY_COUNT = 7;

export const CATEGORY_WITH_EMOJI = [
  {
    name: '방 컨디션',
    imgUrl: homeUrl,
  },
  {
    name: '창문',
    imgUrl: windowUrl,
  },
  {
    name: '화장실',
    imgUrl: toiletUrl,
  },
  {
    name: '보안',
    imgUrl: securityUrl,
  },
  {
    name: '외부',
    imgUrl: outdoorUrl,
  },
];

export const findCategoryEmojiByName = (targetName: string) => {
  return CATEGORY_WITH_EMOJI.find(e => e.name === targetName)?.imgUrl;
};
