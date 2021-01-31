import * as validator from '../../services/validator';

module.exports = async (req) => {
  const { yup, validate } = validator;

  const schema = validator.yup.object().shape({
    name: yup.string(),
    type: yup.string(),
    situation: yup.string(),
    address_id: yup.number(),
  });

  await validate(schema, req.body);
};
