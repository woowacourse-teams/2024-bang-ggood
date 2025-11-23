import styled from '@emotion/styled';

import SearchIcon from '@/assets/icons/map/SearchIcon';
import { Carousel } from '@/components/_common/Carousel';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import Header from '@/components/_common/Header/Header';
import Text from '@/components/_common/Text/Text';
import { useGetBuildingDetailQuery } from '@/hooks/query/useGetBuildingDetailQuery ';
import useModal from '@/hooks/useModal';
import theme from '@/styles/theme';

function BuildingDetailPage() {
  const {
    data: buildings,
    isPending,
    isError,
  } = useGetBuildingDetailQuery(1,{lastCursor: '2025-05-01'});

  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Header center="건물리스트" />
      <Carousel images={buildings?.photos ?? []} />
      <FlexBox.Horizontal justify="space-between" padding="1.6rem" margin="1.6rem" style={{borderRadius: '1.6rem'}}>
          <Text typography={font => font.heading[2].B}>{buildings?.buildingName??'건물 이름'}</Text>

    </FlexBox.Horizontal>


    </>
  );
}


const S = {
  Row: styled.div`
    padding: 1.6rem;
  `,
  Splitter: styled.div`
    width: 100%;
    height: 0.1rem;
    border: 1px solid ${theme.color.gray[200]};
  `,
  SearchIcon: styled(SearchIcon)`
    position: fixed;
  `,
};

export default BuildingDetailPage;
