export default {
  VALIDATION_FAILS: {
    status: 401,
    message: 'Validação falhou.',
  },
  USER_NOT_FOUND: {
    status: 404,
    message: 'Usuário não encontrado.',
  },
  ADDRESS_NOT_FOUND: {
    status: 404,
    message: 'Endereço não encontrado.',
  },
  PET_NOT_FOUND: {
    status: 404,
    message: 'Pet não encontrado.',
  },
  PASSWORD_INCORRECT: {
    status: 401,
    message: 'Senha incorreta.',
  },
  USER_ALREADY_CREATED: {
    status: 400,
    message: 'Usuário já cadastrado',
  },
  PASSWORD_DOES_NOT_MATCH: {
    status: 401,
    message: 'Senha anterior incorreta',
  },
  UNAUTHORIZED_USER: {
    status: 401,
    message: 'Usuário não autorizado',
  },
  TOKEN_INVALID: {
    status: 404,
    message: 'Token inválido',
  },
  TOKEN_EXPIRED: {
    status: 401,
    message: 'Token expirado',
  },
};
