import { fontStyle } from '@/utils/fontStyle';
import styled from '@emotion/styled';

type ModalContentPosition = 'center' | 'left';

interface Props {
  contentPosition?: ModalContentPosition;
  children: React.ReactNode;
}

const ModalBody = ({ children, contentPosition = 'left', ...rest }: Props) => {
  return (
    <S.Container contentPosition={contentPosition} {...rest}>
      {children}
    </S.Container>
  );
};

export default ModalBody;

const S = {
  Container: styled.div<{ contentPosition: ModalContentPosition }>`
    display: flex;
    width: 100%;
    margin-bottom: 1rem;

    ${({ theme }) => fontStyle(theme.font.body[1].B)}
    text-align: left;
    gap: 1rem;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: ${({ contentPosition }) => (contentPosition === 'center' ? 'center' : 'flex-start')};
  `,
};
