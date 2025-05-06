import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { LampIcon, PencilIcon } from '@/assets/assets';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import CustomBanner from '@/components/ChecklistList/CustomBanner';
import { ROUTE_PATH } from '@/constants/routePath';
import theme from '@/styles/theme';

const CustomBannerSection = () => {
  const navigate = useNavigate();

  const handleClickMoveCustomPage = () => navigate(ROUTE_PATH.checklistQuestionSelect);

  const handleClickMoveQuestionSelectPage = () => {
    navigate(ROUTE_PATH.roomCompareSelect);
  };

  return (
    <S.BannerSection>
      <CustomBanner
        onClick={handleClickMoveCustomPage}
        Icon={<PencilIcon width={30} height={30} aria-hidden="true" />}
        title={'체크리스트 질문 템플릿'}
        buttonText="편집하기"
        buttonDetailText={'체크리스트 질문을 편집하려면 이 버튼을 누르세요.'}
      />
      <CustomBanner
        onClick={handleClickMoveQuestionSelectPage}
        Icon={<LampIcon width={30} height={30} aria-hidden="true" />}
        title={'체크리스트 비교'}
        backgroundColor={theme.color.gray[100]}
        buttonText="비교하기"
        buttonDetailText={'체크리스트 질문을 편집하려면 이 버튼을 누르세요.'}
      />
    </S.BannerSection>
  );
};

export default CustomBannerSection;

const S = {
  BannerSection: styled(FlexBox.Vertical)`
    gap: 1.6rem;
    border-top: ${({ theme }) => `2px solid ${theme.color.gray[100]}`};
    border-bottom: ${({ theme }) => `2px solid ${theme.color.gray[100]}`};
    padding: 1.6rem;
  `,
};
