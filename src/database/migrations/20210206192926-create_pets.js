module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pets', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('dog', 'cat'),
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('female', 'male'),
        allowNull: false,
      },
      situation: {
        type: Sequelize.ENUM('adoption', 'disappeared', 'mating'),
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultTo: true,
      },
      breed_id: {
        type: Sequelize.UUID,
        references: {
          model: 'breeds',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        allowNull: false,
      },
      address_id: {
        type: Sequelize.UUID,
        references: {
          model: 'addresses',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        allowNull: true,
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
    return Promise.all([
      queryInterface.dropTable('pets'),
      queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_pets_type";'),
      queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_pets_gender";'),
      queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_pets_situation";'
      ),
    ]);
  },
};
