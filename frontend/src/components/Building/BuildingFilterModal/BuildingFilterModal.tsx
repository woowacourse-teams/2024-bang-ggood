import { useState } from 'react';

import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import ModalBody from '@/components/_common/Modal/ModalBody';
import ModalFooter from '@/components/_common/Modal/ModalFooter';
import ModalHeader from '@/components/_common/Modal/ModalHeader';
import Text from '@/components/_common/Text/Text';
import SelectedStations from '@/components/Building/BuildingFilterModal/SelectedStations';
import SubwayFilterTable from '@/components/Building/BuildingFilterModal/SubwayFilterTable';
import BuildingListSearchBar from '@/components/Building/BuildingListSearchBar';

// 건물을 "인근 지하철역"을 기준으로 필터링하는 모달
interface BuildingFilterModalProps {
  isOpen: boolean;
  onFilter: (filters: { search: string }) => void;
  buildingCount: number;
}
function BuildingFilterModal({ isOpen, onFilter, buildingCount }: BuildingFilterModalProps) {
  const [selectedStations, setSelectedStations] = useState<string[]>([]);

  const removeStation = (station: string) => setSelectedStations(prev => prev.filter(s => s !== station));
  const toggleStation = (station: string) => {
    setSelectedStations(prev =>
      prev.includes(station) ? prev.filter(s => s !== station) : prev.length < 5 ? [...prev, station] : prev,
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalHeader>
        <Text typography={font => font.headline[2].B}>지하철</Text>
      </ModalHeader>
      <ModalBody>
        <BuildingListSearchBar onSearch={searchTerm => onFilter({ search: searchTerm })} />
        <SubwayFilterTable onSelectSubwayStation={toggleStation} selectedStations={selectedStations} />
        <SelectedStations selectedStations={selectedStations} removeStation={removeStation} />
      </ModalBody>
      <ModalFooter>
        <Button label="초기화" />
        <Button label={`${buildingCount}건 매물보기`} />
      </ModalFooter>
    </Modal>
  );
}

export default BuildingFilterModal;
