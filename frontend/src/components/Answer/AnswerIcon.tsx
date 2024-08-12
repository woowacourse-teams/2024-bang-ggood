import { SVGProps } from 'react';

import { No, NoGrey, None, Yes, YesGrey } from '@/assets/assets';
import { AnswerType } from '@/types/answer';

interface Props extends SVGProps<SVGSVGElement> {
  answer: AnswerType;
  isSelected?: boolean;
}

const AnswerIcon = ({ answer, isSelected = false, ...rest }: Props) => {
  return (
    <>
      {answer === 'GOOD' && isSelected && <Yes {...rest} />}
      {answer === 'GOOD' && !isSelected && <YesGrey {...rest} />}
      {answer === 'BAD' && isSelected && <No {...rest} />}
      {answer === 'BAD' && !isSelected && <NoGrey {...rest} />}
      {answer === 'NONE' && <None {...rest} />}
    </>
  );
};
export default AnswerIcon;
