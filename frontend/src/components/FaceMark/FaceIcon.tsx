import { FaceIconBad, FaceIconBadGray, FaceIconGoodGray, FaceIconSoso, FaceIconSosoGray } from '@/assets/assets';

interface FaceIconProps {
  emotion: 'good' | 'bad' | 'normal';
  fill: boolean;
}

const FaceIcon = ({ emotion, fill }: FaceIconProps) => {
  return (
    <>
      {emotion === 'good' && fill && <FaceIconBad />}
      {emotion === 'good' && !fill && <FaceIconGoodGray />}
      {emotion === 'normal' && fill && <FaceIconSoso />}
      {emotion === 'normal' && !fill && <FaceIconSosoGray />}
      {emotion === 'bad' && fill && <FaceIconBad />}
      {emotion === 'bad' && !fill && <FaceIconBadGray />}
    </>
  );
};

export default FaceIcon;
