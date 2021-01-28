import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

const PROTECTED_ATTRIBUTES = [
  'password',
  'password_hash',
  'createdAt',
  'updatedAt',
  'avatar',
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
        avatar: Sequelize.STRING,
        avatar_url: {
          type: Sequelize.VIRTUAL,
          get() {
            if (this.avatar) {
              if (process.env.NODE_ENV === 'production') {
                return `${process.env.AWS_URL}/${this.avatar}`;
              }

              return `${process.env.APP_URL}/files/${this.avatar}`;
            }

            return this.avatar;
          },
        },
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
