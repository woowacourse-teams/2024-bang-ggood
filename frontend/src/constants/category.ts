import homeUrl from '/public/image/home.png';
import outdoorUrl from '/public/image/outdoor.png';
import securityUrl from '/public/image/security.png';
import toiletUrl from '/public/image/toilet.png';
import windowUrl from '/public/image/window.png';

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
