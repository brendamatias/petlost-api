import * as validator from '../../services/validator';

module.exports = async (request) => {
  const { yup, validate } = validator;

  const schema = yup.object().shape({
    token: yup.string().trim().required(),
    password: yup.string().trim().min(6).required(),
    confirmPassword: yup
      .string()
      .trim()
      .required()
      .oneOf(
        [yup.ref('password')],
        'Confirmação de senha deve ser igual a senha'
      ),
  });

  await validate(schema, request);
};
