import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const query = this.repository.createQueryBuilder('user')
    .leftJoinAndSelect('user.games', `games`)
    .where('user.id = :id', {id: user_id});
    const user: User = await query.getOne() as User;
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.find({
      order: {first_name: `ASC`}
    }); // Complete usando raw query
  }
  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.find({
      where: {
        first_name,
        last_name,
      }
    }); // Complete usando raw query
  }
}
