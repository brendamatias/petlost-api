require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

export default {
  secret: process.env.APP_SECRET,
  expiresIn: '7d',
};
