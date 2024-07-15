import { useState } from 'react';

import FaceIcon from '@/components/FaceMark/FaceIcon';

interface FaceIconProps {
  emotion: 'good' | 'bad' | 'normal';
  // fill: boolean;
}

const FaceIconButton = ({ emotion }: FaceIconProps) => {
  // eslint-disable-next-line no-unused-vars
  const [isSelected, setIsSelected] = useState(false);
  return <FaceIcon emotion={emotion} fill={isSelected} />;
};

export default FaceIconButton;
