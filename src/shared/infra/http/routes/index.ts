import { Router } from 'express';
import productRouter from '@modules/products/infra/http/routes/products.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import customerRouter from '@modules/customers/infra/http/routes/customer.routes';
import orderRouter from '@modules/orders/infra/http/routes/orders.routes';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', orderRouter);

export default routes;
