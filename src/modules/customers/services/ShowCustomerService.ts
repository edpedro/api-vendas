import { IShowCustomer } from './../domain/models/IShowCustomer';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import Custormer from '../infra/typeorm/entities/Customer';

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRespository: ICustomersRepository,
  ) {}
  public async execute({ id }: IShowCustomer): Promise<Custormer> {
    const customer = await this.customersRespository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
