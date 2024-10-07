import { useEffect, useState } from 'react';

import Like from '@/assets/icons/like/Like';
import useToggleLikeQuery from '@/hooks/query/useToggleLikeQuery';
import useDebounce from '@/hooks/useDebounce';
import theme from '@/styles/theme';

interface Props {
  isLiked?: boolean;
  checklistId: number;
}

const LikeButton = ({ isLiked = false, checklistId }: Props) => {
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);

  const { mutate: toggleLike, variables, isPending } = useToggleLikeQuery();
  const debouncedIsLiked = useDebounce({ value: localIsLiked, delay: 500 });

  useEffect(() => {
    if (debouncedIsLiked !== isLiked) {
      toggleLike(
        { checklistId, isLiked: debouncedIsLiked },
        {
          onError: () => {
            setLocalIsLiked(prev => !prev);
          },
        },
      );
    }
  }, [debouncedIsLiked]);

  const handleClickLike = (e: React.MouseEvent<SVGSVGElement>) => {
    setLocalIsLiked(prev => !prev);
    e.stopPropagation();
  };

  const fill = isPending ? variables.isLiked : localIsLiked;

  return (
    <Like
      onClick={handleClickLike}
      fill={fill ? theme.palette.red500 : 'NONE'}
      stroke={fill ? theme.palette.red500 : theme.palette.grey500}
    />
  );
};

export default LikeButton;
