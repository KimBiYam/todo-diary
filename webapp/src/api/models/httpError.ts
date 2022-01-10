class HttpError {
  constructor(statusCode: number | undefined, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }

  readonly statusCode: number | undefined;

  readonly message: string;
}

export default HttpError;
