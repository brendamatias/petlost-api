import * as validator from '../../../utils/validator';

module.exports = async (request) => {
  const { yup, validate } = validator;

  const schema = yup.object().shape({
    name: yup.string().trim(),
    type: yup.string().oneOf(['dog', 'cat']),
    gender: yup.string().oneOf(['female', 'male']),
    situation: yup.string().oneOf(['adoption', 'disappeared', 'mating']),
    birth_date: yup.date().max(new Date()),
    description: yup.string().trim(),
    status: yup.boolean().oneOf([true, false]),
    address_id: yup.string().uuid().required(),
    breed_id: yup.string().uuid().required(),
  });

  await validate(schema, request);
};
