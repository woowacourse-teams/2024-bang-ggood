import * as amplitude from '@amplitude/analytics-browser';
import { useEffect } from 'react';

const amplitudeApiKey = process.env.AMPLITUDE_API_KEY ?? '';

const AmplitudeInitializer = ({ children }: React.PropsWithChildren) => {
  useEffect(() => {
    amplitude.init(amplitudeApiKey, undefined, {
      defaultTracking: {
        pageViews: false,
      },
      minIdLength: 1,
    });
  }, []);

  return children;
};

export default AmplitudeInitializer;
