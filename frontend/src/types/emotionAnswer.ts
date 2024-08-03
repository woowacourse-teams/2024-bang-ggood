export type EmotionName = 'GOOD' | 'BAD' | 'SOSO';
export type EmotionNameWithNull = EmotionName | null;

export interface EmotionWithNull {
  name: EmotionNameWithNull;
  id: number;
}
export interface Emotion {
  name: EmotionName;
  id: number;
}
