import { API_ERROR_MESSAGE } from '@/apis/error/ErrorMessage';
import HTTPError from '@/apis/error/HttpError';
import { postReissueAccessToken } from '@/apis/user';

let reissueAccessToken = false;
let reissueAccessTokenFailed = false;

interface RequestProps {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: object[] | object;
  headers?: Record<string, string>;
  credentials?: string;
}

type FetchProps = Omit<RequestProps, 'method'>;

const request = async ({ url, method, body, headers = {} }: RequestProps) => {
  if (reissueAccessTokenFailed) {
    //TODO: 토큰 재발급 실패 후 후 요청 안보내는 로직 필요
    throw new HTTPError(400, 'Access Token 재발급 실패로 인해 요청이 중단되었습니다.');
  }

  try {
    const response = await fetchRequest({ url, method, body, headers });
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      if (error.statusCode === 401 && error.message === API_ERROR_MESSAGE.REISSUE_TOKEN_NEED && !reissueAccessToken) {
        reissueAccessToken = true;
        const response = await postReissueAccessToken();

        if (response.status === 200) {
          reissueAccessToken = false;
          return retryRequest({ url, method, body, headers });
        }

        reissueAccessTokenFailed = true;
        //TODO: 로그아웃 후 이동시키는 로직 필요
        //logout()
        //window.location.href = ROUTE_PATH.root;
      }
      throw error;
    } else {
      throw new HTTPError(400, '네트워크 에러가 발생했습니다.');
    }
  }
};

const fetchRequest = async ({ url, method, body, headers = {}, signal }: RequestProps & { signal?: AbortSignal }) => {
  const response = await fetch(url, {
    method,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      ...headers,
    },
    signal: signal,
  });

  if (!response.ok) {
    const responseString = await response.text();
    const errorMessage = JSON.parse(responseString).message;
    throw new HTTPError(response.status, errorMessage);
  }

  return response;
};

const retryRequest = async ({ url, method, body, headers = {}, signal }: RequestProps & { signal?: AbortSignal }) => {
  try {
    const response = await fetchRequest({ url, method, body, headers, signal });
    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      throw new HTTPError(error.statusCode, error.message);
    } else {
      throw new HTTPError(400, '네트워크 에러가 발생했습니다.');
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
