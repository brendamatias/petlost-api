import * as validator from '../../services/validator';

module.exports = async (request) => {
  const { yup, validate } = validator;

  const schema = yup.object().shape({
    email: yup.string().trim().email().required(),
  });

  await validate(schema, request);
};
