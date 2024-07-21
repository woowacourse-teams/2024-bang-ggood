import styled from '@emotion/styled';

import FaceIcon from '@/components/faceMark/FaceIcon';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    pointer: cursor;
  `,
  Header: styled.div`
    font-size: ${({ theme }) => theme.text.size.small};
  `,
  Footer: styled.div`
    font-size: ${({ theme }) => theme.text.size.xSmall};
  `,
};

const FaceMark = Object.assign(S.Container, {
  FaceIcon: FaceIcon,
  Header: S.Header,
  Footer: S.Footer,
});

export default FaceMark;
