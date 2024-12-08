/*두 개의 지점의 거리를 재는 로직*/
/* RoomCompareMap에서 사용 */
export const getDistanceFromLatLonInKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

/* 거리에 따른 적절한 지도 level 설정 */
export const getMapLevel = (distance: number) => {
  if (distance < 0.5) return 3;
  if (distance < 0.7) return 4;
  if (distance < 1) return 5;
  if (distance < 3) return 6;
  if (distance < 5) return 7;
  if (distance < 12) return 9;
  return 10;
};
