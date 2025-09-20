import styled from '@emotion/styled';

import Accordion from '@/components/_common/Accordion/Accordion';
import { CATEGORY_COUNT } from '@/constants/category';

interface Props {
  memo?: string;
}

const MemoSection = ({ memo }: Props) => {
  const formattedMemo = memo?.split(/\n/g).map((line, index, arr) => (
    <div key={index} style={{ marginBottom: arr[index + 1] === '' ? '0.6em' : undefined }}>
      {line || <br />}
    </div>
  ));

  return (
    <Accordion totalCount={CATEGORY_COUNT}>
      <S.MemoWrapper>
        <Accordion.header
          text="메모"
          id={1}
          style={{
            marginBottom: '0.2rem',
          }}
        />
        <Accordion.body id={1}>
          <S.Memo>{formattedMemo || ''}</S.Memo>
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
