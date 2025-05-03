import styled from '@emotion/styled';

import { flexCenter } from '@/styles/common';

const CS = {
  Wrapper: styled.div`
    ${flexCenter}
    height:calc(100dvh - 56px);
    flex-direction: column;
    gap: 1rem;
    padding: 0 1.6rem;
  `,
  LogoBox: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    gap: 1rem;
    width: 100%;
  `,
  SendButton: styled.button<{ disabled?: boolean }>`
    position: absolute;
    right: 1rem;
    top: 1rem;
    padding: 0 1.2rem;
    cursor: pointer;

    ${flexCenter}
    color: ${({ theme, disabled }) => (disabled ? theme.palette.green300 : theme.palette.green500)};

    font-weight: ${({ theme }) => theme.text.weight.medium};
    font-size: ${({ theme }) => theme.text.size.small};
    line-height: 2;
    white-space: nowrap;
    border-radius: 1rem;
  `,
  Box: styled.div`
    display: flex;
    flex-direction: column;
    min-height: 26rem;
    flex-grow: 0;

    position: relative;

    width: 100%;
    margin-bottom: 0.5rem;

    border-radius: 1rem;
    gap: 1.2rem;
  `,
};

export default CS;
