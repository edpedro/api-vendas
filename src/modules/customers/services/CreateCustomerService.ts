import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRespository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const EmailExists = await this.customersRespository.findByEmail(email);

    if (EmailExists) {
      throw new AppError('Email address already used.');
    }

    const customer = await this.customersRespository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
