import styled from '@emotion/styled';

import Like from '@/assets/icons/like/Like';
import useGetIsUserValidQuery from '@/hooks/query/useGetIsUserValid';
import useGetChecklistList from '@/hooks/useGetChecklistList';
import { boxShadow, flexRow } from '@/styles/common';
import theme from '@/styles/theme';

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
  LikeFilterBox: styled.section<{ $isChecked: boolean }>`
    ${flexRow}
    flex: 0 0 auto;
    align-items: center;
    gap: 1rem;
    box-sizing: border-box;
    border-radius: 1.5rem;
    height: 3rem;
    padding: 1.2rem 1.6rem;

    background-color: ${({ theme, $isChecked }) => ($isChecked ? theme.palette.red200 : theme.palette.white)};
    ${boxShadow};
    cursor: pointer;
  `,
};
