import Modal from '@/components/_common/Modal/Modal';
import { useMemoPhotoStore } from '@/store/useMemoPhotoStore';
import { flexCenter, flexColumn } from '@/styles/common';
import theme from '@/styles/theme';
import styled from '@emotion/styled';

interface Props {
  isModalOpen: boolean;
  modalClose: () => void;
}

const MemoPhotoModal = ({ isModalOpen, modalClose }: Props) => {
  const { photos, addPhotos } = useMemoPhotoStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
      addPhotos(fileArray);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={modalClose}
        hasDim={true}
        position="bottom"
        backgroundColor={theme.color.gray[200]}
      >
        <S.Container>
          <S.PreviewGrid>
            {photos.length < 10 && (
              <S.PreviewBox htmlFor="file-upload">
                <S.AddIcon>+</S.AddIcon>
              </S.PreviewBox>
            )}

            {photos.map((img, idx) => (
              <S.PreviewBox key={idx}>
                <S.PreviewImage src={img} alt={`preview-${idx}`} />
              </S.PreviewBox>
            ))}
          </S.PreviewGrid>

          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </S.Container>
      </Modal>
    </>
  );
};

export default MemoPhotoModal;

const S = {
  Container: styled.div`
    ${flexColumn}
    ${flexCenter}
    padding: 2rem;
  `,
  PreviewGrid: styled.div`
    display: grid;
    width: 100%;
    padding: 0 1.5rem 1.5rem;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem;
  `,
  PreviewBox: styled.label`
    display: flex;
    width: 100%;

    background-color: ${({ theme }) => theme.color.gray[300]};
    aspect-ratio: 1 / 1;
    border-radius: 0.8rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
  PreviewImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.8rem;
  `,
  AddIcon: styled.div`
    color: ${({ theme }) => theme.color.gray[500]};
    font-size: 2rem;
  `,
};
