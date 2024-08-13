const formattedDate = (stringDate: string, splitter: string = '/') => {
  const date = new Date(stringDate);
  const nowDate = new Date();
  const timeDifference = Math.floor((nowDate.getTime() - date.getTime()) / (1000 * 60 * 60));
  const minuteDifference = Math.floor((nowDate.getTime() - date.getTime()) / (1000 * 60));

  if (timeDifference < 1) return `${minuteDifference}분 전`;
  else if (timeDifference < 24) return `${timeDifference}시간 전`;
  return date.toISOString().slice(2, 10).replace(/-/g, splitter);
};

export default formattedDate;
