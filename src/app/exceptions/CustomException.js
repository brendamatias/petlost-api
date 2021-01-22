import ErrorList from '../../config/errors';

class CustomException extends Error {
  constructor(code, customMessage) {
    const { status, message } = ErrorList[`${code}`];

    super(customMessage || message);

    this.status = status;
    this.code = code;
    this.message = customMessage || message;
    this.name = 'CustomException';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomException;
