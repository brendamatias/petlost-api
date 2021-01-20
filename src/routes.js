import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import PasswordController from './app/controllers/PasswordController';
import AuthController from './app/controllers/AuthController';
import FileController from './app/controllers/FileController';
import AddressController from './app/controllers/AddressController';
import PetController from './app/controllers/PetController';
import PetfileController from './app/controllers/PetfileController';

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
routes.get('/pets', PetController.index);
routes.get('/pets/:id', PetController.show);
routes.post('/pets', PetController.store);
routes.put('/pets/:id', PetController.update);
routes.delete('/pets/:id', PetController.delete);

/* Pet files */
routes.post('/pets/:id/files', upload.single('file'), PetfileController.store);
/* ------- */

routes.get('/messages', MessageController.index);
routes.get('/messages/:id', MessageController.show);

routes.get('/keys/:id', KeyController.show);

export default routes;
