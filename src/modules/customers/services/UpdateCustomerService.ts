import { IUpdateCustomer } from './../domain/models/IUpdateCustomer';
import AppError from '@shared/errors/AppError';
import Custormer from '../infra/typeorm/entities/Customer';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRespository: ICustomersRepository,
  ) {}
  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Custormer> {
    const customer = await this.customersRespository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExists = await this.customersRespository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already onde customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await this.customersRespository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
