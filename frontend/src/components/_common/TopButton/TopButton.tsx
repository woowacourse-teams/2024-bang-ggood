import Button from '@/components/_common/Button/Button';

const TopButton = ({ text }: { text: string }) => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return <Button onClick={scrollToTop} label={text} rounded color="primary" size="full" />;
};

export default TopButton;
