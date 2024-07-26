const calcEmotions = (score: number) => {
  if (score >= 70) return 'GOOD';
  if (score <= 30) return 'BAD';
  return 'SOSO';
};

export default calcEmotions;
