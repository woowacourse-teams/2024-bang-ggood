import Button from '@/components/_common/Button/Button';
import Modal from '@/components/_common/Modal/Modal';
import ModalBody from '@/components/_common/Modal/ModalBody';
import ModalFooter from '@/components/_common/Modal/ModalFooter';
import ModalHeader from '@/components/_common/Modal/ModalHeader';
import Text from '@/components/_common/Text/Text';
import BuildingListSearchBar from '@/components/Building/BuildingListSearchBar';

// 건물을 "인근 지하철역"을 기준으로 필터링하는 모달
interface BuildingFilterModalProps {
  isOpen: boolean;
  onFilter: (filters: { search: string }) => void;
  buildingCount: number;
}
function BuildingFilterModal({ isOpen, onFilter, buildingCount }: BuildingFilterModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalHeader>
        <Text typography={font => font.headline[2].B}>지하철</Text>
      </ModalHeader>
      <ModalBody>
        <BuildingListSearchBar onSearch={searchTerm => onFilter({ search: searchTerm })} />
      </ModalBody>
      <ModalFooter>
        <Button label="초기화" />
        <Button label={`${buildingCount}건 매물보기`} />
      </ModalFooter>
    </Modal>
  );
}

const subwayMap = {
  서울: { '1호선': ['서울역', '시청', '종각', '명동'] },
  경기: { '1호선': ['수원역', '화성행궁', '오산역'] },
  인천: { '1호선': ['인천역', '신포역', '차이나타운'] },
};

export default BuildingFilterModal;
