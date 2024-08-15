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
    setIsSelected(prev => !prev);
    toggleLike({ checklistId, isLiked });
  };

  return (
    <>
      {isSelected && <Like onClick={handleClickLike} fill={theme.palette.red500} stroke={theme.palette.red500} />}
      {!isSelected && <Like onClick={handleClickLike} fill={'NONE'} stroke={theme.palette.grey500} />}
    </>
  );
};

export default LikeButton;
