import * as validator from '../../services/validator';

module.exports = async (request) => {
  const { yup, validate } = validator;

  const schema = validator.yup.object().shape({
    name: yup.string().trim(),
    type: yup.string().oneOf(['dog', 'cat']),
    situation: yup.string().oneOf(['adoption', 'disappeared', 'mating']),
    status: yup.boolean().oneOf([true, false]),
    address_id: yup.number(),
  });

  await validate(schema, request);
};
