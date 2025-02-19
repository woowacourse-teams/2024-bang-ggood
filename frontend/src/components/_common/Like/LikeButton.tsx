import Like from '@/assets/icons/like/Like';
import useToggleLikeQuery from '@/hooks/query/useToggleLikeQuery';
import theme from '@/styles/theme';

interface Props {
  isLiked?: boolean;
  checklistId: number;
}

const LikeButton = ({ isLiked = false, checklistId }: Props) => {
  const { mutate: toggleLike, variables, isPending } = useToggleLikeQuery();

  const fill = isPending ? variables.isLiked : isLiked;
  const handleClick = () => toggleLike({ checklistId, isLiked: !fill });

  const handleClickLike = (e: React.MouseEvent<SVGSVGElement>) => {
    handleClick();
    e.stopPropagation();
  };

  return (
    <Like
      onClick={handleClickLike}
      fill={fill ? theme.palette.red500 : 'NONE'}
      stroke={fill ? theme.palette.red500 : theme.palette.grey500}
      aria-label="좋아요 버튼"
    />
  );
};

export default LikeButton;
