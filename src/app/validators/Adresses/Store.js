import * as validator from '../../services/validator';

module.exports = async (request) => {
  const { yup, validate } = validator;

  const schema = yup.object({
    address: yup.string().trim().required(),
    neighborhood: yup.string().trim().required(),
    number: yup.string().trim().required(),
    complement: yup.string().trim(),
    city: yup.string().trim().required(),
    state: yup.string().trim().required().min(2).max(2),
    zipcode: yup.string().trim().required().min(9).max(9),
  });

  await validate(schema, request);
};
