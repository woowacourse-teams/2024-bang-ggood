import { Emotion, EmotionType } from '@/types/emotionAnswer';

export const EMOTION_PHARSE: Record<EmotionType | string, string> = {
  BAD: '별로에요',
  SOSO: '평범해요',
  GOOD: '좋아요',
  null: '-',
};

export const EMOTIONS: Emotion[] = [
  { name: 'BAD', id: 1 },
  { name: 'SOSO', id: 2 },
  { name: 'GOOD', id: 3 },
];
