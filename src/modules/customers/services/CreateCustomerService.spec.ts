import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';

describe('CreateCustomer', () => {
  it('should be able to create a new customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

    const customer = await createCustomer.execute({
      name: 'Eduardo',
      email: 'edu@gmail.com',
    });

    expect(customer).toHaveProperty('id');
  });
  it('should not be able to create two customers with same email', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

    await createCustomer.execute({
      name: 'Eduardo',
      email: 'edu@gmail.com',
    });

    expect(
      createCustomer.execute({
        name: 'Eduardo',
        email: 'edu@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
