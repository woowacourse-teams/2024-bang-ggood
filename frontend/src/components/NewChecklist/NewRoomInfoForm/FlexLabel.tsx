import styled from '@emotion/styled';

import FormField from '@/components/_common/FormField/FormField';

const FlexLabel = styled(FormField.Label)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;

  font-weight: ${({ theme }) => theme.text.weight.bold};
  white-space: pre;
`;
export default FlexLabel;
