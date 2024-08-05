export type EmotionType = 'GOOD' | 'BAD' | 'SOSO';

export type EmotionTypeWithNull = EmotionType | null;

export interface Emotion {
  name: EmotionType;
  id: number;
}
