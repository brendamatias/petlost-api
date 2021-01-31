import * as validator from '../../services/validator';

module.exports = async (request) => {
  const { yup, validate } = validator;

  const schema = validator.yup.object().shape({
    name: yup.string().trim(),
    email: yup.string().trim().email(),
    oldPassword: yup.string().trim().min(6),
    password: yup
      .string()
      .trim()
      .min(6)
      .when('oldPassword', (oldPasswordV, field) =>
        oldPasswordV ? field.required() : field
      ),
    confirmPassword: yup
      .string()
      .trim()
      .when('password', (passwordV, field) =>
        passwordV
          ? field
              .required()
              .oneOf(
                [yup.ref('password')],
                'Confirmação de senha deve ser igual a senha'
              )
          : field
      ),
  });

  await validate(schema, request);
};
