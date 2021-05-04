import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepositry = getCustomRepository(UsersRepository);

    const users = await usersRepositry.find();

    return users;
  }
}

export default ListUserService;
