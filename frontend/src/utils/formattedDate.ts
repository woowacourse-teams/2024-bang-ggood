const formattedDate = (stringDate: string) => {
  const date = new Date(stringDate);
  return date.toISOString().slice(2, 10).replace(/-/g, '/');
};

export default formattedDate;
