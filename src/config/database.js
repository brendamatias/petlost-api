require('dotenv/config');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  operatorsAliases: 0,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
