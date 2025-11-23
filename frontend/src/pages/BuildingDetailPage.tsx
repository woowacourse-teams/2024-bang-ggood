import styled from '@emotion/styled';

import { useNavigate, useParams } from 'react-router-dom';

import { ArrowRightIcon, EmptyHomeIcon } from '@/assets/assets';
import SearchIcon from '@/assets/icons/map/SearchIcon';
import Button from '@/components/_common/Button/Button';
import { Carousel } from '@/components/_common/Carousel';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import Header from '@/components/_common/Header/Header';
import SubwayStationItem from '@/components/_common/Subway/SubwayStationItem';
import Text from '@/components/_common/Text/Text';
import { ROUTE_PATH } from '@/constants/routePath';
import { useGetBuildingDetailQuery } from '@/hooks/query/useGetBuildingDetailQuery ';
import useModal from '@/hooks/useModal';
import { SubwayLineName } from '@/styles/subway';
import theme from '@/styles/theme';
import formattedDate from '@/utils/formattedDate';
import { useState } from 'react';

function BuildingDetailPage() {
  const {id} = useParams()
  const navigate = useNavigate();
  const {
    data: buildings,
    isPending,
    isError,
  } = useGetBuildingDetailQuery(Number(id),{lastCursor: '2025-05-01'});

  const { isModalOpen, openModal, closeModal } = useModal();

  
  const handleChecklistClick = (checklistId:number) => {
      navigate(ROUTE_PATH.checklistOne(checklistId));
  };
  
  const [isVisibleAll, setIsVisibleAll]=useState(false);
  const handleViewMore = () => {
    setIsVisibleAll(true);
  };
  return (
    <S.GrayContainer>
      <Header left={<Header.Backward />} center="건물리스트"  />
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

      { 
          <S.WhiteBox style={{padding:"1.6rem"}}>
          <S.ChecklistHeader>
            <Text typography={font => font.headline[2].B}>
              후기 체크리스트 {buildings?.checklistCount ?? 0}
            </Text>
            <Text typography={font => font.body[2].B} color={color => color.gray[400]}>
              최신순
            </Text>
          </S.ChecklistHeader>
          
          {(buildings?.checklists.slice(0, isVisibleAll? buildings.checklists.length : 1)??[]).map(
          (checklist) => (
            <>
         <S.ChecklistCard key={checklist.checklistId} onClick={()=>handleChecklistClick(checklist.checklistId)}>
            <S.CardLeft>
              <S.Thumbnail>
                <EmptyHomeIcon />
              </S.Thumbnail>
              <S.CardInfo>
                <Text typography={font => font.headline[2].B}>{checklist.roomName}</Text>
                <Text typography={font => font.label[1].R} color={color => color.mono.black}>
                  {checklist.deposit}/{checklist.rent}
                </Text>
                <Text typography={font => font.caption[1].R} color={color => color.gray[400]}>
                  {checklist.userName}
                </Text>
                <Text typography={font => font.caption[1].R} color={color => color.gray[400]}>
                  {formattedDate(checklist.createdAt)}
                </Text>
              </S.CardInfo>
            </S.CardLeft>
            <ArrowRightIcon stroke={theme.color.gray[400]} />
          </S.ChecklistCard>
          
          <S.CategoryList>
            <S.CategoryItem>
              <Text typography={font => font.body[2].R} color={color => color.gray[600]}>
                옵션
              </Text>
              <Text typography={font => font.body[2].R} color={color => color.gray[600]}>
                {checklist.optionCount}개
              </Text>
            </S.CategoryItem>
            {checklist.categories.map(category => (
              <S.CategoryItem key={category.categoryId}>
                <Text typography={font => font.body[2].R} color={color => color.gray[600]}>
                  {category.categoryName}
                </Text>
                <Text typography={font => font.body[2].R} color={color => color.gray[600]}>
                  {category.score}%
                </Text>
              </S.CategoryItem>
            ))}
          </S.CategoryList>
          </>))}
          

          {(!isVisibleAll &&<Button 
            style={{ borderRadius: "1.6rem", marginTop: "1.6rem" }} 
            size="small" 
            variant="outlined" 
            color="dark" 
            onClick={handleViewMore} 
            label="더보기" 
          />)}
        </S.WhiteBox>
 }

     </S.GrayContainer>
  );
}


const S = {
  GrayContainer: styled.div`
    background-color: ${theme.color.gray[100]};
    padding-bottom: 1.2rem;
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
  ChecklistHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.6rem;
  `,
  ChecklistCard: styled.div`
  margin-top: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    border: 1px solid ${theme.color.gray[200]};
    border-radius: 0.8rem;
    cursor: pointer;
    margin-bottom: 1.6rem;
    
    &:hover {
      background-color: ${theme.color.gray[50]};
    }
  `,
  CardLeft: styled.div`
    display: flex;
    gap: 1.2rem;
    align-items: center;
    flex: 1;
  `,
  Thumbnail: styled.div`
    width: 6.8rem;
    height: 6.8rem;
    border-radius: 0.8rem;
    background-color: ${theme.color.gray[100]};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    
    svg {
      width: 3.2rem;
      height: 3.2rem;
    }
  `,
  CardInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
  `,
  CategoryList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.6rem;
    background-color: ${theme.color.gray[100]};
  `,
  CategoryItem: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};

export default BuildingDetailPage;
