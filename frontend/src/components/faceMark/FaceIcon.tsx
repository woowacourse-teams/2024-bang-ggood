import styled from '@emotion/styled';

import {
  FaceIconBad,
  FaceIconBadGray,
  FaceIconGood,
  FaceIconGoodGray,
  FaceIconSoso,
  FaceIconSosoGray,
} from '@/assets/assets';

interface FaceIconProps extends React.HTMLAttributes<HTMLDivElement> {
  emotion: 'good' | 'bad' | 'soso';
  fill?: boolean;
}

const FaceIcon = ({ emotion, fill = false, ...rest }: FaceIconProps) => {
  return (
    <>
      {emotion === 'good' && fill && (
        <S.Wrapper {...rest}>
          <FaceIconGood />
          <S.Label>좋아요</S.Label>
        </S.Wrapper>
      )}
      {emotion === 'good' && !fill && (
        <S.Wrapper {...rest}>
          <FaceIconGoodGray />
          <S.Label>좋아요</S.Label>
        </S.Wrapper>
      )}
      {emotion === 'soso' && fill && (
        <S.Wrapper {...rest}>
          <FaceIconSoso />
          <S.Label>평범해요</S.Label>
        </S.Wrapper>
      )}
      {emotion === 'soso' && !fill && (
        <S.Wrapper {...rest}>
          <FaceIconSosoGray />
          <S.Label>평범해요</S.Label>
        </S.Wrapper>
      )}
      {emotion === 'bad' && fill && (
        <S.Wrapper {...rest}>
          <FaceIconBad />
          <S.Label>별로예요</S.Label>
        </S.Wrapper>
      )}
      {emotion === 'bad' && !fill && (
        <S.Wrapper {...rest}>
          <FaceIconBadGray />
          <S.Label>별로예요</S.Label>
        </S.Wrapper>
      )}
      {emotion === null && (
        <S.Wrapper {...rest}>
          <FaceIconSosoGray />
          <S.Label>알수없어요</S.Label>
        </S.Wrapper>
      )}
    </>
  );
};

export default FaceIcon;

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  `,
  Label: styled.p`
    color: ${({ theme }) => theme.palette.grey500};
    font-size: ${({ theme }) => theme.text.size.small};
  `,
};
