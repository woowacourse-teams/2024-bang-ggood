import Button from '@/components/_common/Button/Button';
import FormField from '@/components/_common/FormField/FormField';
import Modal from '@/components/_common/Modal/Modal';
import ModalBody from '@/components/_common/Modal/ModalBody';
import ModalHeader from '@/components/_common/Modal/ModalHeader';
import { useTabContext } from '@/components/_common/Tabs/TabContext';
import Text from '@/components/_common/Text/Text';
import { RequestParamPostCustomQuestion } from '@/hooks/query/usePostCustomQuestionMutation';
import useInput from '@/hooks/useInput';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (question: RequestParamPostCustomQuestion) => void;
}

function AddCustomQuestionModal({ isOpen, onClose, onConfirm }: Props) {
  const { currentTabId } = useTabContext();
  const { value, onChange } = useInput('');

  return (
    <Modal isOpen={isOpen} hasCloseButton onClose={onClose} position="bottom">
      <ModalHeader title="내 질문 추가" />
      <ModalBody>
        <FormField>
          <FormField.Input
            value={value}
            onChange={onChange}
            width="full"
            placeholder="나에게 필요한 질문을 직접 추가할 수 있어요."
            variant="default"
          />
        </FormField>
        <Text typography={font => font.caption[1].R} color={theme => theme.gray[400]}>
          기본 질문 외에도 스스로 궁금한 점을 직접 추가할 수 있어요. 나만의 체크리스트를 만들어 보세요.
        </Text>
        <Button
          color="primary"
          label="완료"
          onClick={() => onConfirm({ categoryId: currentTabId, title: value, subtitle: '' })}
          size="full"
          style={{ marginTop: '2rem' }}
        />
      </ModalBody>
    </Modal>
  );
}

export default AddCustomQuestionModal;
