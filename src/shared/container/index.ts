import { container } from 'tsyringe';

import { IcustomerRespository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';

container.registerSingleton<IcustomerRespository>(
  'CustomersRepository',
  CustomersRepository,
);
