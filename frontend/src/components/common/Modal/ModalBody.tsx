import styled from '@emotion/styled';

const ModalBody = ({ children, contentPosition = 'left' }: ContentsProps) => {
  return <S.Container contentPosition={contentPosition}>{children}</S.Container>;
};

export default ModalBody;

interface ContentsProps {
  contentPosition?: ModalContentPosition;
  children: React.ReactNode;
}

export type ModalContentPosition = 'center' | 'left';

const Container = styled.div<{ contentPosition: ModalContentPosition }>`
  display: flex;
  margin-bottom: 10px;
  padding: 0 16px;

  line-height: 1.5;
  text-align: left;
  align-items: center;
  justify-content: ${({ contentPosition }) => (contentPosition === 'center' ? 'center' : 'flex-start')};
`;

const S = {
  Container,
};