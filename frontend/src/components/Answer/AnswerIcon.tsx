import { SVGProps } from 'react';

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
    return (
      <svg {...rest} width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14.5" cy="14.5" r="12" stroke={color} strokeWidth="5" />
      </svg>
    );
  }

  if (answer === 'BAD') {
    return (
      <svg {...rest} width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.5 10.6495L4.41601 1.19969L4.41595 1.19964C3.98849 0.755098 3.40445 0.501547 2.79113 0.501547C2.17782 0.501547 1.59377 0.755098 1.16631 1.19964C0.73948 1.64351 0.502975 2.2415 0.502975 2.86112C0.502975 3.48071 0.73946 4.07867 1.16625 4.52254C1.16627 4.52256 1.16629 4.52258 1.16631 4.5226L10.2775 14.0007L1.16339 23.4758L1.16333 23.4759C0.736505 23.9197 0.5 24.5177 0.5 25.1373C0.5 25.757 0.736506 26.3549 1.16333 26.7988C1.5908 27.2434 2.17484 27.4969 2.78816 27.4969C3.40144 27.4969 3.98546 27.2434 4.41292 26.7989C4.41294 26.7989 4.41296 26.7988 4.41298 26.7988L13.4999 17.352L22.584 26.8019L22.584 26.8019C23.0115 27.2464 23.5956 27.5 24.2089 27.5C24.8222 27.5 25.4062 27.2464 25.8337 26.8019C26.2605 26.358 26.497 25.76 26.497 25.1404C26.497 24.5208 26.2605 23.9228 25.8337 23.4789L16.7224 14.0008L25.8367 4.52105C26.2635 4.07718 26.5 3.47919 26.5 2.85957C26.5 2.23995 26.2635 1.64196 25.8367 1.19809C25.4092 0.75355 24.8252 0.5 24.2118 0.5C23.5985 0.5 23.0145 0.75355 22.587 1.19809L22.587 1.19812L13.5 10.6495Z"
          fill={color}
          stroke={color}
        />
      </svg>
    );
  }

  return (
    <svg {...rest} width="28" height="5" viewBox="0 0 28 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="2.5" y1="2.5" x2="25.5" y2="2.5" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
};
export default AnswerIcon;
