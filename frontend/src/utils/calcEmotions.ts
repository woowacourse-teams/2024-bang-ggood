const calcEmotions = (score: number) => {
  if (score >= 7) return 'GOOD';
  if (score <= 3) return 'BAD';
  return 'SOSO';
};

export default calcEmotions;
