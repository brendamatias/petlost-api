import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import Pet from '../app/models/Pet';
import User from '../app/models/User';
import Chat from '../app/models/Chat';
import Breed from '../app/models/Breed';
import Petfile from '../app/models/Petfile';

import databaseConfig from '../config/database';

const models = [User, Chat, Pet, Breed, Petfile];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
