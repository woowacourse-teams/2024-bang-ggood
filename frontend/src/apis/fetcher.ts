import HTTPError from '@/apis/error/HttpError';
import { HTTP_STATUS_CODE } from '@/constants/httpErrorMessage';

interface RequestProps {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: object[] | object;
  headers?: Record<string, string>;
  credentials?: string;
}
type FetchProps = Omit<RequestProps, 'method'>;

const request = async ({ url, method, body, headers = {} }: RequestProps) => {
  try {
    const response = await fetch(url, {
      method,
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...headers,
      },
    });

    if (!response.ok || !response) {
      throw new HTTPError(response.status);
    }
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    } else {
      throw new HTTPError(HTTP_STATUS_CODE.NETWORK_ERROR);
    }
  }
};

const fetcher = {
  get({ url, headers }: FetchProps) {
    return request({ url, method: 'GET', headers });
  },

  post({ url, body, headers }: FetchProps) {
    return request({
      url,
      method: 'POST',
      body,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  },

  delete({ url, headers }: FetchProps) {
    return request({ url, method: 'DELETE', headers });
  },

  patch({ url, body, headers }: FetchProps) {
    return request({
      url,
      method: 'PATCH',
      body,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  },

  put({ url, body, headers }: FetchProps) {
    return request({
      url,
      method: 'PUT',
      body,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  },
};

export default fetcher;
