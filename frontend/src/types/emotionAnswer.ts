export type EmotionName = 'GOOD' | 'BAD' | 'SOSO';

export type EmotionNameWithNone = EmotionName | 'NONE';

export interface EmotionBase {
  id: number;
}
export interface Emotion extends EmotionBase {
  name: EmotionName;
}
export interface EmotionWithNone extends EmotionBase {
  name: EmotionWithNone;
}
