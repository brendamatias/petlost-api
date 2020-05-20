import { Model } from 'sequelize';

class Petfile extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Pet, { foreignKey: 'pet_id', as: 'pet' });
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'file' });
  }
}

export default Petfile;
