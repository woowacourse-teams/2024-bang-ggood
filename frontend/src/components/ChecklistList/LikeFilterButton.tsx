import styled from '@emotion/styled';

import Like from '@/assets/icons/like/Like';
import useGetIsUserValidQuery from '@/hooks/query/useGetIsUserValid';
import useGetChecklistList from '@/hooks/useGetChecklistList';
import { flexCenter } from '@/styles/common';
import theme from '@/styles/theme';
import { fontStyle } from '@/utils/fontStyle';

const LikeFilterButton = () => {
  const { isLikeFiltered: isEnabled, toggleFilter } = useGetChecklistList();
  const { data: user, isError, isPending } = useGetIsUserValidQuery();

  const notLoggedIn = !(!isError && !isPending && user.isAccessTokenExist && user.isRefreshTokenExist);
  if (notLoggedIn) return null;

  return (
    <S.LikeFilterBox onClick={toggleFilter} $isChecked={isEnabled}>
      <Like fill={theme.palette.red500} stroke={theme.palette.red500} width="2rem" />
      좋아요
    </S.LikeFilterBox>
  );
};

export default LikeFilterButton;

const S = {
  LikeFilterBox: styled.button<{ $isChecked: boolean }>`
    ${flexCenter}
    flex: 0 0 auto;
    gap: 0.5rem;

    box-sizing: border-box;
    border-radius: 0.8rem;

    width: 11rem;
    height: 4rem;
    border: ${({ theme }) => `1px solid ${theme.color.gray[200]}`};

    ${({ theme }) => fontStyle(theme.font.body[1].B)}

    background-color: ${({ theme, $isChecked }) => ($isChecked ? theme.color.gray[200] : theme.color.mono.white)};
    cursor: pointer;
  `,
};
