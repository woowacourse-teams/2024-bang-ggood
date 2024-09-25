import homeImgUrl from '../../public/image/home.png';
import outdoorImgUrl from '../../public/image/outdoor.png';
import securityImgUrl from '../../public/image/security.png';
import toiletImgUrl from '../../public/image/toilet.png';
import windowImgUrl from '../../public/image/window.png';

export const CATEGORY_COUNT = 7;

export const CATEGORY_WITH_EMOJI = [
  {
    name: '방 컨디션',
    imgUrl: homeImgUrl,
  },
  {
    name: '창문',
    imgUrl: windowImgUrl,
  },
  {
    name: '화장실',
    imgUrl: toiletImgUrl,
  },
  {
    name: '보안',
    imgUrl: securityImgUrl,
  },
  {
    name: '외부',
    imgUrl: outdoorImgUrl,
  },
];

export const findCategoryEmojiByName = (targetName: string) => {
  return CATEGORY_WITH_EMOJI.find(e => e.name === targetName)?.imgUrl;
};
