import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities';

export class RequestUserDto extends PickType(User, ['displayName']) {}
