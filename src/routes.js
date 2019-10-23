import { Router } from 'express';
import multer from 'multer';
// eslint-disable-next-line import/no-named-as-default
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.put('/users', AuthMiddleware, UserController.update);

routes.post('/session', SessionController.store);

routes.post('/files', upload.single('file'), (req, res) => {
    return res.json({
        ok: true,
    });
});

export default routes;
