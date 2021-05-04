import { Request, Response } from 'express';
import CreateUserSevice from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = await listUser.execute();

    return response.json(classToClass(users));
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserSevice();

    const user = await createUser.execute({ name, email, password });

    return response.json(classToClass(user));
  }
}
