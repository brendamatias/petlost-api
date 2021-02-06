import Sequelize, { Model } from 'sequelize';

class Breed extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        type: Sequelize.ENUM({
          values: ['dog', 'cat'],
        }),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Pet, { foreignKey: 'breed_id', as: 'pets' });
  }
}

export default Breed;
