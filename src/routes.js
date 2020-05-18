import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import AddressController from './app/controllers/AddressController';

import MessageController from './app/controllers/MessageController';
import KeyController from './app/controllers/KeyController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

/* User */
routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);
/* ---- */

routes.post('/files', upload.single('file'), FileController.store);

/* Address */
routes.get('/addresses', AddressController.index);
routes.get('/addresses/:id', AddressController.show);
routes.post('/addresses', AddressController.store);
routes.put('/addresses/:id', AddressController.update);
routes.delete('/addresses/:id', AddressController.delete);
/* ------- */

routes.get('/messages', MessageController.index);
routes.get('/messages/:id', MessageController.show);

routes.get('/keys/:id', KeyController.show);

export default routes;
