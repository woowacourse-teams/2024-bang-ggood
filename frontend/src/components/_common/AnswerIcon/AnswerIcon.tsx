import { AnswerType } from '@/types/answer';

const AnswerIcon = (type: AnswerType) => {
  if (type === 'GOOD') {
    return (
      <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14.5" cy="14.5" r="12" stroke="#C7C7C7" strokeWidth="5" />
      </svg>
    );
  }
  return <div>AnswerIcon</div>;
};

export default AnswerIcon;
