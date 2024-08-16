import { SVGProps } from 'react';

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

const AnswerColor: Record<AnswerType, { selected?: string; notSelected: string }> = {
  GOOD: {
    selected: theme.palette.green600,
    notSelected: theme.palette.grey300,
  },
  BAD: {
    selected: theme.palette.red500,
    notSelected: theme.palette.grey300,
  },
  NONE: {
    notSelected: theme.palette.grey300,
  },
};

const AnswerIcon = ({ answer, isSelected = false, ...rest }: Props) => {
  const color = isSelected ? AnswerColor[answer].selected : AnswerColor[answer].notSelected;

  if (answer === 'GOOD') {
    return <Good color={color} {...rest} />;
  }

  if (answer === 'BAD') {
    return <Bad color={color} {...rest} />;
  }
  return <None color={color} {...rest} />;
};
export default AnswerIcon;
