import styled from '@emotion/styled';
import { ErrorBoundary } from 'react-error-boundary';

import { BangBangIcon3D } from '@/assets/assets';
import GuestProfile from '@/components/MyPage/GuestProfile';
import UserProfile from '@/components/MyPage/UserProfile';
import { HEADER_SIZE } from '@/constants/style';
import { boxShadowSpread, flexCenter, flexColumn, title2 } from '@/styles/common';

const ProfileSection = () => {
  return (
    <S.Profile>
      <S.ProfileText>
        <ErrorBoundary FallbackComponent={GuestProfile}>
          <UserProfile />
        </ErrorBoundary>
      </S.ProfileText>
      <S.ProfileIcon>
        <BangBangIcon3D aria-hidden="true" width={200} />
      </S.ProfileIcon>
    </S.Profile>
  );
};

export default ProfileSection;

const S = {
  Profile: styled.div`
    ${flexColumn};
    width: 100%;
    box-sizing: border-box;

    padding: ${HEADER_SIZE + 1}rem 2rem 0;

    border-radius: 0 0 1.6rem 1.6rem;
    gap: 1rem;

    background-color: ${({ theme }) => theme.palette.yellow500};

    ${boxShadowSpread}
  `,
  ProfileText: styled.h1`
    ${title2}
    color: ${({ theme }) => theme.palette.black};
  `,
  ProfileIcon: styled.div`
    width: 100%;
    ${flexCenter}
  `,
};
