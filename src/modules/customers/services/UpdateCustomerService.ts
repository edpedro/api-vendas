import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Custormer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Custormer> {
    const customersRepositry = getCustomRepository(CustomerRepository);

    const customer = await customersRepositry.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExists = await customersRepositry.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already onde customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await customersRepositry.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
