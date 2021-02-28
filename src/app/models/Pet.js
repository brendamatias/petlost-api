import Sequelize, { Model } from 'sequelize';

class Pet extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        type: Sequelize.ENUM({
          values: ['dog', 'cat'],
        }),
        gender: Sequelize.ENUM({
          values: ['female', 'male'],
        }),
        situation: Sequelize.ENUM({
          values: ['adoption', 'disappeared', 'mating'],
        }),
        birth_date: Sequelize.DATE,
        description: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Breed, { foreignKey: 'breed_id', as: 'breed' });
    this.hasMany(models.Petfile, { foreignKey: 'pet_id', as: 'files' });
  }
}

export default Pet;
