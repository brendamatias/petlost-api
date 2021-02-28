import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import path from 'path';

import routes from './routes';
import rateLimiter from './app/middlewares/rateLimiter';
import handleErrors from './app/middlewares/handleErrors';
import routeLogger from './app/middlewares/routeLogger';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();

    if (process.env.NODE_ENV !== 'test') {
      this.server.use(routeLogger);
    }

    this.routes();

    this.server.use(handleErrors);
  }

  middlewares() {
    if (process.env.NODE_ENV === 'production') {
      this.server.use(rateLimiter);
    }

    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);

    this.server.use((req, res, next) => {
      if (!req.route) {
        return res.status(404).json({
          error: {
            code: 'ROUTE_NOT_FOUND',
            message: 'Rota não encontrada',
          },
        });
      }

      return next();
    });
  }
}

export default new App().server;
