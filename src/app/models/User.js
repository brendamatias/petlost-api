import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

const PROTECTED_ATTRIBUTES = [
  'password',
  'password_hash',
  'createdAt',
  'updatedAt',
];

class User extends Model {
  toJSON() {
    const attributes = {
      ...this.get(),
    };

    PROTECTED_ATTRIBUTES.forEach((protectedAttribute) => {
      delete attributes[protectedAttribute];
    });

    return attributes;
  }

  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        token: Sequelize.STRING,
        token_created_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  generateToken() {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  }
}

export default User;
