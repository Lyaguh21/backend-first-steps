import { Body, Controller, Get, Patch } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UsersService } from './users.service';
import type { AuthUser } from 'src/types/auth-user.type';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Roles('ADMIN')
  @Get()
  getAll() {
    return this.users.getAll();
  }

  @Get('me')
  me(@CurrentUser() user: AuthUser) {
    return this.users.getMe(user.userId);
  }

  @Roles('ADMIN')
  @Patch('role')
  updateRole(@Body() dto: UpdateRoleDto) {
    return this.users.updateRole({ userId: dto.userId, role: dto.role });
  }
}
