import { useState } from 'react';

import Like from '@/assets/icons/like/Like';
import useToggleLikeQuery from '@/hooks/query/useToggleLikeQuery';
import theme from '@/styles/theme';

interface Props {
  isLiked?: boolean;
  checklistId: number;
}

const LikeButton = ({ isLiked = false, checklistId }: Props) => {
  const { mutate: toggleLike } = useToggleLikeQuery();

  const [isSelected, setIsSelected] = useState(isLiked);

  const handleClickLike = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    toggleLike({ checklistId, isLiked });
    setIsSelected(prev => !prev);
  };

  return (
    <Like
      onClick={handleClickLike}
      fill={isSelected ? theme.palette.red500 : 'NONE'}
      stroke={isSelected ? theme.palette.red500 : theme.palette.grey500}
    />
  );
};

export default LikeButton;
