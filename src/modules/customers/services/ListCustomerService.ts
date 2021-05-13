import { inject, injectable } from 'tsyringe';
import { ICustomerPaginate } from '../domain/models/ICustomerPaginate';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRespository: ICustomersRepository,
  ) {}
  public async execute(): Promise<ICustomerPaginate> {
    const customers = await this.customersRespository.findAllPaginate();

    return customers;
  }
}

export default ListCustomerService;
