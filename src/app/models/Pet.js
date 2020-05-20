import Sequelize, { Model } from 'sequelize';

class Pet extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        filters: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address' });
    this.hasMany(models.Petfile, { foreignKey: 'pet_id', as: 'files' });
  }
}

export default Pet;
