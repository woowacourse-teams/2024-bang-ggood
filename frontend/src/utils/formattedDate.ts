const formattedDate = (stringDate: string) => {
  const date = new Date(stringDate);
  const nowDate = new Date();
  const timeDifference = Math.floor((nowDate.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (timeDifference < 24) return `${timeDifference}시간 전`;
  return date.toISOString().slice(2, 10).replace(/-/g, '/');
};

export default formattedDate;
