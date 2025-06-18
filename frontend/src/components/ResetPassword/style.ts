import styled from '@emotion/styled';

import { flexCenter, flexColumn } from '@/styles/common';
import { fontStyle } from '@/utils/fontStyle';

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
    color: ${({ theme, disabled }) => (disabled ? theme.color.gray[300] : theme.color.secondary[500])};

    ${({ theme }) => fontStyle(theme.font.body[1].B)}
    line-height: 2;
    white-space: nowrap;
    border-radius: 1rem;
  `,
  Box: styled.div`
    ${flexColumn}
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
