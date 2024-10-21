import { ErrorBoundary } from 'react-error-boundary';

import GuestFunction from '@/components/MyPage/GuestFunction';
import UserFunction from '@/components/MyPage/UserFunction';

const FunctionSection = () => {
  return (
    <ErrorBoundary FallbackComponent={GuestFunction}>
      <UserFunction />;
    </ErrorBoundary>
  );
};

export default FunctionSection;
