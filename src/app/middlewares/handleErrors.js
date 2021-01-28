import ErrorList from '../../config/errors';

const handleErrors = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }

  let status = 500;
  let message = 'Ops, ocorreu um erro interno, tente novamente mais tarde';
  let code = 'INTERNAL_SERVER_ERROR';

  const error = ErrorList[`${err.code}`];

  if (error) {
    status = error.status;
    message = error.message;
    code = err.code;
  }

  res.status(status).json({
    error: {
      code,
      message,
    },
  });
};

module.exports = handleErrors;
