import { Injectable } from '@nestjs/common';
import { SocialAccount } from '@src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SocialAccountRepository extends Repository<SocialAccount> {
  constructor(private dataSource: DataSource) {
    super(SocialAccount, dataSource.createEntityManager());
  }
}
