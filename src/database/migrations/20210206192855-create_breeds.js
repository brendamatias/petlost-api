module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'breeds',
      {
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
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        uniqueKeys: {
          breeds_unique: {
            fields: ['name', 'type'],
          },
        },
      }
    );
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.dropTable('breeds'),
      queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_breeds_type" CASCADE;'
      ),
    ]);
  },
};
