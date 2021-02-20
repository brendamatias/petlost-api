import * as validator from '../../../utils/validator';

module.exports = async (request) => {
  const { yup, validate } = validator;

  const schema = yup.object().shape({
    name: yup.string().trim().required(),
    type: yup.string().required().oneOf(['dog', 'cat']),
    gender: yup.string().required().oneOf(['female', 'male']),
    situation: yup
      .string()
      .required()
      .oneOf(['adoption', 'disappeared', 'mating']),
    birth_date: yup.date().max(new Date()).required(),
    description: yup.string().trim().required(),
    status: yup.boolean().oneOf([true, false]),
    state: yup.string().min(2).max(2).required(),
    city: yup.string().required(),
    breed_id: yup.string().uuid().required(),
  });

  await validate(schema, request);
};
