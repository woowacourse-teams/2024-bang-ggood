import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { TrashIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import Text from '@/components/_common/Text/Text';
import { flexSpaceBetween } from '@/styles/common';

const CustomChecklistQuestionSection = () => {
  const handleAddQuestion = () => {
    // TODO: API 붙이기
  };
  const handleRemoveQuestion = () => {
    // TODO: API 붙이기
  };


  return (
    <S.CustomChecklistQuestion>
      <S.Row>
        <Text typography={font => font.headline[2].B}>내가 추가한 질문</Text>
        <Button
          variant="outlined-gray"
          size="small"
          onClick={handleRemoveQuestion}
          label={
            <>
              <TrashIcon />
              <Text
                typography={font => font.body[1].B}
                color={theme => theme.mono.black}
                css={css`
                  margin-left: 0.8rem;
                `}
              >
                삭제하기
              </Text>
            </>
          }
        />
      </S.Row>

      <Button
        variant="outlined-gray"
        size="full"
        onClick={handleAddQuestion}
        label={
          <Text typography={font => font.body[1].B} color={theme => theme.mono.black}>
            질문추가
          </Text>
        }
      />
    </S.CustomChecklistQuestion>
  );
};

const S = {
  CustomChecklistQuestion: styled.section`
    margin: 1.6rem -1.6rem 0;
    padding: 1.6rem 1.6rem 3.4rem;

    background-color: ${({ theme }) => theme.color.mono.white};
  `,
  Row: styled.div`
    ${flexSpaceBetween}
    align-items: center;
    height: 4rem;
    margin-bottom: 1.6rem;
  `,
};

export default CustomChecklistQuestionSection;
