import ErrorList from '../../config/errors';

const handleErrors = (err, req, res, next) => {
  const code = err.code || 'INTERNAL_SERVER_ERROR';

  const { status, message } = ErrorList[`${code}`];

  res.status(status).json({
    error: {
      code,
      message,
    },
  });
};

module.exports = handleErrors;
