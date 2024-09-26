import HTTPError from '@/apis/error/HttpError';
import { Interceptor } from '@/apis/Interceptor';
import { HTTP_STATUS_CODE } from '@/constants/httpErrorMessage';

interface RequestProps {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: object[] | object;
  headers?: Record<string, string>;
  credentials?: string;
}
type FetchProps = Omit<RequestProps, 'method'>;

class ApiClient {
  private headers: HeadersInit = {};
  interceptor: Interceptor = new Interceptor(
    request => request,
    error => error,
  );

  constructor(headers?: HeadersInit) {
    if (!headers) return;
    this.headers = headers;
  }

  setHeaders(headers: HeadersInit) {
    this.headers = headers;
  }

  setInterceptor(interceptor: Interceptor) {
    this.interceptor = interceptor;
  }

  async get<R>(url: string, body?: object) {
    return (await this.fetch('GET', url, body)).json() as R;
  }
  async post(url: string, body?: object) {
    return await this.fetch('POST', url, body);
  }
  async delete(url: string, body?: object) {
    return await this.fetch('DELETE', url, body);
  }
  async patch(url: string, body?: object) {
    return await this.fetch('PATCH', url, body);
  }

  private async fetch(method: 'GET' | 'POST' | 'DELETE' | 'PATCH', url: string, requestBody?: object, headers = {}) {
    const requestInit: RequestInit = {
      method,
      headers: { ...this.headers, ...headers },
      body: JSON.stringify(requestBody),
    };
    const interceptedRequest = this.interceptor.onRequest({ ...requestInit, url });
    const response = await fetch(interceptedRequest.url, interceptedRequest);

    if (!response.ok) {
      // const errorText = await response.text(); TODO : 에러메시지를 HTTPError에 전달.
      const responseError = new HTTPError(response.status);
      const interceptedError = this.interceptor.onError(responseError);
      throw interceptedError;
    }
    return response;
  }
}

const apiClient = new ApiClient();

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
