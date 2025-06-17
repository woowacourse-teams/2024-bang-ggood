import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';

import Accordion from '@/components/_common/Accordion/Accordion';
import Divider from '@/components/_common/Divider/Divider';
import Modal from '@/components/_common/Modal/Modal';
import ChecklistQuestionItem from '@/components/NewChecklist/ChecklistQuestion/ChecklistQuestion';
import useGetRoomCategoryDetailQuery from '@/hooks/query/useGetRoomCategoryDetail';
import { flexSpaceBetween } from '@/styles/common';
import theme from '@/styles/theme';
import { SmallAnswerType } from '@/types/RoomCompare';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

interface CategorySectionType {
  id: SmallAnswerType;
  text: string;
  color: string;
}

const CategorySection: CategorySectionType[] = [
  { id: 'good', text: '긍정적', color: theme.palette.green400 },
  { id: 'bad', text: '부정적', color: theme.palette.red500 },
  { id: 'none', text: '무응답', color: theme.palette.grey300 },
];

const CategoryDetailModal = ({ isOpen, closeModal }: Props) => {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('targetRoomId'));
  const categoryId = Number(searchParams.get('categoryId'));

  if (!roomId || !categoryId) throw new Error('잘못된 접근입니다.');

  const { data: category, isLoading } = useGetRoomCategoryDetailQuery({ roomId, categoryId });

  if (isLoading)
    return (
      <Modal isOpen={isOpen} onClose={closeModal} backgroundColor={theme.color.gray[50]}>
        <Modal.header>카테고리 질문 상세보기</Modal.header>
        <Modal.body>
          <div>loading</div>
        </Modal.body>
      </Modal>
    );

  return (
    <Modal isOpen={isOpen} onClose={closeModal} backgroundColor={theme.color.gray[50]}>
      <Modal.header>카테고리 질문 상세보기</Modal.header>
      <Modal.body>
        <Accordion totalCount={3}>
          {CategorySection.map((section, index) => {
            return (
              <S.FlexBox key={section.id}>
                <Accordion.header
                  markColor={section.color}
                  id={index + 1}
                  text={section.text}
                  isShowMarkerIfOpen={false}
                />
                <Accordion.body id={index + 1}>
                  {category?.[section.id].map((question, index, questions) => {
                    const isLastQuestion = questions.length - 1 === index;
                    return (
                      <>
                        <S.QuestionBox>
                          <S.Title>
                            <ChecklistQuestionItem fontSize={'small'} question={question} key={question.questionId} />
                          </S.Title>
                        </S.QuestionBox>
                        {!isLastQuestion && <Divider />}
                      </>
                    );
                  })}
                </Accordion.body>
              </S.FlexBox>
            );
          })}
        </Accordion>
      </Modal.body>
    </Modal>
  );
};

export default CategoryDetailModal;

const S = {
  QuestionBox: styled.div`
    ${flexSpaceBetween}
    width: 100%;
    padding: 1rem;

    background-color: ${({ theme }) => theme.color.mono.white};
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
  `,
  Title: styled.div`
    display: flex;
    margin: 0.5rem 0;

    font-size: 1.4rem;
    align-items: baseline;
  `,
  FlexBox: styled.div`
    gap: 0.4rem;
  `,
};
