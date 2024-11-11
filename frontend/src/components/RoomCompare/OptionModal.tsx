import Modal from '@/components/_common/Modal/Modal';

interface Props {
  roomTitle1: string;
  roomTitle2: string;
  isOpen: boolean;
  closeModal: () => void;
}

//TODO: grid 로 수정
const RoomOptionModal = ({ roomTitle1, roomTitle2, isOpen, closeModal }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.header>옵션 비교</Modal.header>
      <Modal.body>
        <table>
          <tr>
            <th>옵션</th>
            <th>{roomTitle1}</th>
            <th>{roomTitle2}</th>
          </tr>
          <tr>
            <td>냉장고</td>
            <td>x</td>
            <td>o</td>
          </tr>
          <tr>
            <td>세탁기</td>
            <td>x</td>
            <td>o</td>
          </tr>
          <tr>
            <td>세탁기</td>
            <td>x</td>
            <td>o</td>
          </tr>
        </table>
      </Modal.body>
    </Modal>
  );
};

export default RoomOptionModal;
