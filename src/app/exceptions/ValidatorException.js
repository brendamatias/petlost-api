class ValidatorException extends Error {
  constructor(errors) {
    super(errors.errors);

    const formattedErrors = errors.map((err) => {
      return { code: err.type, field: err.path, message: err.message };
    });

    this.errors = formattedErrors;
    this.name = 'ValidationError';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ValidatorException;
