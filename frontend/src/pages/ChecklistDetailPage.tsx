import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import AlertModal from '@/components/_common/AlertModal/AlertModal';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ChecklistAnswerSection from '@/components/ChecklistDetail/ChecklistAnswerSection';
import MemoSection from '@/components/ChecklistDetail/MemoSection';
import RoomInfoSection from '@/components/ChecklistDetail/RoomInfoSection';
import SkChecklistDetail from '@/components/skeleton/ChecklistDetail/SkChecklistDetail';
import { ROUTE_PATH } from '@/constants/routePath';
import useDeleteChecklistQuery from '@/hooks/query/useDeleteChecklistQuery';
import useGetChecklistDetailQuery from '@/hooks/query/useGetChecklistDetailQuery';
import useModalOpen from '@/hooks/useModalOpen';
import theme from '@/styles/theme';

type RouteParams = {
  checklistId: string;
};

const ChecklistDetailPage = () => {
  const navigate = useNavigate();
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();

  const { checklistId } = useParams() as RouteParams;
  const { data: checklist, isLoading, isError } = useGetChecklistDetailQuery(checklistId);
  const { mutate: deleteChecklist } = useDeleteChecklistQuery();

  if (isError) navigate(ROUTE_PATH.checklistList);

  if (isLoading) return <SkChecklistDetail />;

  if (!checklist) return;

  const handleDelete = async () => {
    deleteChecklist(Number(checklistId), {
      onSuccess: () => {
        modalClose();
        navigate(ROUTE_PATH.checklistList);
      },
    });
  };

  const handleEditButton = () => {
    navigate(ROUTE_PATH.checklistEditOne(Number(checklistId)));
  };

  return (
    <>
      <Header
        left={<Header.Backward />}
        right={
          <FlexBox.Horizontal gap="1.5rem">
            <Header.TextButton onClick={handleEditButton}>편집</Header.TextButton>
            <Header.TextButton onClick={modalOpen}>삭제</Header.TextButton>
          </FlexBox.Horizontal>
        }
      />
      <Layout bgColor={theme.palette.grey50} withHeader>
        <RoomInfoSection
          room={checklist?.room}
          options={checklist?.options}
          isLiked={checklist?.isLiked}
          checklistId={Number(checklistId)}
        />
        <ChecklistAnswerSection categories={checklist?.categories} />
        <MemoSection memo={checklist?.room?.memo} />
      </Layout>

      {isModalOpen && (
        <AlertModal
          title={
            <div>
              정말 <S.AccentText>체크리스트</S.AccentText>를 삭제하시겠습니까?
            </div>
          }
          subtTitle="삭제한 체크리스트는 다시 확인할 수 없습니다."
          isOpen={isModalOpen}
          onClose={modalClose}
          handleApprove={handleDelete}
        />
      )}
    </>
  );
};

const S = {
  AccentText: styled.span`
    color: ${({ theme }) => theme.palette.green600};
  `,
};
export default ChecklistDetailPage;
