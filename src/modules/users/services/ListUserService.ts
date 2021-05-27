import { IPaginateUser } from './../domain/models/IPaginateUser';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}
  public async execute(
    search = '',
    sortFiled = 'name',
  ): Promise<IPaginateUser> {
    const users = await this.usersRepository.findAllPaginate(search, sortFiled);

    return users;
  }
}

export default ListUserService;
