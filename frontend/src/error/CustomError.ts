export const HTTP_STATUS_CODE: Record<string, HttpStatusCode> = {
  OK: 200,
  NETWORK_ERROR: 0,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
} as const;

type HttpStatusCode = 0 | 200 | 400 | 401 | 500;

interface Props {
  name: string;
  message: string;
  statusCode: HttpStatusCode;
}

class CustomError extends Error {
  statusCode: number;

  constructor({ message, statusCode, name }: Props) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export default CustomError;
