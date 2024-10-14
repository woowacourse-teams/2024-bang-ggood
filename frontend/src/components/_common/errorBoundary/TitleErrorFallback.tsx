import styled from '@emotion/styled';

import { title3 } from '@/styles/common';

interface Props {
  title: string;
}

const TitleErrorFallback = ({ title }: Props) => {
  return <S.Title>{title}</S.Title>;
};

export default TitleErrorFallback;

const S = {
  Title: styled.h1`
    ${title3}
  `,
};
