import Sequelize, { Model } from 'sequelize';

class Petfile extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.path) {
              if (process.env.NODE_ENV === 'production') {
                return `${process.env.AWS_URL}/${this.path}`;
              }

              return `${process.env.APP_URL}/files/${this.path}`;
            }

            return this.path;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Pet, { foreignKey: 'pet_id', as: 'pet' });
  }
}

export default Petfile;
