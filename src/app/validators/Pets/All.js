import * as validator from '../../services/validator';

module.exports = async (request) => {
  const { yup, validate } = validator;

  if (request.type && !Array.isArray(request.type)) {
    request.type = [request.type];
  }

  if (request.situation && !Array.isArray(request.situation)) {
    request.situation = [request.situation];
  }

  const schema = validator.yup.object().shape({
    page: yup.number().integer().moreThan(0),
    limit: yup.number().integer().moreThan(0),
    type: yup.array().of(yup.string().oneOf(['dog', 'cat'])),
    situation: yup
      .array()
      .of(yup.string().oneOf(['adoption', 'disappeared', 'mating'])),
  });

  await validate(schema, request);
};
