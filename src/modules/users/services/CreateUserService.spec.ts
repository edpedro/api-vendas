import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let hashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, hashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Eduardo',
      email: 'edu@gmail.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create two users with same email', async () => {
    await createUser.execute({
      name: 'Eduardo',
      email: 'edu@gmail.com',
      password: '12345',
    });

    expect(
      createUser.execute({
        name: 'Eduardo',
        email: 'edu@gmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
