import styled from '@emotion/styled';

import SearchIcon from '@/assets/icons/map/SearchIcon';
import Header from '@/components/_common/Header/Header';
import useModal from '@/hooks/useModal';
import theme from '@/styles/theme';

function BuildingMapPage() {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
    {/*
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
 */}
      <Header center="건물리스트" />
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

export default BuildingMapPage;
