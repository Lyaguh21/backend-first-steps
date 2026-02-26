import { IsIn, IsInt } from 'class-validator';
import type { Role } from 'src/types/auth-user.type';

export class UpdateRoleDto {
  @IsInt()
  userId: number;

  @IsIn(['ADMIN', 'WAITER', 'COOK', 'CUSTOMER'])
  role: Role;
}
