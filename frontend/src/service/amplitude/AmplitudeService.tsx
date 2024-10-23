import * as amplitude from '@amplitude/analytics-browser';

import { getBrowser } from '@/service/amplitude/getBrowser';

export class AmplitudeService {
  private env: string;
  private browser: string;

  constructor() {
    this.env = process.env.NODE_ENV ?? '';
    this.browser = getBrowser();
  }

  customTrack(eventName: string, eventProps: Record<string, unknown> = {}) {
    amplitude.track(eventName, {
      environment: this.env,
      browser: this.browser,
      ...eventProps,
    });
  }
}
