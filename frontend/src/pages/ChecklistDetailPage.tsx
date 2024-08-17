import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getChecklistDetail } from '@/apis/checklist';
import DeleteModal from '@/components/_common/DeleteModal/DeleteModal';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import ChecklistAnswerSection from '@/components/ChecklistDetail/ChecklistAnswerSection';
import RoomInfoSection from '@/components/ChecklistDetail/RoomInfoSection';
import { ROUTE_PATH } from '@/constants/routePath';
import useDeleteChecklistQuery from '@/hooks/query/useDeleteChecklistQuery';
import useModalOpen from '@/hooks/useModalOpen';
import theme from '@/styles/theme';
import { ChecklistInfo } from '@/types/checklist';
import formattedDate from '@/utils/formattedDate';

type RouteParams = {
  checklistId: string;
};

const ChecklistDetailPage = () => {
  const { isModalOpen, modalOpen, modalClose } = useModalOpen();

  const { checklistId } = useParams() as RouteParams;
  const [checklist, setChecklist] = useState<ChecklistInfo>();

  const { mutate: deleteChecklist } = useDeleteChecklistQuery();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChecklist = async () => {
      const checklist = await getChecklistDetail(Number(checklistId));
      setChecklist(checklist);
    };
    fetchChecklist();
  }, [checklistId]);

  // TODO: fetch 시 로딩 상태일 때 스켈레톤처리. 성공할 떄만 return 문 보여주는 로직이 필요
  if (!checklist) {
    return <div>체크리스트가 없어요</div>;
  }

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
