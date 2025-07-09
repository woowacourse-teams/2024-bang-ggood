import MemoButton from '@/components/NewChecklist/MemoModal/MemoButton';
import MemoPhotoModal from '@/components/NewChecklist/MemoModal/MemoPhotoModal';
import MemoTextModal from '@/components/NewChecklist/MemoModal/MemoTextModal';
import useModal from '@/hooks/useModal';

const MemoSection = () => {
  // 텍스트 메모 모달
  const { isModalOpen: isTextMemoModalOpen, openModal: openTextMemoModal, closeModal: closeTextMemoModal } = useModal();

  // 포토 메모 모달
  const {
    isModalOpen: isPhotoMemoModalOpen,
    openModal: openPhotoMemoModal,
    closeModal: closePhotoMemoModal,
  } = useModal();

  return (
    <>
      {!isPhotoMemoModalOpen && !isTextMemoModalOpen && (
        <MemoButton textOpen={openTextMemoModal} photoOpen={openPhotoMemoModal} />
      )}

      {isTextMemoModalOpen && <MemoTextModal isModalOpen={isTextMemoModalOpen} modalClose={closeTextMemoModal} />}
      {isPhotoMemoModalOpen && <MemoPhotoModal isModalOpen={isPhotoMemoModalOpen} modalClose={closePhotoMemoModal} />}
    </>
  );
};

export default MemoSection;
