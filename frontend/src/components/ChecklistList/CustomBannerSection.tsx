import { LampIcon, PencilIcon } from '@/assets/assets';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import CustomBanner from '@/components/ChecklistList/CustomBanner';
import { ROUTE_PATH } from '@/constants/routePath';
import theme from '@/styles/theme';
import { useNavigate } from 'react-router-dom';

const CustomBannerSection = () => {
  const navigate = useNavigate();

  const handleClickMoveCustomPage = () => navigate(ROUTE_PATH.checklistQuestionSelect);

  const handleClickMoveQuestionSelectPage = () => {
    navigate(ROUTE_PATH.roomCompareSelect);
  };

  return (
    <FlexBox.Vertical gap="1rem">
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
    </FlexBox.Vertical>
  );
};

export default CustomBannerSection;
