import {
  FaceIconBad,
  FaceIconBadGray,
  FaceIconGood,
  FaceIconGoodGray,
  FaceIconSoso,
  FaceIconSosoGray,
} from '@/assets/assets';

interface FaceIconProps extends React.HTMLAttributes<HTMLDivElement> {
  emotion: 'good' | 'bad' | 'soso';
  fill?: boolean;
}

const FaceIcon = ({ emotion, fill = false, ...rest }: FaceIconProps) => {
  return (
    <>
      {emotion === 'good' && fill && <FaceIconGood {...rest} />}
      {emotion === 'good' && !fill && <FaceIconGoodGray {...rest} />}
      {emotion === 'soso' && fill && <FaceIconSoso {...rest} />}
      {emotion === 'soso' && !fill && <FaceIconSosoGray {...rest} />}
      {emotion === 'bad' && fill && <FaceIconBad {...rest} />}
      {emotion === 'bad' && !fill && <FaceIconBadGray {...rest} />}
      {emotion === null && <FaceIconSosoGray {...rest} />}
    </>
  );
};

export default FaceIcon;
