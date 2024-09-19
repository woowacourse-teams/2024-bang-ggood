import Like from '@/assets/icons/like/Like';
import useToggleLikeQuery from '@/hooks/query/useToggleLikeQuery';
import useDebounce from '@/hooks/useDebounce';
import theme from '@/styles/theme';

interface Props {
  isLiked?: boolean;
  checklistId: number;
}

const LikeButton = ({ isLiked = false, checklistId }: Props) => {
  const { mutate: toggleLike, variables, isPending } = useToggleLikeQuery();
  const debouncedIsLiked = useDebounce({ value: isPending ? variables.isLiked : isLiked, delay: 500 });

  const handleClickLike = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    toggleLike({ checklistId, isLiked: !debouncedIsLiked });
  };

  const fill = isPending ? variables.isLiked : isLiked;

  return (
    <Like
      onClick={handleClickLike}
      fill={fill ? theme.palette.red500 : 'NONE'}
      stroke={fill ? theme.palette.red500 : theme.palette.grey500}
    />
  );
};

export default LikeButton;
