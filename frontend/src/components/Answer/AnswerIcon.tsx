import React, { SVGProps } from 'react';

import Bad from '@/assets/icons/answer/bad';
import Good from '@/assets/icons/answer/good';
import None from '@/assets/icons/answer/none';
import theme from '@/styles/theme';
import { AnswerType } from '@/types/answer';

interface Props extends SVGProps<SVGSVGElement> {
  answer: AnswerType;
  isSelected?: boolean;
  color?: string;
}

const AnswerColor: Record<AnswerType, { selected: string; notSelected?: string }> = {
  GOOD: {
    selected: theme.color.secondary[500],
    notSelected: theme.color.gray[400],
  },
  BAD: {
    selected: theme.color.red[300],
    notSelected: theme.color.gray[400],
  },
  NONE: {
    selected: theme.color.gray[400],
    notSelected: theme.color.gray[400],
  },
};

const AnswerIcon = ({ answer, isSelected = false, ...rest }: Props) => {
  const color = isSelected ? AnswerColor[answer].selected : AnswerColor[answer].notSelected;

  return (
    <>
      {answer === 'GOOD' && <Good style={{ cursor: 'pointer' }} color={color} {...rest} />}
      {answer === 'BAD' && <Bad style={{ cursor: 'pointer' }} color={color} {...rest} />}
      {answer === 'NONE' && <None style={{ cursor: 'pointer' }} color={color} {...rest} />}
    </>
  );
};

export default React.memo(AnswerIcon);
