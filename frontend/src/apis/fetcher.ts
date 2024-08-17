import { HTTP_STATUS_CODE } from '@/error/constants';
import HttpError from '@/error/HttpError';

interface RequestProps {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: object[] | object;
  headers?: Record<string, string>;
  credentials?: string;
  errorMessage?: string;
}
type FetchProps = Omit<RequestProps, 'method'>;

const request = async ({ url, method, body, headers = {}, errorMessage }: RequestProps) => {
  const response = await fetch(url, {
    method,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${errorMessage}`);
  }

  return response;
};

const requestWithHandlingError = async ({ url, method, body, headers = {}, errorMessage }: RequestProps) => {
  const response = await request({ url, method, body, headers, errorMessage });
  if (!response) {
    throw new HttpError(HTTP_STATUS_CODE.NETWORK_ERROR);
  }

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  return response;
};

const fetcher = {
  get({ url, headers }: FetchProps) {
    return requestWithHandlingError({ url, method: 'GET', headers });
  },

  post({ url, body, headers }: FetchProps) {
    return requestWithHandlingError({
      url,
      method: 'POST',
      body,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  },

  delete({ url, headers }: FetchProps) {
    return requestWithHandlingError({ url, method: 'DELETE', headers });
  },

  patch({ url, body, headers }: FetchProps) {
    return requestWithHandlingError({
      url,
      method: 'PATCH',
      body,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  },

  put({ url, body, headers }: FetchProps) {
    return requestWithHandlingError({
      url,
      method: 'PUT',
      body,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  },
};

export default fetcher;
