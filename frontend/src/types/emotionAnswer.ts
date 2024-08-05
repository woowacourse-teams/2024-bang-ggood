export type EmotionName = 'GOOD' | 'BAD' | 'SOSO';

export type EmotionNameWithNone = EmotionName | 'NONE';

export interface Emotion {
  name: EmotionName;
  id: number;
}
