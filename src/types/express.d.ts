import type { JwtAccessPayload } from '../auth/types/jwt-access-payload';
import type { JwtRefreshPayload } from '../auth/types/jwt-refresh-payload';

declare global {
  namespace Express {
    interface User extends JwtAccessPayload, Partial<JwtRefreshPayload> {}
  }
}

export {};
