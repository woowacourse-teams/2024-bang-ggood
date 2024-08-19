import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import DeleteModal from '@/components/_common/DeleteModal/DeleteModal';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ChecklistAnswerSection from '@/components/ChecklistDetail/ChecklistAnswerSection';
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
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();

  const { checklistId } = useParams() as RouteParams;

  const { mutate: deleteChecklist } = useDeleteChecklistQuery();
  const { data: checklist, isLoading, isError } = useGetChecklistDetailQuery(checklistId);

  const navigate = useNavigate();

  if (isError) {
    navigate(ROUTE_PATH.checklistList);
  }

  if (isLoading) {
    return <SkChecklistDetail />;
  }

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
    navigate(ROUTE_PATH.checklistEditById(Number(checklistId)));
  };
  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<Header.Text>{checklist?.room.roomName}</Header.Text>}
        right={
          <FlexBox.Horizontal gap="10px">
            <Header.TextButton onClick={handleEditButton}>편집</Header.TextButton>
            <Header.TextButton onClick={modalOpen}>삭제</Header.TextButton>
          </FlexBox.Horizontal>
        }
      />
      <Layout bgColor={theme.palette.grey50}>
        <S.Wrapper>
          <RoomInfoSection room={checklist?.room} isLiked={checklist?.isLiked} checklistId={checklist?.checklistId} />
          <ChecklistAnswerSection categories={checklist?.categories} />
        </S.Wrapper>
      </Layout>
      {isModalOpen && <DeleteModal isOpen={isModalOpen} onClose={modalClose} handleDelete={handleDelete} />}
    </>
  );
};

export default ChecklistDetailPage;

const S = {
  Wrapper: styled.div`
    min-height: calc(100vh - 64px);
  `,
};
