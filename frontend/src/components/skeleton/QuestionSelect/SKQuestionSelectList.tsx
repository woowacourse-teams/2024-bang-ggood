import styled from '@emotion/styled';

import { flexColumn, flexRow, Skeleton } from '@/styles/common';

const SHOW_SELECT_QUESTIONS = 7;

const SKQuestionSelectList = () => {
  return (
    <S.Container>
      {Array.from({ length: SHOW_SELECT_QUESTIONS }, (_, index) => (
        <S.Row key={index} />
      ))}
    </S.Container>
  );
};

export default SKQuestionSelectList;

const S = {
  Container: styled.article`
    ${flexColumn}
    box-sizing: border-box;
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 0.8rem;

    gap: 1rem;

    background-color: white;
  `,
  Row: styled.div`
    ${Skeleton}
    width: 100%;
    height: 5rem;
    ${flexRow}
    gap: 1rem;
  `,
};
