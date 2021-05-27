import { IProductsRepository } from './../../modules/products/domain/repositories/IProductsRepository';
import { IUsersRepository } from './../../modules/users/domain/repositories/IUsersRepository';
import { container } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';

import '@modules/users/providers';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
