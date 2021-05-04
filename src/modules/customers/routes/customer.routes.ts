import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import CustomerController from '../controllers/CustomerController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const customerRouter = Router();

customerRouter.use(isAuthenticated);

const customerController = new CustomerController();

customerRouter.get('/', customerController.index);

customerRouter.get(
  '/:id',

  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),

  customerController.show,
);

customerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
  }),
  customerController.create,
);

customerRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
  }),
  customerController.update,
);

customerRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.delete,
);

export default customerRouter;
