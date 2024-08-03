import Textarea from '@/components/common/Textarea/Textarea';

interface Props {
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
const QuestionMemo = ({ text, onChange }: Props) => {
  return (
    <>
      <Textarea height="medium" value={text} onChange={onChange} />
    </>
  );
};

export default QuestionMemo;
