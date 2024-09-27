const SUBWAY_LINE_PALLETE = {
  /*숫자 호선 : 실선*/
  '1호선': '#0B3F8C',
  '2호선': '#00A046',
  '3호선': '#EE6901',
  '4호선': '#009CD1',
  '5호선': '#764799',
  '6호선': '#72391D',
  '7호선': '#696E30',
  '8호선': '#D72571',
  '9호선': '#A49E86',
  /*이중선 호선*/
  경의중앙선: '#60C3AD',
  신분당선: '#C22C31',
  수인분당선: '#E0A510',
  공항철도: '#00618E',
  인천1호선: '#85B0E0',
  /*가는 실선 호선*/
  의정부경전철: '#DF6F0B',
  우이신설선: '#BBCA0F',
  김포골드라인: '#90742B',
  인천2호선: '#F1A769',
  용인에버라인: '#70B531',
  신림선: '#6A75B3',
  /*파선 호선*/
  경춘선: '#03634C',
  경강선: '#1C2B55',
  서해선: '#21AC41',
  GTX: '#212177',
};

export type SubwayLineName = keyof typeof SUBWAY_LINE_PALLETE;

export const SUBWAY_LINE_NAMES = Object.keys(SUBWAY_LINE_PALLETE) as SubwayLineName[];

export default SUBWAY_LINE_PALLETE;
