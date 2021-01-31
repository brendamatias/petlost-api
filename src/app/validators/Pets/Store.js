import * as validator from '../../services/validator';

module.exports = async (req) => {
  const { yup, validate } = validator;

  const schema = validator.yup.object().shape({
    name: yup.string().required(),
    type: yup.string().required(),
    situation: yup.string().required(),
    status: yup.boolean().oneOf([true, false]),
    address_id: yup.number().required(),
  });

  await validate(schema, req.body);
};
