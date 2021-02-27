module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'chats',
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        pet_id: {
          type: Sequelize.UUID,
          references: {
            model: 'pets',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
          },
        },
        sender_id: {
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
          },
        },
        active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
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
          chats_unique: {
            fields: ['pet_id', 'sender_id'],
          },
        },
      }
    );
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('chats');
  },
};
