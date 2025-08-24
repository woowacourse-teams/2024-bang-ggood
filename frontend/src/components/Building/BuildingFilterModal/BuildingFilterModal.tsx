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

interface SelectedStation {
  region: string;
  line: string;
  station: string;
}
function BuildingFilterModal({ isOpen, onFilter, buildingCount }: BuildingFilterModalProps) {
  const [selectedStations, setSelectedStations] = useState<SelectedStation[]>([]);

  const removeStation = (station: SelectedStation) =>
    setSelectedStations(prev => prev.filter(s => !isEqual(s, station)));
  const toggleStation = (data: SelectedStation) => {
    setSelectedStations(prevs =>
      prevs.some(p => isEqual(p, data)) // 이미 선택된 지하철역인지 확인
        ? prevs.filter(s => !isEqual(s, data)) // 이미 선택된 지하철역이면 제거
        : prevs.length < 5
          ? [...prevs, data] // 선택된 지하철역이 5개 미만이면 추가
          : prevs,
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

// 두 object의 키-밸류가 모두 동일한지 확인하는 함수
function isEqual(obj1: object, obj2: object) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(key => obj1[key] === obj2[key]);
}

export default BuildingFilterModal;
