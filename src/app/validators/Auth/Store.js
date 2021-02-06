import * as validator from '../../../utils/validator';

module.exports = async (request) => {
  const { yup, validate } = validator;

  const schema = yup.object().shape({
    email: yup.string().trim().email().required(),
    password: yup.string().trim().required(),
  });

  await validate(schema, request);
};
