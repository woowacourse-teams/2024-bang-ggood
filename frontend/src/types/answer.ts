export type AnswerType = 'GOOD' | 'BAD' | 'NONE';

export interface Answer {
  id: number;
  name: AnswerType;
}
