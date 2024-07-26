const calcEmotions = (score: number) => {
  if (score >= 65) return 'GOOD';
  if (score <= 35) return 'BAD';
  return 'SOSO';
};

export default calcEmotions;
