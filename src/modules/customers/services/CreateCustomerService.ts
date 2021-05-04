import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Custormer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Custormer> {
    const customersRepository = getCustomRepository(CustomerRepository);
    const EmailExists = await customersRepository.findByEmail(email);

    if (EmailExists) {
      throw new AppError('Email address already used.');
    }

    const customer = customersRepository.create({
      name,
      email,
    });
    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
