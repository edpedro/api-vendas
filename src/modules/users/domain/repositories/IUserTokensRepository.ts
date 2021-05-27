import { ITokenUser } from './../models/ITokenUser';

export interface IUserTokensRepository {
  findByToken(token: string): Promise<ITokenUser | undefined>;
  generate(user_id: string): Promise<ITokenUser>;
}
