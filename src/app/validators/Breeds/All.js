import * as validator from '../../../utils/validator';

module.exports = async (request) => {
  const { yup, validate } = validator;

  if (request.type && !Array.isArray(request.type)) {
    request.type = [request.type];
  }
  const schema = yup.object().shape({
    type: yup
      .array()
      .of(yup.string().oneOf(['dog', 'cat']))
      .required(),
  });

  await validate(schema, request);
};
