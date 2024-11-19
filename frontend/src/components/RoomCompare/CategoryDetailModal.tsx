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

//TODO: 임시 타입
interface CategorySectionType {
  id: SmallAnswerType;
  text: string;
  color: string;
}

const CateogorySection: CategorySectionType[] = [
  { id: 'good', text: '긍정적', color: theme.palette.green400 },
  { id: 'bad', text: '부정적', color: theme.palette.red500 },
  { id: 'none', text: '무응답', color: theme.palette.grey300 },
];

const CategoryDetailModal = ({ isOpen, closeModal }: Props) => {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) || 1;
  const categoryId = Number(searchParams.get('categoryId')) || 1;
  const { data: category } = useGetRoomCategoryDetailQuery({ roomId, categoryId });

  //TODO: 스켈레톤
  if (!category) return;

  return (
    <Modal isOpen={isOpen} onClose={closeModal} backgroundColor={theme.palette.background}>
      <Modal.header>카테고리 질문 상세보기</Modal.header>
      <Modal.body>
        <Accordion totalCount={3}>
          {CateogorySection.map((section, index) => {
            return (
              <>
                <Accordion.header
                  markColor={section.color}
                  id={index + 1}
                  text={section.text}
                  isShowMarkerIfOpen={false}
                />
                <Accordion.body id={1}>
                  {category?.[section.id].map((question, index, questions) => {
                    const isLastQuestion = questions.length - 1 === index;
                    return (
                      <>
                        <S.QuestionBox>
                          <S.Title>
                            <ChecklistQuestionItem question={question} key={question.questionId} />
                          </S.Title>
                        </S.QuestionBox>
                        {!isLastQuestion && <Divider />}
                      </>
                    );
                  })}
                </Accordion.body>
              </>
            );
          })}
        </Accordion>
      </Modal.body>
    </Modal>
  );
};

const S = {
  QuestionBox: styled.div`
    ${flexSpaceBetween}
    width: 100%;
    padding: 0.8rem;
    gap: 1rem;

    background-color: ${({ theme }) => theme.palette.white};
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
  `,
  Title: styled.div`
    display: flex;
    margin: 0.5rem 0;

    font-size: ${({ theme }) => theme.text.size.medium};
    align-items: baseline;
  `,
  Subtitle: styled.div`
    margin-bottom: 1rem;

    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};

    word-break: keep-all;
  `,
};

export default CategoryDetailModal;
