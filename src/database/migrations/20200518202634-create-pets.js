const { boolean } = require('yup');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pets', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM({
          values: ['dog', 'cat'],
        }),
        allowNull: false,
      },
      situation: {
        type: Sequelize.ENUM({
          values: ['adoption', 'disappeared', 'mating'],
        }),
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultTo: true,
      },
      address_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'addresses',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('pets');
  },
};
