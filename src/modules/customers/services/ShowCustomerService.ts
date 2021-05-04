import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Custormer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Custormer> {
    const customersRepositry = getCustomRepository(CustomerRepository);

    const customer = await customersRepositry.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
