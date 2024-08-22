import styled from '@emotion/styled';

import Accordion from '@/components/_common/Accordion/Accordion';
import { CATEGORY_COUNT } from '@/constants/category';
import formattedUndefined from '@/utils/formattedUndefined';

interface Props {
  memo?: string;
}

const MemoSection = ({ memo }: Props) => {
  return (
    <Accordion totalCount={CATEGORY_COUNT}>
      <S.MemoWrapper>
        <Accordion.header text={'메모'} id={1} isMarked={true} />
        <Accordion.body id={1}>
          <S.Memo>{formattedUndefined(memo)}</S.Memo>
        </Accordion.body>
      </S.MemoWrapper>
    </Accordion>
  );
};

export default MemoSection;

const S = {
  MemoWrapper: styled.div`
    margin-top: 1rem;
  `,
  Memo: styled.div`
    width: 100%;
    padding: 1.6rem;
    gap: 1rem;
  `,
};
