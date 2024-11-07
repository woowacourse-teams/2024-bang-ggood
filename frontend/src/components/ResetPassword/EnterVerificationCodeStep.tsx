import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BangBangIcon, BangGgoodTextIcon } from '@/assets/assets';
import Button from '@/components/_common/Button/Button';
import FlexBox from '@/components/_common/FlexBox/FlexBox';
import FormField from '@/components/_common/FormField/FormField';
import Header from '@/components/_common/Header/Header';
import { ROUTE_PATH } from '@/constants/routePath';
import usePostResetPasswordMail from '@/hooks/query/usePostResetPasswordMail';
import useValidateInput from '@/hooks/useValidateInput';
import { flexCenter, title3 } from '@/styles/common';
import { ResetPasswordArgs } from '@/types/user';

interface Props {
  args: Pick<ResetPasswordArgs, 'email'>;
  onNext: (value: Pick<ResetPasswordArgs, 'email' | 'code'>) => void;
}

const SendVerificationEmailStep = ({ args: { email }, onNext }: Props) => {
  const [isComplete, setIsComplete] = useState(false);
  const [postErrorMessage, setPostErrorMessage] = useState('');
  const { mutate: postResetMail } = usePostResetPasswordMail();
  const {
    value: code,
    getErrorMessage: getEmailErrors,
    onChange: onChangeEmail,
    isValidated: isEmailValid,
  } = useValidateInput({
    initialValue: '',
    validates: [],
  });

  const handleClickSubmit = () =>
    postResetMail(code, {
      onSuccess: () => setIsComplete(true),
      onError: error => setPostErrorMessage(error.message),
    });
  const handleClickNext = () => {
    onNext({ code, email });
  };

  const canMove = isEmailValid && isComplete;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && canMove) {
      onNext({ code, email });
    }
  };

  const navigate = useNavigate();
  const handleClickBackward = () => navigate(ROUTE_PATH.root);

  return (
    <>
      <Header left={<Header.Backward onClick={handleClickBackward} />} />
      <S.Wrapper>
        <S.LogoBox>
          <BangBangIcon />
          <BangGgoodTextIcon aria-label="방끗 로고" />
        </S.LogoBox>
        <S.Box>
          <S.Label>비밀번호 찾기</S.Label>
          <FormField onKeyDown={handleKeyDown}>
            <FormField.Label label="검증 코드" />
            <FlexBox.Horizontal justify="flex-start" align="center">
              <FormField.Input
                maxLength={254}
                value={code}
                name="email"
                onChange={onChangeEmail}
                style={{ width: '25rem' }}
              />
              <div>
                <S.SendButton onClick={handleClickSubmit}>전송</S.SendButton>
              </div>
            </FlexBox.Horizontal>
            {getEmailErrors() && <FormField.ErrorMessage value={getEmailErrors()} />}
          </FormField>
          {postErrorMessage && <FormField.ErrorMessage value={postErrorMessage} />}
          <Button
            label="다음"
            size="full"
            isSquare={true}
            color={'dark'}
            onClick={handleClickNext}
            disabled={!canMove}
          />
        </S.Box>
      </S.Wrapper>
    </>
  );
};

export default SendVerificationEmailStep;

const S = {
  Wrapper: styled.div`
    ${flexCenter}
    height:calc(100dvh - 56px);
    flex-direction: column;
    gap: 1rem;
  `,
  LogoBox: styled.div`
    ${flexCenter}
    margin-bottom:50px;
    gap: 2rem;
  `,
  Label: styled.div`
    position: absolute;
    top: -4.2rem;
    padding: 1rem 1.4rem;
    border-radius: 1rem 1rem 0 0;
    ${title3}

    background-color: ${({ theme }) => theme.palette.green500};

    color: ${({ theme }) => theme.palette.white};
  `,
  SendButton: styled.div`
    padding: 0 1.2rem;
    cursor: pointer;

    ${flexCenter}
    background-color: ${({ theme }) => theme.palette.green500};

    color: ${({ theme }) => theme.palette.white};
    font-weight: ${({ theme }) => theme.text.weight.medium};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 2;
    white-space: nowrap;
    border-radius: 1rem;
  `,
  Box: styled.div`
    display: flex;
    position: relative;

    width: 30rem;
    margin-bottom: 0.5rem;
    padding: 1.6rem;

    background-color: ${({ theme }) => theme.palette.background};
    flex-direction: column;
    border-radius: 1rem;
    gap: 2rem;
  `,
};
