interface RequestProps {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: object[] | object;
  headers?: Record<string, string>;
  errorMessage?: string;
}
type FetchProps = Omit<RequestProps, 'method'>;

const request = async ({ url, method, body, headers = {}, errorMessage }: RequestProps) => {
  const response = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      // Authorization: 'token들어갈 자리',
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${errorMessage}`);
  }

  return response;
};

const networkRequest = async ({ url, method, body, headers = {}, errorMessage }: RequestProps) => {
  const response = await request({ url, method, body, headers, errorMessage });
  if (!response) {
    throw new Error('네트워크 에러입니다.');
  }
  return response;
};

const fetcher = {
  get({ url, headers }: FetchProps) {
    return networkRequest({ url, method: 'GET', headers });
  },

  post({ url, body, headers }: FetchProps) {
    return networkRequest({ url, method: 'POST', body, headers: { ...headers, 'Content-Type': 'application/json' } });
  },

  delete({ url, headers }: FetchProps) {
    return networkRequest({ url, method: 'DELETE', headers });
  },

  patch({ url, body, headers }: FetchProps) {
    return networkRequest({ url, method: 'PATCH', body, headers: { ...headers, 'Content-Type': 'application/json' } });
  },

  put({ url, headers }: FetchProps) {
    return networkRequest({ url, method: 'PUT', headers: { ...headers, 'Content-Type': 'application/json' } });
  },
};

export default fetcher;
