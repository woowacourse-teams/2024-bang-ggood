import styled from '@emotion/styled';

import SearchIcon from '@/assets/icons/map/SearchIcon';
import Button from '@/components/_common/Button/Button';
import { Carousel } from '@/components/_common/Carousel';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import Header from '@/components/_common/Header/Header';
import SubwayStationItem from '@/components/_common/Subway/SubwayStationItem';
import Text from '@/components/_common/Text/Text';
import { useGetBuildingDetailQuery } from '@/hooks/query/useGetBuildingDetailQuery ';
import useModal from '@/hooks/useModal';
import { SubwayLineName } from '@/styles/subway';
import theme from '@/styles/theme';
import ChecklistCard from '@/components/ChecklistList/ChecklistCard';

function BuildingDetailPage() {
  const {
    data: buildings,
    isPending,
    isError,
  } = useGetBuildingDetailQuery(1,{lastCursor: '2025-05-01'});

  const { isModalOpen, openModal, closeModal } = useModal();

  const firstChecklist = buildings?.checklists[0];
  return (
    <S.GrayContainer>
      <Header center="건물리스트" />
      <Carousel images={buildings?.photos ?? []} />
      
      <S.WhiteBox style={{rowGap:'3.2rem'}}>
        <FlexBox.Horizontal justify="space-between">
          <Text typography={font => font.heading[2].B}>{buildings?.buildingName??'건물 이름'}</Text>
          {/* <LikeButton isLiked={buildings?.isLiked??false} checklistId={buildings?.buildingId??0} /> */}
        </FlexBox.Horizontal>
        <FlexBox.Vertical gap=".8rem">
          <Text typography={font => font.body[1].B}>{'주소'}</Text>
          <Text typography={font => font.body[1].R}>{buildings?.address??'주소를 추가해 주세요.'}</Text>
        </FlexBox.Vertical>
        <FlexBox.Vertical gap=".8rem">
          <Text typography={font => font.body[1].B}>{'가까운 지하철'}</Text>
          {buildings?.stations?.map(station => (
            <SubwayStationItem
              station={{
                stationName: station.stationName,
                stationLine: [station.stationLine] as SubwayLineName[],
                walkingTime: station.walkingTime,
             }}
              size="small"
              textType="full"
            />
            // <Text typography={font => font.body[1].R}>{station.stationName}까지 도보{station.walkingTime}분</Text>
            
          ))}
        </FlexBox.Vertical>
      </S.WhiteBox>

      <S.WhiteBox>
      <Text typography={font => font.body[1].B}>{`${buildings?.buildingName ?? '방끗 빌라'} 다녀오셨나요?`}</Text>
      <Text typography={font => font.body[2].R} color={color => color.gray[400]}>{`후기 체크리스트로 받은 경험을 남겨보세요.`}</Text>
      <Button style={{borderRadius: "1.6rem", margin:"1.2rem 1.6rem"}} size="small" variant="contain" color="dark" onClick={() => {}} label="후기 쓰기" />
      </S.WhiteBox>

      <S.WhiteBox>
        {firstChecklist && }
      </S.WhiteBox>

     </S.GrayContainer>
  );
}


const S = {
  GrayContainer: styled.div`
    background-color: ${theme.color.gray[100]};
  `,
  WhiteBox: styled.div`
    background-color: ${theme.color.mono.white};
    margin: 1.6rem;
    padding: 1.6rem;
    border-radius: 1.6rem;
    display: flex;
    flex-direction: column;
  `,
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
