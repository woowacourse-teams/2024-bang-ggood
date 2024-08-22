const formattedDate = (stringDate: string, splitter: string = '/') => {
  const date = new Date(stringDate);
  const nowDate = new Date();

  const dayDifference = Math.floor((nowDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  const hourDifference = Math.floor((nowDate.getTime() - date.getTime()) / (1000 * 60 * 60));
  const minuteDifference = Math.floor((nowDate.getTime() - date.getTime()) / (1000 * 60));

  if (minuteDifference < 1) return '방금 전';
  else if (hourDifference < 1) return `${minuteDifference}분 전`;
  else if (hourDifference < 24) return `${hourDifference}시간 전`;
  else if (dayDifference < 30) return `${dayDifference}일 전`;

  return date.toISOString().slice(2, 10).replace(/-/g, splitter);
};

export default formattedDate;
