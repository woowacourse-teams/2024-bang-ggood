export const CATEGORY_COUNT = 7;

export const CATEGORY_WITH_EMOJI = [
  {
    name: '방 컨디션',
    className: 'sprite-home',
  },
  {
    name: '창문',
    className: 'sprite-window',
  },
  {
    name: '화장실',
    className: 'sprite-toilet',
  },
  {
    name: '보안',
    className: 'sprite-security',
  },
  {
    name: '외부',
    className: 'sprite-outdoor',
  },
];

export const findCategoryClassNameByName = (targetName: string) => {
  return CATEGORY_WITH_EMOJI.find(e => e.name === targetName)?.className;
};
