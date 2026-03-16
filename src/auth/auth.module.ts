import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSecurityModule } from './auth-security.module';

@Module({
  imports: [AuthSecurityModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
