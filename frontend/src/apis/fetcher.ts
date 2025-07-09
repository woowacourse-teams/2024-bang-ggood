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

const fetchRequest = async ({ url, method, body, headers = {} }: RequestProps & { signal?: AbortSignal }) => {
  let finalBody = undefined;
  let finalHeaders = { ...headers };

  if (body instanceof FormData) {
    finalBody = body;
  } else if (body) {
    finalBody = JSON.stringify(body);
    finalHeaders['Content-Type'] = 'application/json';
  }

  return await fetch(url, {
    method,
    credentials: 'include',
    body: finalBody,
    headers: finalHeaders,
  });
};

const fetcher = {
  get({ url, headers }: FetchProps) {
    return request({ url, method: 'GET', headers });
  },

  post({ url, body, headers, ...rest }: FetchProps) {
    return request({
      url,
      method: 'POST',
      body,
      headers,
      ...rest,
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
      headers,
    });
  },

  put({ url, body, headers }: FetchProps) {
    return request({
      url,
      method: 'PUT',
      body,
      headers,
    });
  },

  postMultipart({ url, body, headers, ...rest }: FetchProps) {
    return request({
      url,
      method: 'POST',
      body,
      headers,
      ...rest,
    });
  },

  putMultipart({ url, body, headers, ...rest }: FetchProps) {
    return request({
      url,
      method: 'PUT',
      body,
      headers,
      ...rest,
    });
  },
};

export default fetcher;
