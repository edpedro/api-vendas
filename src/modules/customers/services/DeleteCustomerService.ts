import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { IRemove } from './../domain/models/IRemoveCustomer';

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRespository: ICustomersRepository,
  ) {}
  public async execute({ id }: IRemove): Promise<void> {
    const customer = await this.customersRespository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await this.customersRespository.remove(customer);
  }
}

export default DeleteCustomerService;
