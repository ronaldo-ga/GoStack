import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'successs',
  });
});

export default routes;
