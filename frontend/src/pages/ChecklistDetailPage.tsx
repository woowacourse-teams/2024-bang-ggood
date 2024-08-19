import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import DeleteModal from '@/components/_common/DeleteModal/DeleteModal';
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
import formattedDate from '@/utils/formattedDate';

type RouteParams = {
  checklistId: string;
};

const ChecklistDetailPage = () => {
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();

  const { checklistId } = useParams() as RouteParams;

  const { mutate: deleteChecklist } = useDeleteChecklistQuery();
  const { data: checklist, isError, isLoading } = useGetChecklistDetailQuery(Number(checklistId));

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

  return (
    <>
      <Header
        left={<Header.Backward />}
        center={<Header.Text>{formattedDate(checklist?.room?.createdAt ?? '')}</Header.Text>}
        right={<Header.TextButton onClick={modalOpen}>삭제</Header.TextButton>}
      />
      <Layout bgColor={theme.palette.grey100}>
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
