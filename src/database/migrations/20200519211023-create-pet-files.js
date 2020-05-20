module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('petfiles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      pet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pets',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },
      },
      file_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'files',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
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
    return queryInterface.dropTable('petfiles');
  },
};
