import { useEffect } from 'react';

import { AmplitudeService } from '@/service/amplitude/AmplitudeService';

interface Props {
  eventName: string;
  eventProps?: Record<string, unknown>;
}

export const useTrackPageView = ({ eventName, eventProps }: Props) => {
  const amplitudeService = new AmplitudeService();

  useEffect(() => {
    amplitudeService.customTrack(eventName, eventProps ?? {});
  }, []);
};
