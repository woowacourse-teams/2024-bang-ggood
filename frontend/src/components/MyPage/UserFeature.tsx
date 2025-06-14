import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ArrowRightIcon } from '@/assets/assets';
import DeleteAccountModal from '@/components/MyPage/DeleteAccountModal';
import LogoutModal from '@/components/MyPage/LogoutModal';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ROUTE_PATH } from '@/constants/routePath';
import { VOC_URL } from '@/constants/VoC';
import useGetUserQuery from '@/hooks/query/useGetUserQuery';
import useModal from '@/hooks/useModal';
import { flexColumn, flexSpaceBetween } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';
import Button from '@/components/_common/Button/Button';

const UserFeature = () => {
  const { data: user } = useGetUserQuery();

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const checklist = queryClient.getQueryData([QUERY_KEYS.CHECKLIST_LIST]);

  const { isModalOpen: isLogoutModalOpen, openModal: openLogoutModal, closeModal: closeLogoutModal } = useModal();
  const { isModalOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  const handleMoveVoc = () => {
    window.location.href = VOC_URL;
  };

  return (
    <>
      <S.TopLabelContainer>
        <>
          <span>🎉 훌륭해요! 이제 좋은 집을 만나는 일만 남았어요!</span>
          {checklist && Array.isArray(checklist) && (
            <span>
                지금까지 <S.Count>{checklist.length}개</S.Count>의 체크리스트를 작성했어요!
              </span>
          )}
        </>
      </S.TopLabelContainer>
      <S.Container>
        {user?.userType !== 'ADMIN' && (
          <S.Section>
            <S.LabelContainer>방끗이 도움되었나요? 한마디 남겨주세요!</S.LabelContainer>
            <Button label={"방끗이 기다려요, 의견 남기기!"} color={"light"} onClick={handleMoveVoc} variant={"outlined-gray"} tabIndex={1} Icon={ArrowRightIcon} iconPosition={"end"}/>
          </S.Section>
        )}

        {user?.userType === 'ADMIN' && (
          <S.Section>
            <Button label={"어드민 페이지 바로가기"} color={"light"} onClick={() => navigate(ROUTE_PATH.admin)} variant={"outlined-gray"} tabIndex={1} Icon={ArrowRightIcon} iconPosition={"end"}/>
          </S.Section>
        )}

        <S.Section>
          <S.LabelContainer>방끗 잠시 안녕!</S.LabelContainer>
          <Button label={"로그아웃하기"} color={"dark"} onClick={openLogoutModal} tabIndex={1} Icon={ArrowRightIcon} iconPosition={"end"}/>
          <Button label={"회원 탈퇴하기"} color={"light"} onClick={openDeleteModal} tabIndex={1} />
        </S.Section>
      </S.Container>

      <LogoutModal isOpen={isLogoutModalOpen} onClose={closeLogoutModal} />
      <DeleteAccountModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
    </>
  );
};

export default UserFeature;

const S = {
  Container: styled.div`
    ${flexColumn}
    ${flexSpaceBetween}
    gap: 2.5rem;
    padding: 2.8rem 1.6rem 3.2rem 1.6rem;
  `,
  Section: styled.section`
    ${flexColumn};
    gap: 0.8rem;
  `,
  LabelContainer: styled.div`
    ${flexColumn};
    gap: .5rem;
    ${({ theme }) => fontStyle(theme.font.body[1].R)}
  `,
  TopLabelContainer: styled.div`
    ${flexColumn};
    gap: .5rem;
    padding: 1.2rem 1.6rem;
    ${({ theme }) => fontStyle(theme.font.body[1].B)}
    color: ${({ theme }) => theme.color.gray[400]};
  `,
  Count: styled.span`
    color: ${({ theme }) => theme.color.secondary[500]};
  `,
};
