import TopButton from '@/components/_common/TopButton/TopButton';
import CS from '@/components/Landing/style';

const FifthSection = () => {
  return (
    <CS.Container>
      <CS.Title>
        방끗과 함께
        <br />딱 맞는 집을 찾으러 가볼까요?
      </CS.Title>

      <div style={{ width: '80%' }}>
        <TopButton text={'시작하기!'} />
      </div>
    </CS.Container>
  );
};

export default FifthSection;
