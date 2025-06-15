import styled from '@emotion/styled';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/_common/Button/Button';
import ListErrorFallback from '@/components/_common/errorBoundary/ListErrorFallback';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import Header from '@/components/_common/Header/Header';
import Layout from '@/components/_common/layout/Layout';
import AlertModal from '@/components/_common/Modal/AlertModal/AlertModal';
import ChecklistDetailSection from '@/components/ChecklistDetail/ChecklistDetailSection';
import { ROUTE_PATH } from '@/constants/routePath';
import useDeleteChecklistQuery from '@/hooks/query/useDeleteChecklistQuery';
import useModal from '@/hooks/useModal';
import { useTrackPageView } from '@/service/amplitude/useTrackPageView';
import theme from '@/styles/theme';

type RouteParams = {
  checklistId: string;
};

const ChecklistDetailPage = () => {
  useTrackPageView({ eventName: '[View] 체크리스트 디테일 페이지' });

  const { checklistId } = useParams() as RouteParams;
  const navigate = useNavigate();

  const { isModalOpen: isAlertModalOpen, openModal, closeModal } = useModal();
  const { mutate: deleteChecklist } = useDeleteChecklistQuery();

  const handleDelete = async () => {
    deleteChecklist(Number(checklistId), {
      onSuccess: () => {
        closeModal();
        navigate(ROUTE_PATH.checklistList);
      },
    });
  };

  const handleEditButton = () => {
    navigate(ROUTE_PATH.checklistEditOne(Number(checklistId)));
  };

  const handleClickBackward = () => {
    navigate(ROUTE_PATH.checklistList);
  };

  return (
    <>
      <Header
        left={<Header.Backward onClick={handleClickBackward} />}
        right={
          <FlexBox.Horizontal gap="1.5rem">
            <Button label={'편집'} size="header" variant="text" onClick={handleEditButton} id="checklistEditButton" />
            <Button label={'삭제'} size="header" variant="text" onClick={openModal} id="checklistDeleteButton" />
          </FlexBox.Horizontal>
        }
      />
      <Layout bgColor={theme.palette.grey50} withHeader>
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <Layout withHeader>
              <ListErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
            </Layout>
          )}
        >
          <ChecklistDetailSection />
        </ErrorBoundary>
      </Layout>

      <AlertModal
        title={
          <div>
            정말 <S.AccentText>체크리스트</S.AccentText>를 삭제하시겠습니까?
          </div>
        }
        subtitle="삭제한 체크리스트는 다시 확인할 수 없습니다."
        isOpen={isAlertModalOpen}
        onClose={closeModal}
        handleApprove={handleDelete}
      />
    </>
  );
};

export default ChecklistDetailPage;

const S = {
  AccentText: styled.span`
    color: ${({ theme }) => theme.palette.green600};
  `,
};
