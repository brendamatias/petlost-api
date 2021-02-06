export default {
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'Ops, ocorreu um erro interno, tente novamente mais tarde',
  },
  VALIDATION_FAILS: {
    status: 401,
    message: 'Validação falhou',
  },
  USER_NOT_FOUND: {
    status: 404,
    message: 'Usuário não encontrado',
  },
  ADDRESS_NOT_FOUND: {
    status: 404,
    message: 'Endereço não encontrado',
  },
  PET_NOT_FOUND: {
    status: 404,
    message: 'Pet não encontrado',
  },
  BREED_NOT_FOUND: {
    status: 404,
    message: 'Raça não encontrada',
  },
  BREED_INVALID: {
    status: 404,
    message: 'Raça inválida',
  },
  PASSWORD_INCORRECT: {
    status: 401,
    message: 'Senha incorreta',
  },
  USER_ALREADY_CREATED: {
    status: 400,
    message: 'Usuário já cadastrado',
  },
  OLD_PASSWORD_REQUIRED: {
    status: 401,
    message: 'Senha anterior é obrigatória',
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
  TOKEN_NOT_PROVIDED: {
    status: 401,
    message: 'Token não fornecido',
  },
};
