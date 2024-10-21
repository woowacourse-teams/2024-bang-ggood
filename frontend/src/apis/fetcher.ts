import { API_ERROR_MESSAGE } from '@/apis/error/ErrorMessage';
import HTTPError from '@/apis/error/HttpError';
import { deleteToken, postReissueAccessToken } from '@/apis/user';
import { HTTP_STATUS_CODE } from '@/constants/message/httpErrorMessage';
import { ROUTE_PATH } from '@/constants/routePath';

let reissueAccessToken = false;

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
    const response = await fetchRequest({ url, method, body, headers });
    if (!response.ok) {
      await handleError(response, { url, method, body, headers });
    }
    return response;
  } catch (error) {
    if (error instanceof HTTPError) throw error;
    throw new HTTPError(HTTP_STATUS_CODE.NETWORK_ERROR, '네트워크 에러가 발생했습니다.');
  }
};

const handleError = async (response: Response, { url, method, body, headers = {} }: RequestProps) => {
  const responseString = await response.clone().text();
  const errorMessage = JSON.parse(responseString).message;

  if (response.status === 401 && errorMessage === API_ERROR_MESSAGE.REISSUE_TOKEN_NEED) {
    if (reissueAccessToken) {
      throw new HTTPError(response.status, errorMessage);
    }
    /* accessToken 발급을 한번도 시도 안했을 때 */
    reissueAccessToken = true;
    try {
      const accessTokenReissueResult = await postReissueAccessToken();
      if (accessTokenReissueResult?.status === 200) {
        reissueAccessToken = false;
        return await fetchRequest({ url, method, body, headers });
      }
    } catch (err) {
      await deleteToken();
      window.location.href = ROUTE_PATH.root;
    }
  }
  throw new HTTPError(response.status, errorMessage);
};

const fetchRequest = async ({ url, method, body, headers = {} }: RequestProps & { signal?: AbortSignal }) => {
  return await fetch(url, {
    method,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      ...headers,
    },
  });
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
