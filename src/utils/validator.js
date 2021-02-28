/* eslint-disable no-template-curly-in-string */

import * as yup from 'yup';
import { version as uuidVersion, validate as uuidValidate } from 'uuid';

import BaseException from '../app/exceptions/ValidatorException';

function uuidValidateV4(uuid) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

yup.addMethod(yup.string, 'uuid', () => {
  return yup.mixed().test(`uuid`, (value) => {
    return uuidValidateV4(value);
  });
});

yup.setLocale({
  mixed: {
    default: 'é inválido',
    required: 'é um campo obrigatório',
    oneOf: 'deve ser um dos seguintes valores: ${values}',
    notOneOf: 'não pode ser um dos seguintes valores: ${values}',
  },
  string: {
    length: 'deve ter exatamente ${length} caracteres',
    min: 'deve ter pelo menos ${min} caracteres',
    max: 'deve ter no máximo ${max} caracteres',
    email: 'tem o formato de e-mail inválido',
    url: 'deve ter um formato de URL válida',
    trim: 'não deve conter espaços no início ou no fim.',
    lowercase: 'deve estar em maiúsculo',
    uppercase: 'deve estar em minúsculo',
  },
  number: {
    min: 'deve ser no mínimo ${min}',
    max: 'deve ser no máximo ${max}',
    lessThan: 'deve ser menor que ${less}',
    moreThan: 'deve ser maior que ${more}',
    notEqual: 'não pode ser igual à ${notEqual}',
    positive: 'deve ser um número posítivo',
    negative: 'deve ser um número negativo',
    integer: 'deve ser um número inteiro',
  },
  date: {
    min: 'deve ser maior que a data ${min}',
    max: 'deve ser menor que a data ${max}',
  },
  array: {
    min: 'deve ter no mínimo ${min} itens',
    max: 'deve ter no máximo ${max} itens',
  },
});

const validate = (schema, data) => {
  return schema
    .validate(data, { abortEarly: false })
    .then(() => {
      return null;
    })
    .catch((err) => {
      throw new BaseException(err.inner);
    });
};

module.exports = { yup, validate };