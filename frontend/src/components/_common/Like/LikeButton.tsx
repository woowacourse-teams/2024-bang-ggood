import Like from '@/assets/icons/like/Like';
import useToggleLikeQuery from '@/hooks/query/useToggleLikeQuery';
import theme from '@/styles/theme';

interface Props {
  isLiked?: boolean;
  checklistId: number;
}

const LikeButton = ({ isLiked = false, checklistId }: Props) => {
  const { mutate: toggleLike, variables, isPending } = useToggleLikeQuery();

  const handleClickLike = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    toggleLike({ checklistId, isLiked });
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
