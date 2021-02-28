import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import PasswordController from './app/controllers/PasswordController';
import AuthController from './app/controllers/AuthController';
import PetController from './app/controllers/PetController';
import BreedController from './app/controllers/BreedController';

import ChatController from './app/controllers/ChatController';
import KeyController from './app/controllers/KeyController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/auth', AuthController.store);

routes.post('/password/forgot', PasswordController.store);
routes.put('/password/reset', PasswordController.update);

routes.use(authMiddleware);

/* Users */
routes.get('/users/:id', UserController.show);
routes.put('/users', upload.single('avatar'), UserController.update);

/* Pets */
routes.get('/pets', PetController.index);
routes.get('/pets/:id', PetController.show);
routes.post('/pets', upload.array('file', 3), PetController.store);
routes.put('/pets/:id', upload.array('file', 3), PetController.update);
routes.delete('/pets/:id', PetController.delete);

routes.post('/chats', ChatController.store);

routes.get('/keys/:id', KeyController.show);

routes.get('/breeds', BreedController.index);

export default routes;
