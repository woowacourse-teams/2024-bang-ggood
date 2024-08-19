import styled from '@emotion/styled';

import Button from '@/components/_common/Button/Button';

const TopButton = ({ text }: { text: string }) => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return <S.ButtonBox onClick={scrollToTop} label={text} />;
};

export default TopButton;

const S = {
  ButtonBox: styled(Button)`
    width: 140px;
    padding: 10px;
    background-color: ${({ theme }) => theme.palette.yellow600};
  `,
};
