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
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const count = await this.repository.count();
    return  [{
      count: count.toString()
    }]// Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const query = this.repository.createQueryBuilder('game')
    .leftJoinAndSelect('game.users', 'users')
    .select('users');
    const users: any = await query.getMany();
    return users;
  }
}
