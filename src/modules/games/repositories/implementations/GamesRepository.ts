import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const query = this.repository.createQueryBuilder()
    .where(`title LIKE :param`, {param});
    return await query.getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const count = await this.repository.count();
    return  [{
      count: count.toString()
    }]
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const query = this.repository.createQueryBuilder('game')
    .leftJoinAndSelect('game.users', 'user')
    .select('user');
    const users: any = await query.getMany();
    return users;
  }
}
