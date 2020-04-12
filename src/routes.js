import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MessageController from './app/controllers/MessageController';
import KeyController from './app/controllers/KeyController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);

routes.get('/messages', MessageController.index);
routes.get('/messages/:id', MessageController.show);

routes.get('/keys/:id', KeyController.show);

export default routes;
