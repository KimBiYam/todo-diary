import { PickType } from '@nestjs/swagger';
import { User } from '@src/entities';

export class RegsiterUserDto extends PickType(User, ['email', 'displayName']) {}
