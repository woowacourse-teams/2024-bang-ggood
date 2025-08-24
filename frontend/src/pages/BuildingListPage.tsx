import styled from '@emotion/styled';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { MapLogoIcon } from '@/assets/assets';
import SearchIcon from '@/assets/icons/map/SearchIcon';
import Button from '@/components/_common/Button/Button';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FloatingButton from '@/components/_common/FloatingButton/FloatingButton';
import Header from '@/components/_common/Header/Header';
import Text from '@/components/_common/Text/Text';
import BuildingCard from '@/components/Building/BuildingCard';
import BuildingFilterModal from '@/components/Building/BuildingFilterModal/BuildingFilterModal';
import BuildingListSearchBar from '@/components/Building/BuildingListSearchBar';
import { ROUTE_PATH } from '@/constants/routePath';
import { useGetBuildingListQuery } from '@/hooks/query/useGetBuildingListQuery';
import useModal from '@/hooks/useModal';
import theme from '@/styles/theme';

function BuildingListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [stationsFilter, setStationsFilter] = useState<string[]>([]);
  const {
    data: buildings,
    isPending,
    isError,
  } = useGetBuildingListQuery({
    search: searchTerm,
    stations: stationsFilter,
  });

  const { isModalOpen, openModal, closeModal } = useModal();
  const buildingCount = buildings?.totalElements;

  return (
    <>
      <BuildingFilterModal
        onConfirm={selectedStations => {
          setStationsFilter(selectedStations.map(station => station.station));
        }}
        isOpen={isModalOpen}
        onClose={closeModal}
        onFilter={filter => {
          setSearchTerm(filter.search);
        }}
        buildingCount={buildingCount ?? 0}
      />
      <Header center="건물리스트" />
      <S.Row>
        <BuildingListSearchBar onSearch={searchTerm => setSearchTerm(searchTerm)} />
      </S.Row>
      <S.Splitter />
      <S.Row>
        <Text color={color => color.gray[600]} typography={theme => theme.body[1].B}>
          <Button label="지하철 필터" onClick={openModal} />
        </Text>
        {!isError && !isPending && (
          <FlexBox.Horizontal gap="0" margin="1rem 0 0">
            <Text color={color => color.gray[600]} typography={theme => theme.body[1].R}>
              전체
            </Text>
            <Text color={color => color.gray[600]} typography={theme => theme.body[1].B} style={{ marginLeft: '1rem' }}>
              {buildingCount}개
            </Text>
            <Text color={color => color.gray[600]} typography={theme => theme.body[1].B} style={{ marginLeft: 'auto' }}>
              최신순
            </Text>
          </FlexBox.Horizontal>
        )}
      </S.Row>
      <S.Row>
        <FlexBox.Vertical gap="1.6rem">
          {!isError &&
            !isPending &&
            buildings.buildings.map((building, idx) => (
              <Fragment key={building.buildingId}>
                <BuildingCard {...building} />
                {idx !== buildings.buildings.length - 1 && <S.Splitter />}
              </Fragment>
            ))}
        </FlexBox.Vertical>
      </S.Row>
      <S.Splitter />
      <Link to={`${ROUTE_PATH.buildingMap}`}>
        <FloatingButton onClick={() => {}} position="center" size="extends">
          <MapLogoIcon />
          지도
        </FloatingButton>
      </Link>
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

export default BuildingListPage;
