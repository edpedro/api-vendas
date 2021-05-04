import { EntityRepository, Repository } from 'typeorm';
import Custormer from '../entities/Customer';

@EntityRepository(Custormer)
class CustomerRepository extends Repository<Custormer> {
  public async findByName(name: string): Promise<Custormer | undefined> {
    const customer = await this.findOne({
      where: {
        name,
      },
    });

    return customer;
  }
  public async findById(id: string): Promise<Custormer | undefined> {
    const customer = await this.findOne({
      where: {
        id,
      },
    });

    return customer;
  }
  public async findByEmail(email: string): Promise<Custormer | undefined> {
    const customer = await this.findOne({
      where: {
        email,
      },
    });

    return customer;
  }
}

export default CustomerRepository;
