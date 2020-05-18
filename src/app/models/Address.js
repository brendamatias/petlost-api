import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        address: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        number: Sequelize.STRING,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        zipcode: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Address;
