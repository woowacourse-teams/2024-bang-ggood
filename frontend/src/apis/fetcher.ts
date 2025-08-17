import { captureException } from '@sentry/react';

import APIError from '@/apis/error/APIError';
import { deleteToken, postReissueAccessToken } from '@/apis/user';
import { API_ERROR_MESSAGE } from '@/constants/messages/apiErrorMessage';
import { ROUTE_PATH } from '@/constants/routePath';

let reissueAccessToken = false;

interface RequestProps {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
  body?: object[] | object;
  headers?: Record<string, string>;
  credentials?: string;
  params?: object;
}

type FetchProps = Omit<RequestProps, 'method'>;

const request = async (requestProps: RequestProps) => {
  try {
    const response = await fetchRequest(requestProps);

    if (!response.ok) {
      await handleError(response, requestProps);
    }

    return response;
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError(404, API_ERROR_MESSAGE.NETWORK_ERROR);
  }
};

const handleError = async (response: Response, requestProps: RequestProps) => {
  const responseString = await response.clone().text();
  const errorCode = JSON.parse(responseString).bangggoodCode;

  if (response.status === 401 && errorCode === 'AUTH_ACCESS_TOKEN_EMPTY') {
    return handleUnauthorizedError(response, requestProps, errorCode);
  }

  const apiError = new APIError(response.status, errorCode);
  captureException(apiError);
  throw apiError;
};

const handleUnauthorizedError = async (response: Response, requestProps: RequestProps, errorCode: string) => {
  if (reissueAccessToken) {
    throw new APIError(response.status, errorCode);
  }

  /* accessToken 발급을 한번도 시도 안했을 때 */
  reissueAccessToken = true;
  try {
    const accessTokenReissueResult = await postReissueAccessToken();
    if (accessTokenReissueResult?.status === 200) {
      reissueAccessToken = false;
      return await fetchRequest(requestProps);
    }
  } catch (err) {
    await deleteToken();
    window.location.href = ROUTE_PATH.root;
  }
};

const fetchRequest = async ({ url, method, body, headers = {}, params }: RequestProps & { signal?: AbortSignal }) => {
  const newUrl = new URL(url);
  if (params) {
    Object.keys(params).forEach(k => {
      const key = k as keyof typeof params;
      newUrl.searchParams.append(key, JSON.stringify(params[key]));
    });
  }
  return await fetch(newUrl, {
    method,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      ...headers,
    },
  });
};

const fetcher = {
  get({ url, headers, params }: FetchProps) {
    return request({ url, method: 'GET', headers, params });
  },

  post({ url, body, headers, ...rest }: FetchProps) {
    return request({
      url,
      method: 'POST',
      body,
      headers: { ...headers, 'Content-Type': 'application/json' },
      ...rest,
    });
  },

  delete({ url, headers, ...rest }: FetchProps) {
    return request({ url, method: 'DELETE', headers, ...rest });
  },

  patch({ url, body, headers, ...rest }: FetchProps) {
    return request({
      url,
      method: 'PATCH',
      body,
      headers: { ...headers, 'Content-Type': 'application/json' },
      ...rest,
    });
  },

  put({ url, body, headers, ...rest }: FetchProps) {
    return request({
      url,
      method: 'PUT',
      body,
      headers: { ...headers, 'Content-Type': 'application/json' },
      ...rest,
    });
  },
};

export default fetcher;
