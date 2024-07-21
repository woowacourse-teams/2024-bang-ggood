import { SVGProps } from 'react';

import {
  FaceIconBad,
  FaceIconBadGray,
  FaceIconGood,
  FaceIconGoodGray,
  FaceIconSoso,
  FaceIconSosoGray,
} from '@/assets/assets';

interface FaceIconProps extends SVGProps<SVGSVGElement> {
  emotion: 'good' | 'bad' | 'soso';
  isFilled?: boolean;
}
const FaceIcon = ({ emotion, isFilled = false, ...rest }: FaceIconProps) => {
  return (
    <>
      {emotion === 'good' && isFilled && <FaceIconGood {...rest} />}
      {emotion === 'good' && !isFilled && <FaceIconGoodGray {...rest} />}
      {emotion === 'soso' && isFilled && <FaceIconSoso {...rest} />}
      {emotion === 'soso' && !isFilled && <FaceIconSosoGray {...rest} />}
      {emotion === 'bad' && isFilled && <FaceIconBad {...rest} />}
      {emotion === 'bad' && !isFilled && <FaceIconBadGray {...rest} />}
      {emotion === null && <FaceIconSosoGray {...rest} />}
    </>
  );
};
export default FaceIcon;
