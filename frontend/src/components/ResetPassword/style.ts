import styled from '@emotion/styled';

import { flexCenter, title3 } from '@/styles/common';

const CS = {
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
  SendButton: styled.button<{ disabled?: boolean }>`
    padding: 0 1.2rem;
    cursor: pointer;

    ${flexCenter}
    background-color: ${({ theme, disabled }) => (disabled ? theme.palette.green300 : theme.palette.green500)};

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

export default CS;
