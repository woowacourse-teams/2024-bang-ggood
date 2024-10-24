import { ErrorBoundary } from 'react-error-boundary';

import GuestFeature from '@/components/MyPage/GuestFeature';
import UserFeature from '@/components/MyPage/UserFeature';

const FeatureSection = () => {
  return (
    <ErrorBoundary FallbackComponent={GuestFeature}>
      <UserFeature />
    </ErrorBoundary>
  );
};

export default FeatureSection;
