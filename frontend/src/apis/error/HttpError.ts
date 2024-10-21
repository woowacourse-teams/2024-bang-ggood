import { HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from '@/constants/message/httpErrorMessage';

class HTTPError extends Error {
  statusCode: number;

  //TODO: 나중에 메세지를 에러 상태코드 객체를 사용하도록 바꾸기
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;

    switch (true) {
      case statusCode >= HTTP_STATUS_CODE.SERVER_ERROR:
        this.name = 'SERVER_ERROR';
        this.message = HTTP_ERROR_MESSAGE.SERVER_ERROR;
        break;
      case statusCode === HTTP_STATUS_CODE.UNAUTHORIZED:
        this.name = 'AUTHENTICATION_FAILED';
        //this.message = HTTP_ERROR_MESSAGE.UNAUTHORIZED;
        break;
      case statusCode >= HTTP_STATUS_CODE.CONFLICT:
        this.name = 'CONFLICT';
        this.message = HTTP_ERROR_MESSAGE.CONFLICT;
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
