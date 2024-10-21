import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ArrowRightCircle, BangBangIcon3D } from '@/assets/assets';
import Header from '@/components/_common/Header/Header';
import DeleteAccountModal from '@/components/MyPage/DeleteAccountModal';
import LogoutModal from '@/components/MyPage/LogoutModal';
import SKMyPage from '@/components/skeleton/MyPage/SKMyPage';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROUTE_PATH } from '@/constants/routePath';
import { HEADER_SIZE } from '@/constants/style';
import useUserQuery from '@/hooks/query/useUserQuery';
import useModal from '@/hooks/useModal';
import { boxShadowSpread, flexCenter, flexColumn, flexRow, flexSpaceBetween, title2, title4 } from '@/styles/common';

const MyPage = () => {
  const queryClient = useQueryClient();
  const checklist = queryClient.getQueryData([QUERY_KEYS.CHECKLIST_LIST]);

  const navigate = useNavigate();
  const { isModalOpen: isLogoutModalOpen, openModal: openLogoutModal, closeModal: closeLogoutModal } = useModal();
  const { isModalOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { data: user, isError, isLoading } = useUserQuery();

  const handleMoveVoc = () => {
    window.location.href = '#';
  };

  if (isLoading) return <SKMyPage />;

  return (
    <>
      <Header center={<Header.Text>마이페이지</Header.Text>} isTransparent />
      <S.Profile>
        <S.ProfileText>
          <div>{`${isError ? '게스트' : user?.userName}님`}</div>
          <div>오늘도 방끗과 함께 방긋 웃어요! :)</div>
        </S.ProfileText>
        <S.ProfileIcon>
          <BangBangIcon3D aria-hidden="true" width={200} />
        </S.ProfileIcon>
      </S.Profile>
      <S.Container>
        <S.LabelContainer>
          {!isError ? (
            <>
              <span>🎉 훌륭해요!</span>
              {checklist && Array.isArray(checklist) && (
                <span>
                  지금까지 <S.Count>{checklist.length}개</S.Count>의 체크리스트를 작성했어요!
                </span>
              )}
              <span>이제 좋은 집을 만나는 일만 남았어요!</span>
            </>
          ) : (
            <span>방끗을 더 잘 사용하기 위해 로그인해보세요!</span>
          )}
        </S.LabelContainer>

        <S.Section>
          <S.LabelContainer>방끗이 도움되었나요? 한마디 남겨주세요!</S.LabelContainer>
          <S.Button tabIndex={1} onClick={handleMoveVoc}>
            방끗이 기다려요, 의견 남기기!
            <ArrowRightCircle aria-hidden="true" />
          </S.Button>
        </S.Section>

        {isError ? (
          <>
            <S.Section>
              <S.LabelContainer>방끗 시작하기!</S.LabelContainer>
              <S.Button onClick={() => navigate(ROUTE_PATH.root)} tabIndex={1}>
                로그인/회원가입 바로가기
                <ArrowRightCircle aria-hidden="true" />
              </S.Button>
            </S.Section>
          </>
        ) : (
          <>
            <S.Section>
              <S.LabelContainer>방끗 잠시 안녕!</S.LabelContainer>
              <S.Button onClick={openLogoutModal} isCenter tabIndex={1}>
                로그아웃하기
              </S.Button>
              <S.TextButton onClick={openDeleteModal} tabIndex={1}>
                방끗 탈퇴하기
              </S.TextButton>
            </S.Section>
          </>
        )}
      </S.Container>

      <LogoutModal isOpen={isLogoutModalOpen} onClose={closeLogoutModal} />
      <DeleteAccountModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
    </>
  );
};

export default MyPage;

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
    color: ${({ theme }) => theme.palette.white};
  `,
  ProfileIcon: styled.div`
    width: 100%;
    ${flexCenter}
  `,
  Container: styled.div`
    ${flexColumn}
    ${flexSpaceBetween}
    height: calc(40dvh);
    padding: 1.6rem;
  `,
  Section: styled.section`
    ${flexColumn}
    gap: 1rem;
  `,
  LabelContainer: styled.div`
    ${flexColumn}
    gap: .5rem;
    ${title4}
  `,
  Count: styled.span`
    color: ${({ theme }) => theme.palette.green500};
  `,
  Button: styled.button<{ isCenter?: boolean }>`
    width: 100%;
    ${flexRow}
    padding: 1.6rem;
    align-items: center;

    background-color: ${({ theme }) => theme.palette.white};

    justify-content: ${({ isCenter }) => (isCenter ? 'center' : 'space-between')};

    border-radius: 1.6rem;
    ${boxShadowSpread}

    &:hover, &:active {
      background-color: ${({ theme }) => theme.palette.grey100};

      font-weight: ${({ theme }) => theme.text.weight.bold};
    }
  `,
  TextButton: styled.button`
    width: fit-content;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.xxSmall};
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey500};
  `,
};
