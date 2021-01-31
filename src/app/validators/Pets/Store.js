import * as validator from '../../services/validator';

module.exports = async (request) => {
  const { yup, validate } = validator;

  const schema = validator.yup.object().shape({
    name: yup.string().required().trim(),
    type: yup.string().required().oneOf(['dog', 'cat']),
    situation: yup
      .string()
      .required()
      .oneOf(['adoption', 'disappeared', 'mating']),
    status: yup.boolean().oneOf([true, false]),
    address_id: yup.number().required(),
  });

  await validate(schema, request);
};
