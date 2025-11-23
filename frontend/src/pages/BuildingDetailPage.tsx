import styled from '@emotion/styled';

import SearchIcon from '@/assets/icons/map/SearchIcon';
import Header from '@/components/_common/Header/Header';
import { useGetBuildingDetailQuery } from '@/hooks/query/useGetBuildingDetailQuery ';
import useModal from '@/hooks/useModal';
import theme from '@/styles/theme';
import { useRef, useState } from 'react';

function BuildingDetailPage() {
  const {
    data: buildings,
    isPending,
    isError,
  } = useGetBuildingDetailQuery(1,{lastCursor: '2025-05-01'});

  const { isModalOpen, openModal, closeModal } = useModal();

  const buildings2 = ["http://placehold.co/400x250", "http://placehold.co/600x400"];
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
      <Carousel images={buildings2 ?? []} />
    </>
  );
}


export const Carousel = ({images}:{images:string[]}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    setCurrentIndex(index);
  };

  return (
    <SC.Wrapper>
      <SC.ScrollBox ref={scrollRef} onScroll={handleScroll}>
        {[...images].map(image => (
          <SC.Slide key={image}>
            <img src={image} alt="image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

          </SC.Slide>
        ))}
      </SC.ScrollBox>

      <SC.DotContainer>
        {[...images].map((_, idx) => (
          <SC.Dot key={idx} active={idx === currentIndex} />
        ))}
      </SC.DotContainer>
    </SC.Wrapper>
  );
};

const SC = {
  Wrapper: styled.section`
    display: flex;
    position: relative;
    width: 100%;
    flex-direction: column;
    align-items: center;
  `,

  ScrollBox: styled.div`
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  Slide: styled.div`
    flex-shrink: 0;
    scroll-snap-align: start;
    width: 100%;
    max-width: 100%;
  `,
  DotContainer: styled.div`
    display: flex;
    position: absolute;
    bottom: 10px;
    margin-top: 1rem;
    gap: 0.5rem;
  `,
  Dot: styled.div<{ active: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;

    background-color: ${({ active, theme }) => (active ? theme.color.gray[500] : theme.color.gray[100])};
    transition: background-color 0.3s;
  `,
};


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
