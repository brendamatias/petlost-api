import * as validator from '../../../utils/validator';

module.exports = async (request) => {
  const { yup, validate } = validator;

  const schema = yup.object().shape({
    message: yup.string().trim().required(),
    pet_id: yup.string().uuid().required(),
  });

  await validate(schema, request);
};
