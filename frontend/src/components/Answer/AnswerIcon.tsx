import { SVGProps } from 'react';

import { NO, NOGREY, NONE, YES, YESGREY } from '@/assets/assets';
import { AnswerType } from '@/types/answer';

interface Props extends SVGProps<SVGSVGElement> {
  answer: AnswerType;
  isSelected?: boolean;
}

const AnswerIcon = ({ answer, isSelected = false, ...rest }: Props) => {
  return (
    <>
      {answer === 'GOOD' && isSelected && <YES {...rest} />}
      {answer === 'GOOD' && !isSelected && <YESGREY {...rest} />}
      {answer === 'BAD' && isSelected && <NO {...rest} />}
      {answer === 'BAD' && !isSelected && <NOGREY {...rest} />}
      {answer === 'NONE' && <NONE {...rest} />}
    </>
  );
};
export default AnswerIcon;
