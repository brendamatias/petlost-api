import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import PasswordController from './app/controllers/PasswordController';
import AuthController from './app/controllers/AuthController';
import FileController from './app/controllers/FileController';
import AddressController from './app/controllers/AddressController';
import PetsController from './app/controllers/PetsController';
import PetfilesController from './app/controllers/PetfilesController';

import MessageController from './app/controllers/MessageController';
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
routes.put('/users/:id', UserController.update);
/* ---- */

routes.post('/files', upload.single('file'), FileController.store);

/* Adresses */
routes.get('/adresses', AddressController.index);
routes.get('/adresses/:id', AddressController.show);
routes.post('/adresses', AddressController.store);
routes.put('/adresses/:id', AddressController.update);
routes.delete('/adresses/:id', AddressController.delete);
/* ------- */

/* Pets */
routes.get('/pets', PetsController.index);
routes.get('/pets/:id', PetsController.show);
routes.post('/pets', PetsController.store);
routes.put('/pets/:id', PetsController.update);
routes.delete('/pets/:id', PetsController.delete);

/* Pet files */
routes.post('/pets/:id/files', upload.single('file'), PetfilesController.store);
/* ------- */

routes.get('/messages', MessageController.index);
routes.get('/messages/:id', MessageController.show);

routes.get('/keys/:id', KeyController.show);

export default routes;
