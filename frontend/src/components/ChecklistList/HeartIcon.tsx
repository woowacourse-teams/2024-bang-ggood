import { SVGProps } from 'react';

import { Heart, HeartEmpty } from '@/assets/assets';

interface Props extends SVGProps<SVGSVGElement> {
  isSelected?: boolean;
}

const HeartIcon = ({ isSelected = false, ...rest }: Props) => {
  return (
    <>
      {isSelected && <Heart {...rest} />}
      {!isSelected && <HeartEmpty {...rest} />}
    </>
  );
};

export default HeartIcon;
