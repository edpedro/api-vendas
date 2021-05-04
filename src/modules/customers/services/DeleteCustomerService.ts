import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customersRepositry = getCustomRepository(CustomerRepository);

    const customer = await customersRepositry.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await customersRepositry.remove(customer);
  }
}

export default DeleteCustomerService;
