import { Answer, AnswerType } from '@/types/answer';

export const ANSWER_PHRASE: Record<AnswerType | string, string> = {
  BAD: 'X',
  GOOD: 'O',
  NONE: '-',
};

export const ANSWER_OPTIONS: Answer[] = [
  { id: 1, name: 'GOOD' },
  { id: 2, name: 'BAD' },
];
