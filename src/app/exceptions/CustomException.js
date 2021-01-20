import ErrorList from '../../config/errors';

export default class CustomException extends Error {
  constructor(code, customMessage) {
    const { status, message } = ErrorList[`${code}`];

    super(customMessage || message);

    this.status = status;
    this.code = code;
    this.message = customMessage || message;
    Error.captureStackTrace(this, this.constructor);
  }
}
