type OnRequest = (a: Request) => Request;
type OnError = (error: Error) => Error;
export type Request = RequestInit & { url: string };
export class Interceptor {
  onRequest: OnRequest;
  onError: OnError;
  constructor(onRequest: OnRequest = req => req, onError: OnError = error => error) {
    this.onRequest = onRequest;
    this.onError = onError;
  }

  request(request: Request) {
    return this.onRequest(request);
  }
  error(error: Error) {
    return this.onError(error);
  }
}
