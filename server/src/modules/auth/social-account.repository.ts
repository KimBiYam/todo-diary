import { SocialAccount } from '@src/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SocialAccount)
export class SocialAccountRepository extends Repository<SocialAccount> {}
