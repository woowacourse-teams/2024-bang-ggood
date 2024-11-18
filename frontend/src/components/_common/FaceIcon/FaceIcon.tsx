import { SVGProps } from 'react';

import { FaceBadIcon, FaceGoodIcon, FaceNoneIcon, FaceSosoIcon } from '@/assets/assets';

type EmotionNameWithNone = 'GOOD' | 'SOSO' | 'BAD' | 'NONE';

interface FaceIconProps extends SVGProps<SVGSVGElement> {
  emotion: EmotionNameWithNone;
  isFilled?: boolean;
}

const FaceIcon = ({ emotion, ...rest }: FaceIconProps) => {
  return (
    <>
      {emotion === 'GOOD' && <FaceGoodIcon {...rest} />}
      {emotion === 'SOSO' && <FaceSosoIcon {...rest} />}
      {emotion === 'BAD' && <FaceBadIcon {...rest} />}
      {emotion === 'NONE' && <FaceNoneIcon {...rest} />}
    </>
  );
};

export default FaceIcon;
