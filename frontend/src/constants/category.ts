export const CATEGORY_COUNT = 7;

export const CATEGORY_WITH_EMOJI = [
  {
    name: '방 컨디션',
    imgUrl: '/image/home.png',
  },
  {
    name: '창문',
    imgUrl: '/image/window.png',
  },
  {
    name: '화장실',
    imgUrl: '/image/toilet.png',
  },
  {
    name: '보안',
    imgUrl: '/image/security.png',
  },
  {
    name: '외부',
    imgUrl: '/image/outdoor.png',
  },
];

export const findCategoryEmojiByName = (targetName: string) => {
  return CATEGORY_WITH_EMOJI.find(e => e.name === targetName)?.imgUrl;
};
