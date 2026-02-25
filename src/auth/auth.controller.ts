import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { clearAuthCookies, setAuthCookies } from './auth.cookies';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService,
  ) {}

  private cookieSecure() {
    return (this.config.get<string>('COOKIE_SECURE') ?? 'false') === 'true';
  }

  private cookieSameSite(): 'lax' | 'strict' | 'none' {
    const v = (
      this.config.get<string>('COOKIE_SAMESITE') ?? 'lax'
    ).toLowerCase();
    if (v === 'none' || v === 'strict' || v === 'lax') return v;
    return 'lax';
  }

  //? перевод в миллисекунды, по хорошему бы переделать на парсер
  private accessMaxAgeMs() {
    return 15 * 60 * 1000;
  }
  private refreshMaxAgeMs() {
    return 7 * 24 * 60 * 60 * 1000;
  }

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.auth.register(dto);

    setAuthCookies({
      res,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      secure: this.cookieSecure(),
      sameSite: this.cookieSameSite(),
      accessMaxAgeMs: this.accessMaxAgeMs(),
      refreshMaxAgeMs: this.refreshMaxAgeMs(),
    });

    return { user: result.user };
  }

  @Post('login')
  async login(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.auth.login(dto);

    setAuthCookies({
      res,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      secure: this.cookieSecure(),
      sameSite: this.cookieSameSite(),
      accessMaxAgeMs: this.accessMaxAgeMs(),
      refreshMaxAgeMs: this.refreshMaxAgeMs(),
    });

    return { user: result.user };
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user as any;
    const result = await this.auth.refreshTokens(
      user.userId,
      user.refreshToken,
    );

    setAuthCookies({
      res,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      secure: this.cookieSecure(),
      sameSite: this.cookieSameSite(),
      accessMaxAgeMs: this.accessMaxAgeMs(),
      refreshMaxAgeMs: this.refreshMaxAgeMs(),
    });

    return { user: result.user };
  }

  @UseGuards(JwtAccessGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as any;
    await this.auth.logout(user.userId);

    clearAuthCookies(res, {
      secure: this.cookieSecure(),
      sameSite: this.cookieSameSite(),
    });

    return { ok: true };
  }

  // тестовый эндпоинт: проверить, что access guard работает
  @UseGuards(JwtAccessGuard)
  @Get('me')
  me(@Req() req: Request) {
    return { user: req.user };
  }
}
