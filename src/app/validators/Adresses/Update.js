import * as validator from '../../services/validator';

module.exports = async (request) => {
  const { yup, validate } = validator;

  const schema = yup.object({
    address: yup.string().trim(),
    neighborhood: yup.string().trim(),
    number: yup.string().trim(),
    complement: yup.string().trim(),
    city: yup.string().trim(),
    state: yup.string().trim().min(2).max(2),
    zipcode: yup.string().trim().min(9).min(9),
  });

  await validate(schema, request);
};
