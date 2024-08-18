import { HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from '@/apis/error/constants';

class HTTPError extends Error {
  statusCode: number;

  constructor(statusCode: number) {
    super();
    this.statusCode = statusCode;

    switch (true) {
      case statusCode >= HTTP_STATUS_CODE.SERVER_ERROR:
        this.name = 'SERVER_ERROR';
        this.message = HTTP_ERROR_MESSAGE.SERVER_ERROR;
        break;
      case statusCode === HTTP_STATUS_CODE.UNAUTHORIZED:
        this.name = 'AUTHENTICATION_FAILED';
        this.message = HTTP_ERROR_MESSAGE.UNAUTHORIZED;
        break;
      case statusCode === HTTP_STATUS_CODE.NETWORK_ERROR:
        this.name = 'NETWORK_ERROR';
        this.message = HTTP_ERROR_MESSAGE.NETWORK_ERROR;
        break;
      default:
        this.name = 'FETCHING_ERROR';
        this.message = HTTP_ERROR_MESSAGE.FETCH_FAILED;
        break;
    }

    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

export default HTTPError;
