const calcEmotions = (score: number) => {
  if (score >= 7) return 'good';
  if (score <= 3) return 'bad';
  return 'soso';
};

export default calcEmotions;
